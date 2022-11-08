import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import { instance } from "../shared/Api";

const Cart = () => {

  const getData = async () => {
    const res = await instance.get(`/api/auth/cart`);
    console.log(res.data);
  };

  useEffect(() => {
    getData();
  });

  return (
    <StCart>
      <Header />
      <Container>
       <p>여기는 장바구니</p>
      </Container>
    </StCart>
  );
};

export default Cart;

const StCart = styled.div`
  margin: 0 auto;
  max-width: 428px;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  margin-top: 100px;
`;
