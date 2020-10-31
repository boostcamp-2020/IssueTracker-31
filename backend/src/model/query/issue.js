const getIssuesQueryString = filterValues => {
  return `SELECT DISTINCT I.id as id, I.userId as userId, I.title as title,
        I.createdAt as createdAt, I.closedAt as closedAt, I.isOpen as isOpen,
        M.title as milestone, U.nickName as author,
        (SELECT GROUP_CONCAT(L.name, ":", L.color) FROM Label L
            INNER JOIN Issue_label IL
                ON IL.labelId = L.id
            WHERE IL.issueId=I.id
        ) as label,
        (SELECT GROUP_CONCAT(U.id, ":", U.profileUrl) FROM User U
            INNER JOIN Issue_assignee IA
                ON IA.userId = U.id
            WHERE IA.issueId=I.id
        ) as assignee,
        (SELECT count(*) FROM Comment C WHERE C.issueId=I.id) as commentCount
      FROM Issue I
      LEFT JOIN User U ON I.userId = U.id
      LEFT JOIN Milestone M ON I.milestoneId = M.id
      LEFT JOIN Issue_label IL ON IL.issueId = I.id
      LEFT JOIN Issue_assignee IA ON I.id = IA.issueId
      ${getIssuesFilterCondition(filterValues)}`
}

const getIssuesFilterCondition = filterValues => {
  const filterKeys = Object.keys(filterValues)
  if (filterKeys.length === 0) return ' ORDER BY I.id DESC'

  const conditions = []
  if (filterValues.label !== undefined && filterValues.label.length > 0)
    conditions.push('(IL.labelID IN (' + filterValues.label.join(',') + ')')
  if (filterKeys.length === 1 && conditions.length !== 0)
    return `WHERE ${conditions[0]} + ORDER BY I.id DESC`

  if (filterValues.isOpen !== undefined)
    conditions.push(`I.isOpen=${filterValues.isOpen}`)
  if (filterValues.milestone !== undefined)
    conditions.push(`I.milestoneId=${filterValues.milestone}`)
  if (filterValues.author !== undefined)
    conditions.push(`I.userId=${filterValues.author}`)
  if (filterValues.assignee !== undefined)
    conditions.push(`IA.userId=${filterValues.assignee}`)

  const conditionString = conditions
    .join(' AND ')
    .concat(
      filterValues.label !== undefined && filterValues.label.length > 0
        ? ` HAVING (COUNT(IL.lavelId)=${filterValues.label.length}`
        : '',
    )
  return `WHERE ${conditionString} + ' ORDER BY I.id DESC'`
}

export default {
  getIssuesQueryString,
}
