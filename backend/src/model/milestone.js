import db, { doQuery } from './index'
import query from './query/milestone'

const getMilestone = async () => {
  const [rows] = await db.query(query.getMilestone)
  return rows
}
const getMilestoneDetail = async () => {
  const [rows] = await db.query(query.getMilestoneDetail)
  return rows
}

const getMilestoneWithProgress = async id => {
  const [rows] = await db.query(query.getMilestoneWithProgress, id)
  return rows
}

const createMilestone = (...params) => {
  return doQuery(query.createMilestone, params)
}

const removeMilestone = id => {
  return doQuery(query.removeMilestone, id)
}

export default {
  getMilestone,
  getMilestoneDetail,
  getMilestoneWithProgress,
  createMilestone,
  removeMilestone,
}
