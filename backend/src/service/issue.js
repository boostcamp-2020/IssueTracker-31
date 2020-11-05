import issueModel from '../model/issue'
import commnetModel from '../model/comment'
import commentImageUrl from '../model/commentImageUrl'
import pool from '../model/index'
import relationMaker from '../util/relation-maker'

const getIssues = async filterValues => {
  if (!isValidFilterValues(filterValues)) throw new Error('parameter')
  const issues = await issueModel.getIssues(filterValues)
  return structurizeIssueList(issues)
}

const postIssue = async newIssueData => {
  if (!isValidNewIssueData(newIssueData)) throw new Error('parameter')
  const { label, assignee, imageUrlId, userId, content } = newIssueData
  const connection = await pool.getConnection()
  try {
    const issueId = await issueModel.postIssue(connection, newIssueData)
    const issueRelationMaker = relationMaker(
      issueModel.setRelations,
      connection,
      'issueId',
      issueId,
    )
    if (label) await issueRelationMaker('Issue_label', 'labelId', label)
    if (assignee) await issueRelationMaker('Issue_assignee', 'userId', assignee)
    if (content) {
      const commentId = await commnetModel.postComment(
        issueId,
        userId,
        content,
        true,
        connection,
      )
      if (commentImageUrl) {
        await commentImageUrl.updateCommentId(commentId, imageUrlId, connection)
      }
    }
  } catch (err) {
    await connection.rollback()
    throw err
  } finally {
    connection.release()
  }
}

const isValidNewIssueData = ({
  title,
  userId,
  content,
  imageUrlId,
  label,
  assignee,
  milestoneId,
}) => {
  if (title === undefined || userId === undefined) return false
  if (typeof title !== 'string' || title === '') return false
  if (typeof userId !== 'number' || userId < 1) return false
  if (content && typeof content !== 'string') return false
  if (content === undefined && imageUrlId && imageUrlId[0]) return false
  if (imageUrlId && !isValidIdList(imageUrlId)) return false
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
