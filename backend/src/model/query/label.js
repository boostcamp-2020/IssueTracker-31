const getLabelQueryString = 'SELECT id, name, description, color from Label'
const postLabelQueryString = 'INSERT INTO Label SET ?'
const getLabelByNameQueryString = 'SELECT id FROM Label WHERE name=?'
const deleteLabelQueryString = 'DELETE FROM Label WHERE id=?'
const patchLabelQueryString = 'UPDATE Label SET ?  WHERE id=?'
const getLabelsOnIssueQueryString = `
  SELECT l.id, l.name, l.color
  FROM Label as l
  JOIN Issue_label as il ON l.id = il.labelId
  WHERE il.issueId = ?
`

export default {
  getLabelQueryString,
  postLabelQueryString,
  getLabelByNameQueryString,
  deleteLabelQueryString,
  patchLabelQueryString,
  getLabelsOnIssueQueryString,
}
