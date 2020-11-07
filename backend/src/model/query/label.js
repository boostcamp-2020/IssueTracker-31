const getLabelQueryString = 'SELECT id, name, description, color from Label'
const postLabelQueryString = 'INSERT INTO Label SET ?'
const getLabelByNameQueryString = 'SELECT id FROM Label WHERE name=?'

export default {
  getLabelQueryString,
  postLabelQueryString,
  getLabelByNameQueryString,
}
