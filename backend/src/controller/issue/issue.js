import issueService from '../../service/issue'
import errorResponse from '../../util/error-response'

const getIssues = async (req, res) => {
  const filterValues = { ...req.query }
  try {
    const issues = await issueService.getIssues(filterValues)
    return res.json({ success: true, data: issues })
  } catch (err) {
    errorResponse(err, res)
  }
}

export default {
  getIssues,
}
