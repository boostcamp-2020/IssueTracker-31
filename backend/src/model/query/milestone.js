const getMilestoneWithProgress = `
select m.id, m.title, m.dueDate, m.description, m.isOpen, (
  select count(i.id) from Issue as i
  where m.id = i.milestoneId and i.isOpen = 1
  ) as openIssue, (
  select count(i.id) from Issue as i
  where m.id = i.milestoneId and i.isOpen = 0
  ) as closeIssue
from Milestone as m
where m.id = ?
`

export default {
  getMilestoneWithProgress,
}
