import React, { useState } from 'react';
import styled from "styled-components";
import DetailImage from './DetailImage';
import Header from '../header/Header'

const DetailProduct = () => {
  const [count, setCount] = useState(0);
  //상품 가격
  let price = 200000*count;

  //정규식으로 세자리마다 ,찍어주는 함수
  let result = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const onChangeHandler = (event, setState) => setState(event.target.value);
  return (
    <>
      <BoxDiv>
        <Header />
        <Box>
          <Cover>
            <ImgCover>
              <DetailImage />
              <ThemeDiv>
              </ThemeDiv>
              <TitleDiv>
                <TitleSpan>테스트제품</TitleSpan>
              </TitleDiv>
              <TitleDiv>
                <TitleSpan>가격₩ 200,000</TitleSpan>
              </TitleDiv>
              <CountDiv>
                <CountSpan>수량</CountSpan>
                <input
                  type="number"
                  min="0"
                  name="count"
                  value={count}
                  onChange={(event) => onChangeHandler(event, setCount)}
                />
              </CountDiv>
              <TitleDiv>
                <TitleSpan>총 상품 금액</TitleSpan>
                <TotalDiv>
                  <TotalSpan>총 수량 {count}개</TotalSpan>
                  <TotalPriceSpan> ₩{result}</TotalPriceSpan>
                </TotalDiv>
              </TitleDiv>
              <BuyDiv>
               <BuyBut>구매하기</BuyBut>
               <ButtonDiv>
                <AskBut>
                      문의하기
                  </AskBut>
                  <LikeBut>찜하기</LikeBut>
                </ButtonDiv>
              </BuyDiv>
            </ImgCover>
          </Cover>
        </Box>
      </BoxDiv>
    </>
  )
}

export default DetailProduct;

const BoxDiv = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
`;
const Box = styled.div`
  padding-top: 3.8rem;
`;
const Cover = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #eef6fa;
`;
const ImgCover = styled.div`
  flex-shrink: 0;
  width: 90%;
  max-width: 428px;
  min-height: 450px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const ThemeDiv = styled.div`
  padding-top: 2rem;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  align-items:center;
`;
const TitleSpan = styled.b`
  font-weight: 700;
  font-size: 18px;
  margin: 5px 0;
`;
const CountDiv = styled.div`
  display: flex;
  padding-top: 0.5rem;
  input{
    width:15%;
    padding:0;
    padding-left:0.5rem;
    font-weight:700;
    font-size:1rem;
    margin:0;
    ::-webkit-inner-spin-button {
    height:43px;
    margin: 0;
    padding-right:0.3rem;
    }
  }
`;
const CountSpan = styled.b`
  font-weight: 700;
  font-size: 18px;
  margin: 5px 0;
  padding-right:1rem;
`;
const TotalDiv = styled.div`
  display: flex;
  align-items:center;
`
const TotalSpan = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin: 5px 0;
  color: rgb(136, 136, 136);
  padding-right:0.5rem;
`;
const TotalPriceSpan = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin: 5px 0;
  color: rgb(95, 0, 128);
`;

const BuyDiv = styled.div`

  margin-top: 30px;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const BuyBut = styled.button`
  cursor: pointer;
  color: white;
  background-color: #abd4e2;
  border: 0px;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.5rem;
  width: 100%;
  font-weight: bold;
  margin-right: 0.5rem;
`;

const LikeBut = styled.button`
  cursor: pointer;
  font-weight: 600;
  color: #abd4e2;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.1rem;
  width: 100%;
`;

const AskBut = styled.button`
  cursor: pointer;
  color: #abd4e2;
  background-color: white;
  border: 3px solid #abd4e2;
  height: 2.5rem;
  border-radius: 5px;
  line-height: 2.1rem;
  width: 100%;
  font-weight: bold;
  margin-right: 0.5rem;
`;