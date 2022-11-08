import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { instance } from "../../shared/Api";
import image from "../../assert/main/basic.png";

const List = () => {
  const [products, setProducts] = useState([]);
  const observerTargetEl = useRef(null);
  const navigate = useNavigate();

  const getData = async () => {
    const res = await instance.get(`/api/product?page=0`);
    setProducts(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StList>
      <Header />
      <Content>
        <Title>사고팔래</Title>
        {products &&
          products.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/detail/${product.id}`)}
            >
              <ImgShadow>
                <ImgBox>
                  <img alt="" src={image} />
                </ImgBox>
              </ImgShadow>
              <Name>
                <div>{product.title}</div>
              </Name>
            </Card>
          ))}
      </Content>
      <div ref={observerTargetEl} />
    </StList>
  );
};

export default List;

const StList = styled.div`
  max-width: 428px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.div`
  color: white;
  background: #c4e0ec;
  border-radius: 30px;
  width: 236px;
  height: 50px;
  font-size: 30px;
  font-weight: bold;
  line-height: 45px;
  margin: 35px auto;
  padding-top: 5px;
  text-align: center;
`;

const Card = styled.div`
  text-align: center;
`;

const Content = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 100px;
`;

const ImgShadow = styled.div`
  margin: 0 auto;
  max-width: 428px;
  width: 100%;
  height: 235px;
  border-radius: 20px;
  /* z-index: 3; */
  &:hover {
    cursor: pointer;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
  }
`;

const ImgBox = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 235px;
  border-radius: 20px;
  /* box-shadow: inset 0 -30px 70px #2e2e2e; */
  &:hover {
    cursor: pointer;
  }

  & img {
    position: relative;
    width: 100%;
    height: 234px;
    z-index: -2;
    border-radius: 20px;
  }
`;

const Name = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  margin: 0 auto;
  color: black;
  font-size: 23px;
  font-weight: bold;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  width: 80%;

  & div {
    display: block;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: 5px;
  }
`;
