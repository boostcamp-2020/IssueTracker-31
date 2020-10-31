import issueService from '../../service/issue'
import errorResponse from '../../util/error-response'

const getIssues = async (req, res) => {
  const filterValues = {
    isOpen: req.query.isOpen,
    author: req.query.author,
    milestone: req.query.milestone,
    assignee: req.query.assignee,
    label: req.query.label,
  }
  console.log(123123)
  console.log(filterValues)

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
