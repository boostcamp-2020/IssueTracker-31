import db from './index'
import query from './query/milestone'
const getMilestone = async () => {
  const [rows] = await db.query(query.getMilestone)
  return rows
}
const getMilestoneDetail = async () => {
  const [rows] = await db.query(query.getMilestoneDetail)
  return rows
}
export default {
  getMilestone,
  getMilestoneDetail,
}
