import React from 'react'
import SearchBar from '@Component/IssueListPage/SearchBar'
import IssueFilter from '@Component/IssueListPage/IssueFilter'

const IssueListPage = props => {
  const [users, setUsers] = useState([])
  const [labels, setLabels] = useState([])
  const [milestones, setMilestones] = useState([])

  useEffect(async () => {
    const response = await getLabels()
    setLabels(response)
  }, [])

  return (
    <issueListContext.Provider value={{ users, labels, milestones }}>
      <SearchBar />
      <IssueFilter />
    </issueListContext.Provider>
  )
}

export default IssueListPage
