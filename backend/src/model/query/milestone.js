const getMilestoneWithProgress = `
select m.id, m.title, m.dueDate, m.description, m.isOpen, (
  select count(i.id) from Issue as i
  where m.id = i.milestoneId and i.isOpen = 1
  ) as openIssue, (
  select count(i.id) from Issue as i
  where m.id = i.milestoneId and i.isOpen = 0
  ) as closeIssue
from Milestone as m
`

const getMilestone =
  'SELECT id, title, dueDate, description, isOpen from Milestone'

const getMilestoneDetail = `select m.id, m.title, m.dueDate, m.description, m.isOpen, (
  select count(i.id) from Issue as i
  where m.id = i.milestoneId and i.isOpen = 1
  ) as openIssue, (
  select count(i.id) from Issue as i
  where m.id = i.milestoneId and i.isOpen = 0
  ) as closeIssue
from Milestone as m
where m.id = ?
`

const createMilestone = `
insert into Milestone (
  title,
  dueDate,
  description)
values (?, ?, ?)
`

const removeMilestone = `
delete from Milestone
where id = ?
`

const updateMilestone = params => `
update Milestone
set ${Object.keys(params)
  .map(column => `${column} = ?`)
  .join(',')}
where id = ?
`

const getMilestoneOnIssueQueryString = `
  SELECT m.id, m.title,
    count(CASE WHEN i.isOpen=1 THEN 1 END) as openIssue,
    count(CASE WHEN i.isOpen=0 THEN 1 END) as closeIssue
  FROM Milestone as m
  JOIN Issue as i ON m.id = i.milestoneId
  WHERE m.id = (SELECT milestoneId FROM Issue WHERE id = ?)
  GROUP BY m.id;
`

export default {
  getMilestone,
  getMilestoneDetail,
  getMilestoneWithProgress,
  createMilestone,
  removeMilestone,
  updateMilestone,
  getMilestoneOnIssueQueryString,
}
