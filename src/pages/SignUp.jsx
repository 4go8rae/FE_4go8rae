import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import { instance } from "../shared/Api";
import Swal from "sweetalert2";

const SignUp = () => {
  const navigate = useNavigate();

  const initialState = {
    username: "",
    password: "",
    passwordConfirm: "",
  };

  // 회원가입할 때 받을 정보를 저장할 state
  const [user, setUser] = useState(initialState);

  // input에 입력한 값을 state로 저장
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 회원가입
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // 모든 항목을 입력하지 않고 회원가입 버튼을 click했을 경우
    if (
      user.username === "" ||
      user.password === "" ||
      user.passwordConfirm === ""
    ) {
      Swal.fire({
        text: "모든 항목을 입력해주세요.",
        icon: "warning",
      });
      return false;
    }

    // 비밀번호와 비밀번호 확인이 일치하지 않을 경우
    else if (user.password !== user.passwordConfirm) {
      Swal.fire({
        text: "비밀번호가 일치하지 않습니다.",
        icon: "warning",
      });
      return false;
    } else {
      // 모든 조건을 충족했을 시, 서버로 데이터 전송
      try {
        console.log(user)
        const response = await instance.post("/api/member/signup", user);
        Swal.fire({
          title: `${response.data.nickname}님`,
          text: "회원가입을 축하드립니다.",
          icon: "success",
        });
        setUser(initialState);
        navigate("/login");
      } catch {
        Swal.fire({
          text: "회원가입에 실패하였습니다.",
          icon: "error",
        });
      }
    }
  };

  // 비밀번호 정규표현식
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;

  // 렌더링될 때마다 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <St>
      <Header />
      <StSignUp>
        <form onSubmit={onSubmitHandler}>
          {/* 이메일 검증 */}
          <Email>
            <label>
              <div>
                <b>아이디</b>
              </div>
              <div>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  placeholder="이메일을 입력해주세요."
                />
              </div>
            </label>
          </Email>
          {/* 비밀번호 검증 */}
          <Password>
            <label>
              <div>
                <b>비밀번호</b>
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    onChangeHandler(e);
                  }}
                  placeholder="숫자, 영문자를 혼용하여 8자리 이상 입력해주세요."
                />
              </div>
              {/* 올바른 비밀번호인지 설명해주는 문구 */}
              <div>
                {user.password === "" ? null : passwordRegex.test(
                    user.password
                  ) ? (
                  <p style={{ color: "green" }}>안전한 비밀번호예요!</p>
                ) : (
                  <p style={{ color: "red" }}>
                    숫자, 영문자 조합으로 8자리 이상 입력하세요.
                  </p>
                )}
              </div>
            </label>
          </Password>

          {/* 비밀번호 확인 */}
          <PasswordConfirm>
            <input
              type="password"
              name="passwordConfirm"
              value={user.passwordConfirm}
              onChange={onChangeHandler}
              placeholder="비밀번호를 다시 입력해주세요."
            />

            {/* 두 개의 비밀번호가 일치하는지 설명해주는 문구 */}
            <div>
              {user.passwordConfirm === "" ? null : user.password ===
                user.passwordConfirm ? (
                <p style={{ color: "green" }}>비밀번호가 일치합니다.</p>
              ) : (
                <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </PasswordConfirm>
          <Buttons>
            <Submit type="submit" value="가입하기" />
            <Cancel
              type="button"
              value="취소"
              onClick={() => navigate("/login")}
            />
          </Buttons>
        </form>
      </StSignUp>
    </St>
  );
};

export default SignUp;

const St = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const StSignUp = styled.div`
  text-align: center;

  padding-top: 90px;

  & form {
    margin-top: 100px;
  }

  & p {
    margin: 15px auto 15px 20px;
  }
`;

const Email = styled.div`
  display: block;
  margin: 40px 20px;
  width: 90%;

  & div {
    display: flex;
    gap: 10px;
  }

  & input {
    width: 100%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    margin-top: 20px;
  }
`;

const Password = styled.div`
  display: block;
  margin: 50px auto;
  width: 90%;

  & div {
    display: flex;
    margin-bottom: 20px;
  }

  & p {
    margin-bottom: -10px;
  }

  & input {
    width: 95%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    margin-bottom: -20px;
  }
`;

const PasswordConfirm = styled.div`
  width: 90%;
  margin: 0 auto;

  & input {
    width: 95%;
    height: 52px;
    background-color: rgba(172, 212, 228, 0.35);
    border-radius: 15px;
    border: none;
    padding-left: 10px;
    margin-top: -15px;
  }

  & p {
    margin-bottom: -20px;
    text-align: left;
    margin-left: 20px;
  }
`;

const Buttons = styled.div`
  margin-top: 100px;

  & input {
    margin: 20px auto;
  }
`;

const Submit = styled.input`
  background-color: rgba(121, 185, 211, 0.62);
  color: white;
  border: none;
  border-radius: 12px;
  width: 370px;
  height: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: block;
  margin: 0 auto;
`;

const Cancel = styled.input`
  background-color: white;
  color: rgba(121, 185, 211, 0.62);
  border: 3px solid rgba(121, 185, 211, 0.62);
  border-radius: 12px;
  width: 370px;
  height: 50px;
  cursor: pointer;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  display: block;
  margin: 0 auto;
`;
