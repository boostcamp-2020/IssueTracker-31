import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import EventButton from '@Component/common/EventButton'
import { updateMilestone, postMilestone } from '@Api/milestone'
import { useHistory } from 'react-router-dom'

const MilestoneForm = ({ data }) => {
  const [isVerifyDate, setIsVerifyDate] = useState(true)
  const history = useHistory()
  const titleRef = useRef()
  const dueDateRef = useRef()
  const descriptionRef = useRef()

  const verifyDate = e => {
    if (e.target.value === '') {
      dueDateRef.current.style.color = '#cb2431'
      setIsVerifyDate(false)
    } else {
      dueDateRef.current.style.color = '#24292e'
      setIsVerifyDate(true)
    }
  }

  const saveChangeAction = async () => {
    const title = titleRef.current.value
    const dueDate = dueDateRef.current.value || undefined
    const description = descriptionRef.current.value
    if (!isVerifyDate) return alert('유효하지 않은 날짜입니다.')
    if (title === '') return alert('제목을 입력해주세요.')
    if (
      title === data.title &&
      dueDate === data.dueDate &&
      description === data.dscription
    )
      return alert('아무 것도 변경되지 않았습니다.')
    if (
      await updateMilestone({
        id: data.id,
        body: {
          title,
          dueDate,
          description,
        },
      })
    )
      history.push('/milestones')
  }

  const createMilestoneAction = async () => {
    const title = titleRef.current.value
    const dueDate = dueDateRef.current.value || undefined
    const description = descriptionRef.current.value
    if (!isVerifyDate) return alert('유효하지 않은 날짜입니다.')
    if (title === '') return alert('제목을 입력해주세요.')
    if (
      await postMilestone({
        title,
        dueDate,
        description,
      })
    )
      history.push('/milestones')
  }

  const cancelButtonAction = () => {
    history.go(-1)
  }

  return (
    <>
      <StyledForm>
        <StyledDl>
          <StyledDt>Title</StyledDt>
          <StyledDdFlex>
            <StyledInput
              ref={titleRef}
              type="text"
              defaultValue={data ? data.title : ''}
            ></StyledInput>
          </StyledDdFlex>
        </StyledDl>
        <StyledDl>
          <StyledDt>Due date (optional)</StyledDt>
          <StyledDdFlex>
            <StyledInput
              ref={dueDateRef}
              type="date"
              onChange={verifyDate}
              defaultValue={
                data && data.dueDate ? data.dueDate.split('T', 1) : null
              }
            ></StyledInput>
          </StyledDdFlex>
        </StyledDl>
        <StyledDl>
          <StyledDt>Description (optional)</StyledDt>
          <StyledDdFlex>
            <StyledInputDescription
              ref={descriptionRef}
              type="text"
              defaultValue={data ? data.description : ''}
            ></StyledInputDescription>
          </StyledDdFlex>
        </StyledDl>
      </StyledForm>
      <hr></hr>

      <StyledButtonContainer>
        {data ? (
          <>
            <EventButton buttonName={'Cancel'} onClick={cancelButtonAction} />
            <EventButton buttonName={'Close milestone'} />
            <EventButton
              buttonName={'Save changes'}
              isGreen
              onClick={saveChangeAction}
            />
          </>
        ) : (
          <EventButton
            buttonName={'Create milestone'}
            isGreen
            onClick={createMilestoneAction}
          ></EventButton>
        )}
      </StyledButtonContainer>
    </>
  )
}

const StyledForm = styled.div``
const StyledButtonContainer = styled.div`
  float: right;
`

const StyledInput = styled.input`
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: midStyledDle;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  outline: none;
  box-sizing: border-box;
`

const StyledInputDescription = styled.textarea`
  width: 100%;
  height: 200px;
  min-height: 200px;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: #24292e;
  vertical-align: midStyledDle;
  background-color: #fafbfc;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  outline: none;

  box-sizing: border-box;
`

const StyledDl = styled.dl`
  padding-right: 16px;
  flex: 1 auto;
`
const StyledDdFlex = styled.dd`
  display: flex;
  margin-left: 0;
`
const StyledDt = styled.dt`
  font-size: 14px;
  font-weight: 600;
`

export default MilestoneForm
