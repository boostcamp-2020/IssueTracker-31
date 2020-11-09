const postIssueQueryString = 'INSERT INTO Issue SET ?'

const updateIssueState = (issueId, isOpen) => {
  let query = `UPDATE Issue SET isOpen = ${isOpen} WHERE id in `
  const converted = issueId.split('')
  converted[0] = '('
  converted[converted.length - 1] = ')'
  query += converted.join('')
  return query
}

const getIssueDetailQueryString = `
  SELECT i.id as issueId, i.title, i.isOpen, i.createdAt,
    u.nickname as author, u.profileUrl,
    count(c.id) as commentCount
  FROM Issue as i
  LEFT JOIN User as u ON u.id = i.userId
  LEFT JOIN Comment as c on i.id = c.issueId
  WHERE i.id = ?;
`

const setIssueRelationQueryString = (table, firstColumn, secondColumn) =>
  `INSERT INTO ${table} (${firstColumn}, ${secondColumn}) VALUES ?`

const getIssuesQueryString = filterValues => {
  return `
  SELECT DISTINCT I.id as id, I.userId as userId, I.title as title,
  I.createdAt as createdAt, I.closedAt as closedAt, I.isOpen as isOpen,
  M.title as milestone, U.nickName as author,
  (SELECT  GROUP_CONCAT(L.name, ";", L.color) FROM Label L
      INNER JOIN Issue_label IL ON IL.labelId = L.id
      WHERE IL.issueId = I.id
  ) as label,
  (SELECT GROUP_CONCAT(U.nickname, ";", U.profileUrl) FROM User U
      INNER JOIN Issue_assignee IA ON IA.userId = U.id
      WHERE IA.issueId = I.id
  ) as assignee,
  (SELECT count(*) FROM Comment C WHERE C.issueId=I.id) as commentCount

  FROM Issue I
  LEFT JOIN User U ON I.userId = U.id
  LEFT JOIN Milestone M ON I.milestoneId = M.id
  LEFT JOIN Issue_label IL ON IL.issueId = I.id
  LEFT JOIN Issue_assignee IA ON I.id = IA.issueId
  ${getIssuesFilterCondition(filterValues)}`
}

const filtering = {
  isOpen: isOpen => `I.isOpen=${isOpen}`,
  author: author => `I.userId=${author}`,
  label: label =>
    label[0] === '0'
      ? 'IL.labelID IS NULL'
      : '(IL.labelID IN(' + label.join(',') + '))',
  assignee: assignee =>
    assignee === '0' ? 'IA.userId IS NULL' : `IA.userId=${assignee}`,
  milestone: milestone =>
    milestone === '0' ? 'I.milestoneId IS NULL' : `I.milestoneId=${milestone}`,
}

const getIssuesFilterCondition = filterValues => {
  const conditions = []
  const filterKeys = Object.keys(filterValues)
  if (filterKeys.length === 0) return ' ORDER BY I.id DESC'

  for (const key of filterKeys)
    if (filtering[key]) conditions.push(filtering[key](filterValues[key]))

  const filterString = conditions.join(' AND ').concat(
    filterValues.label &&
      filterValues.label.length > 0 &&
      filterValues.label[0] !== '0'
      ? `
      GROUP BY IL.issueId
      HAVING (COUNT(IL.labelId) = ${filterValues.label.length})`
      : '',
  )
  return `WHERE ${filterString} ORDER BY I.id DESC`
}

export default {
  postIssueQueryString,
  setIssueRelationQueryString,
  getIssuesQueryString,
  updateIssueState,
  getIssueDetailQueryString,
}
