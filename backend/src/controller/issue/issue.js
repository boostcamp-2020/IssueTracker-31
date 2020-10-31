import issueService from '../../service/issue'
import errorResponse from '../../util/error-response'

const getIssues = async (req, res) => {
  const filterValues = req.body
  try {
    const issues = await issueService.getIssues(filterValues)
    return res.json({ issues })
  } catch (err) {
    errorResponse(err, res)
  }
}

export default {
  getIssues,
}
