import issueModel from '../model/issue'
import commentModel from '../model/comment'
import pool from '../model/index'
import relationMaker from '../util/relation-maker'

const getIssues = async filterValues => {
  if (!isValidFilterValues(filterValues)) throw new Error('parameter')
  const issues = await issueModel.getIssues(filterValues)
  return structurizeIssueList(issues)
}

const postIssue = async newIssueData => {
  if (!isValidNewIssueData(newIssueData)) throw new Error('parameter')
  const { label, assignee, userId, content } = newIssueData
  const connection = await pool.getConnection()
  await connection.beginTransaction()
  try {
    const issueId = await issueModel.postIssue(connection, newIssueData)
    const issueRelationMaker = relationMaker(
      issueModel.setIssueRelations,
      connection,
      'issueId',
      issueId,
    )
    if (label) await issueRelationMaker('Issue_label', 'labelId', label)
    if (assignee) await issueRelationMaker('Issue_assignee', 'userId', assignee)
    if (content)
      await commentModel.postComment(issueId, userId, content, true, connection)
    await connection.commit()
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

const updateIssueState = async data => {
  if (!isValidUpdateStateData(data)) throw new Error('parameter')
  const connection = await pool.getConnection()
  await connection.beginTransaction()
  try {
    await issueModel.updateIssueState(connection, data)
    await connection.commit()
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

const isValidUpdateStateData = ({ isOpen, issueId }) => {
  if (!isOpen || !issueId) return false
  if (typeof JSON.parse(isOpen) !== 'boolean') return false
  if (!Array.isArray(JSON.parse(issueId))) return false
  return true
}

const isValidNewIssueData = ({
  title,
  userId,
  content,
  label,
  assignee,
  milestoneId,
  ...notAllowed
}) => {
  if (Object.keys(notAllowed).length !== 0) return false
  if (!title || !userId) return false
  if (typeof title !== 'string' || title === '') return false
  if (typeof userId !== 'number' || userId < 1) return false
  if (content !== undefined && typeof content !== 'string') return false
  if (label && !isValidIdList(label)) return false
  if (assignee && !isValidIdList(assignee)) return false
  if (milestoneId !== undefined && !isValidIdList([milestoneId])) return false
  return true
}

const isValidIdList = idList => {
  if (!Array.isArray(idList)) return false
  for (const id of idList) if (typeof id !== 'number' || id < 1) return false
  return true
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

const isValidFilterValues = filterValues => {
  const { isOpen, author, assignee, label, milestone } = filterValues
  if (milestone !== undefined && isNaN(milestone)) return false
  if (author !== undefined && isNaN(author)) return false
  if (assignee !== undefined && isNaN(assignee)) return false
  if (isOpen !== undefined && isOpen !== '1' && isOpen !== '0') return false
  if (label.indexOf('0') !== -1 && label.length > 1) return false
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
  updateIssueState,
}
