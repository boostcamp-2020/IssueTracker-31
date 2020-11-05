import db from '../model/issue'
import commnetModel from '../model/comment'
import pool from '../model/index'

const getIssues = async filterValues => {
  if (filterValuesCheck(filterValues) === false) {
    throw new Error('parameter')
  }
  const issues = await db.getIssues(filterValues)
  return structurizeIssueList(issues)
}

const postIssue = async newIssueData => {
  const { labeId, assignee, imageUrlId, userId, content } = newIssueData
  // value validation 추가하기. Array.isArray(array) &&
  // 트랜잭션 추가하기
  const connection = await pool.getConnection()
  const issueId = await db.postIssue(connection, newIssueData)
  const commentId = await commnetModel.postComment(
    issueId,
    userId,
    content,
    true,
  )
  const issueRelationMaker = issueRelationClosure(
    db.setRelations,
    connection,
    issueId,
  )
  //todo : bulk insert
  await issueRelationMaker('Issue_label', 'labeId', labeId)
  await issueRelationMaker('Issue_assignee', 'userId', assignee)
  // 이미지 테이블에 코멘트id 넣기  //todo : bulk insert
}

//todo : bulk insert
const issueRelationClosure = async (callback, connection, issueId) => {
  return async (table, columnName, array) => {
    if (array.length > 0) {
      const relations = array.map(id => ({
        table,
        firstId: issueId,
        secondId: id,
      }))
      await callback(connection, relations, 'issueId', columnName)
    }
  }
}

const structurizeIssueList = issues => {
  return issues.map(row => {
    if (row.label !== null) {
      row.label = row.label.split(',').map(label => {
        const [name, color] = label.split(';')
        return { name, color }
      })
    } else row.label = []
    if (row.assignee !== null) {
      row.assignee = row.assignee.split(',').map(assignee => {
        const [id, profileUrl] = assignee.split(';')
        return { id, profileUrl }
      })
    } else row.assignee = []
    return row
  })
}

const filterValuesCheck = filterValues => {
  const { isOpen, author, assignee, label, milestone } = filterValues
  if (milestone !== undefined && isNaN(milestone)) return false
  if (author !== undefined && isNaN(author)) return false
  if (assignee !== undefined && isNaN(assignee)) return false
  if (isOpen !== undefined && isOpen !== '1' && isOpen !== '0') return false
  if (label !== undefined) {
    if (!Array.isArray(label)) return false
    for (const labeId of label) {
      if (isNaN(labeId) || labeId === '') return false
    }
  }
  return true
}

export default {
  getIssues,
  postIssue,
}
