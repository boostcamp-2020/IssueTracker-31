import issueService from '../../service/issue'

const read = async (req, res) => {
  const issues = await issueService.getIssue()
  return res.json({ issues })
}

export default {
  read,
}
