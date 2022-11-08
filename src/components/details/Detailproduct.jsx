import React, { useState, useRef } from "react";
import styled from "styled-components";
import DetailImage from "./DetailImage";
import Header from "../header/Header";
import { useParams } from "react-router-dom";
import { instance } from "../../shared/Api";
import { useEffect } from "react";

const DetailProduct = () => {
  const [count, setCount] = useState(1);
  const [product, setProduct] = useState();
  const { id } = useParams();

  // 제품 상세정보 조회
  const getData = async () => {
    const res = await instance.get(`api/product/${id}`);
    setProduct(res.data)
  };

  useEffect(() => {
    getData();
  }, []);

  //상품 가격
  let price = product?.price * count;

  //정규식으로 세자리마다 ,찍어주는 함수
  let totalPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let unitPrice = product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const onChangeHandler = (event, setState) => setState(event.target.value);

  // 장바구니에 추가
  const cartHandler = async () => {
    const req = {
      id,
      count,
    };
    const res = await instance.post(`/api/auth/cart`, req);
    console.log(res)
  };


  return (
    <Box>
      <Header />
      <Cover>
        <DetailImage />
        <Title style={{ justifyContent: "right" }}>
          <b style={{ fontSize: "23px" }}>{product?.title}</b>
        </Title>
        <Title>
          <b>가격</b>
          <b>₩ {unitPrice}</b>
        </Title>
        <Count>
          <b>수량</b>
          <input
            type="number"
            min="1"
            name="count"
            value={count}
            onChange={(event) => onChangeHandler(event, setCount)}
          />
        </Count>
        <Title>
          <b>총 상품 금액</b>
          <Price> ₩ {totalPrice}</Price>
        </Title>
        <Buttons>
          <button>구매하기</button>
          <div>
            <button>문의하기</button>
            <button onClick={cartHandler}>찜하기</button>
          </div>
        </Buttons>
      </Cover>
    </Box>
  );
};

export default DetailProduct;

const Box = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  background-color: #eef6fa;
`;

const Cover = styled.div`
  flex-shrink: 0;
  width: 90%;
  min-height: 450px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 6rem;
  padding-bottom: 20px;

  & b {
    font-weight: 700;
    font-size: 18px;
    margin: 5px 0;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  align-items: center;
`;

const Count = styled.div`
  display: flex;
  padding-top: 0.5rem;
  justify-content: space-between;

  & input {
    width: 15%;
    padding: 0;
    padding-left: 0.5rem;
    font-weight: 700;
    font-size: 1rem;
    ::-webkit-inner-spin-button {
      height: 43px;
      padding-right: 0.3rem;
    }
  }
`;

const Price = styled.p`
  font-weight: 700;
  font-size: 24px;
  margin: 5px 0;
  color: rgb(95, 0, 128);
`;

const Buttons = styled.div`
  margin-top: 30px;

  & button {
    cursor: pointer;
    color: white;
    background-color: #abd4e2;
    border: 0px;
    height: 2.5rem;
    border-radius: 5px;
    line-height: 2.5rem;
    width: 100%;
    font-weight: bold;
  }

  & div {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    gap: 15px;

    & button {
      color: #abd4e2;
      background-color: white;
      border: 3px solid #abd4e2;
      line-height: 2.1rem;
    }
  }
`;
