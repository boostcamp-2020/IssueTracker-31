import db from '../model/issue'

const structurizeIssueList = issues => {
  return issues.map(row => {
    if (row.label !== null) {
      row.label = row.label.split(',').map(label => {
        const [name, color] = label.split(';')
        return { name, color }
      })
    }
    if (row.assignee !== null) {
      row.assignee = row.assignee.split(',').map(assignee => {
        const [id, profileUrl] = assignee.split(';')
        return { id, profileUrl }
      })
    }
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

const getIssues = async filterValues => {
  if (filterValuesCheck(filterValues) === false) {
    throw new Error('parameter')
  }
  const issues = await db.getIssues(filterValues)
  return structurizeIssueList(issues)
}

export default {
  getIssues,
}
