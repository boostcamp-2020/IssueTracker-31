import issueService from '../../service/issue'
import statusCode from '../../util/statusCode'
import errorResponse from '../../util/error-response'
import statusCode from '../../util/statusCode'

const getIssues = async (req, res) => {
  const filterValues = { ...req.query }
  try {
    const issues = await issueService.getIssues(filterValues)
    return res.status(statusCode.OK).json({ success: true, data: issues })
  } catch (err) {
    errorResponse(err, res)
  }
}
const postIssue = async (req, res) => {
  const newIssueData = req.body
  newIssueData.userId = req.userData.id
  try {
    await issueService.postIssue(newIssueData)
    return res.status(statusCode.CREATED).json({ success: true })
  } catch (err) {
    console.log(err)
    errorResponse(err, res)
  }
}

const updateIssueState = async (req, res) => {
  const data = req.body
  try {
    await issueService.updateIssueState(data)
    return res.status(statusCode.OK).json({
      success: true,
    })
  } catch (err) {
    errorResponse(err, res)
  }
}

export default {
  getIssues,
  postIssue,
  updateIssueState,
}
