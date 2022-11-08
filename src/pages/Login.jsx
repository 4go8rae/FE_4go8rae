import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styled from "styled-components";
import Header from "../components/header/Header";
import { instance } from "../shared/Api";

const Login = () => {
  const navigate = useNavigate();

  // input에 입력한 값을 저장
  const usernameRef = useRef();
  const passwordRef = useRef();

  // 로그인 버튼 click시 서버로 데이터 전송
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 서버로 보낼 데이터
    const user = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // input이 비었을 때 alert
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      Swal.fire({
        text: "모든 항목을 입력해주세요.",
        icon: "warning",
      });
      return;
    }

    // 서버로 전송 후, 받아온 토큰을 로컬에 저장
    else {
      try {
        const response = await instance.post("/api/member/login", user);
        sessionStorage.setItem("ACCESS_TOKEN", response.headers.authorization);
        sessionStorage.setItem("REFRESH_TOKEN", response.headers.refreshtoken);
        sessionStorage.setItem("role", response.data.role);
        Swal.fire({
          title: `${response.data.nickname}님`,
          text: "환영합니다.",
          icon: "success",
        });
        navigate("/");
      } catch (error) {
        Swal.fire({
          text: "이메일 또는 비밀번호를 확인해주세요.",
          icon: "error",
        });
      }
    }
  };

  // 렌더링될 때마다 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <St>
      <Header/>
      <StLogin>
        <form onSubmit={onSubmitHandler}>
          <Inputs>
            <Input>
              <label>
                <p>
                  <b>아이디</b>
                </p>
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요."
                  ref={usernameRef}
                />
              </label>
            </Input>
            <Input>
              <label>
                <p>
                  <b>비밀번호</b>
                </p>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  ref={passwordRef}
                />
              </label>
            </Input>
          </Inputs>
          <Buttons>
            <div>
              <button>로그인</button>
            </div>
          </Buttons>
        </form>
        <SignUp>
          <p>아직 4고8래 회원이 아니세요?</p>
          <p>
            <b onClick={() => navigate("/signup")}>회원가입 ＞</b>
          </p>
        </SignUp>
      </StLogin>
    </St>
  );
};

export default Login;

const St = styled.div`
  max-width: 428px;
  width: 100%;
  margin: auto;
`;

const StLogin = styled.div`
  vertical-align: middle;
  padding-top: 120px;
  width: 100%;

  & p {
    margin-bottom: 10px;
  }

  & button {
    background-color: #abd4e2;
    color: white;
    border: none;
    border-radius: 5px;
    width: 85%;
    height: 48px;
    cursor: pointer;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    display: block;
    margin: 0 auto;
  }
`;

const Input = styled.div`
  display: block;
  margin: 40px auto;
  width: 100%;

  & input {
    width: 95%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    padding-right: 10px;
    margin: 0 auto;
  }
`;

const Inputs = styled.div`
  margin: 100px auto;
  width: 85%;
`;

const Buttons = styled.div`
  margin: 100px 0;
`;

const SignUp = styled.div`
  margin: 100px 0;
  text-align: center;
  color: #a19a9a;

  & b {
    cursor: pointer;
  }
`;