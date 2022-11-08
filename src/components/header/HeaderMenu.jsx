import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

const HeaderMenu = ({ modalHandler }) => {
  const navigate = useNavigate();

  // 로그인 여부와 관리자 여부를 확인하기 위해 storage에서 가져온 데이터
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("ACCESS_TOKEN");

  const modalRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (!modalRef.current.contains(event.target)) {
      modalHandler();
    }
  };

  // 로그아웃 Click했을 경우
  const logout = () => {
    sessionStorage.removeItem("ACCESS_TOKEN");
    sessionStorage.removeItem("REFRESH_TOKEN");
    sessionStorage.removeItem("role");
    modalHandler();
    alert("로그아웃")
  };

  return (
    <MenuContainer>
      <Menu ref={modalRef}>
        <h3 onClick={() => navigate("/")}>홈</h3>
        <br />

        {/* 로그인 했을 경우 */}
        {token !== null ? (
          <>
            <h3 onClick={() => navigate("/form")}>상품 등록</h3>
            <h3 onClick={() => navigate("/cart")}>장바구니</h3>
          </>
        ) : null}

        {/* 관리자일 경우 */}
        {role === "ADMIN" ? (
          <h3 onClick={() => navigate("/form")}>상품 등록</h3>
        ) : null}

        {/* 로그인 했을 경우 "로그아웃", 로그인 안 했을 경우 "로그인" */}
        <div>
          {token === null ? (
            <h3 onClick={() => navigate("/login")}>로그인 ＞</h3>
          ) : (
            <h3
              onClick={() => {
                logout();
              }}
            >
              로그아웃 ＞
            </h3>
          )}
        </div>
      </Menu>
    </MenuContainer>
  );
};

export default HeaderMenu;

const MenuContainer = styled.div`
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
`;

const Menu = styled.div`
  position: absolute;
  left: 52.1%;
  max-width: 214px;
  width: 50%;
  float: right;
  height: 100vh;
  top: calc(0vh + 70px);
  background-color: #abd4e2;
  text-align: center;
  color: #535353;
  transition: all 0.3s;
  z-index: 999;
  margin-top: -1px;

  & h3 {
    margin: 30px auto;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  & div {
    margin-top: 60px;
    color: white;
  }
`;
