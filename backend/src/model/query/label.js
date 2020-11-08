const getLabelQueryString = 'SELECT id, name, description, color from Label'
const postLabelQueryString = 'INSERT INTO Label SET ?'
const getLabelByNameQueryString = 'SELECT id FROM Label WHERE name=?'
const deleteLabelQueryString = 'DELETE FROM Label WHERE id=?'

export default {
  getLabelQueryString,
  postLabelQueryString,
  getLabelByNameQueryString,
  deleteLabelQueryString,
}
