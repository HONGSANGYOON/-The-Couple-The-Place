import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem('email', email);
      console.log(userCredential);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form>
        <div>
          <LoginInput
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="아이디를 작성해주세요"
          />
          <LoginInput
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="암호를 작성해주세요"
          />
        </div>
        <div>
          <LoginButton onClick={signIn}>로그인</LoginButton>
          <LoginButton
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </LoginButton>
        </div>
      </form>
    </>
  );
}

export default Login;

const LoginInput = styled.input`
  background-color: #ffe7cf;
  width: 100%;
  /* outline: none; */
  /* border: none;
  border-radius: 0.5rem; */
`;
const LoginButton = styled.button`
  /* background-color: gray; */
  width: 10vw;
  height: 5vh;
  border-radius: 2px;
`;
