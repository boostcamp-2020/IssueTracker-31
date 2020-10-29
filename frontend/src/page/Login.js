import React from 'react'
import styled from 'styled-components'

function LoginForm() {
  const [value, setValue] = React.useState({
    nickname: '',
    password: '',
  })

  const handleSubmit = () => {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (value[key] === '') {
          alert('아이디와 패스워드를 모두 입력해주세요!')
          break
        }
      }
    }
  }

  const handleChange = event => {
    setValue({ ...value, [event.target.name]: event.target.value })
  }

  const handleGithubLogin = () => {
    console.log('sdafads')
  }

  return (
    <Wrapper>
      <TextHeader>이슈 트래커</TextHeader>
      <LoginWrapper>
        <LabelLogin>아이디</LabelLogin>
        <IdInputContainer></IdInputContainer>
        <LabelLogin>비밀번호</LabelLogin>
        <PasswordInputContainer></PasswordInputContainer>
        <SubmitContainer>
          <LoginButton>로그인</LoginButton>
          <SignInButton>회원가입</SignInButton>
        </SubmitContainer>
        <BtnGithub>
          <Button onClick={handleGithubLogin}>Sign in with GitHub</Button>
        </BtnGithub>
      </LoginWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  background-color: #f8f8ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
`
const TextHeader = styled.h1`
  font-size: 2rem;
  color: black;
`
const LoginWrapper = styled.form`
  height: 200px;
  width: 400px;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px;
  border: 1px solid #d3d3d3;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

const LabelLogin = styled.label`
  margin-bottom: -10px;
  font-weight: bold;
`
const IdInputContainer = styled.input``
const PasswordInputContainer = styled.input``
const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-around;
`
const LoginButton = styled.a``
const SignInButton = styled.a``
const BtnGithub = styled.div`
  text-align: center;
  color: #fff;
  background-color: #a9a9a9;
  height: 20px;
  padding: 5px;
  font-weight: bold;
`
const Button = styled.div``

export default LoginForm
