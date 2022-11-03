import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Header from "../header/Header";
import Event from "./Event";

const List = () => {
  const [posts, setPosts] = useState([]);
  const observerTargetEl = useRef(null);
  const navigate = useNavigate();

  return (
    <StList>
      <Header/>
      <Event/>
      <Content>
        <Card>
            <>
              <ImgShadow>
                <ImgBox>
                    <Img src="data:image/jpeg;base64,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" />
                </ImgBox>
              </ImgShadow>
              <Name>
                 <ListTitle>1번</ListTitle>
              </Name>
            </>
        </Card>
        <Card>
            <>
              <ImgShadow>
                <ImgBox>
                    <Img src="data:image/jpeg;base64,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" />
                </ImgBox>
              </ImgShadow>
              <Name>
                 <ListTitle>2번</ListTitle>
              </Name>
            </>
        </Card>
        <Card>
            <>
              <ImgShadow>
                <ImgBox>
                    <Img src="data:image/png;base64,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" />
                </ImgBox>
              </ImgShadow>
              <Name>
                 <ListTitle>3번</ListTitle>
              </Name>
            </>
        </Card>
        {/* {posts &&
          posts.map((list) => (
            <Card key={list.id} onClick={() => navigate(`/detail/${list.id}`)}>
                <>
                  <ImgShadow>
                    <ImgBox>
                      <Img src={list.image} />
                    </ImgBox>
                  </ImgShadow>
                  <Name>
                    <ListTitle>{list.title}</ListTitle>
                  </Name>
                </>
            </Card>
          ))} */}
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
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  /* top: 80px; */
  height: 150px;
  max-width: 428px;
  width: 100%;
  z-index: 1;
  background-color: #ffffff;

  & div {
    width: 90px;
    height: 50px;
    background-color: #c4e0ec;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    margin: auto 15px;
  }

  & p {
    color: #ffc0c0;
    font-size: 45px;
    font-weight: 700;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  & div > p {
    display: flex;
    justify-content: center;
    margin-block-start: 8px;
    margin-block-end: 0;
    color: #ffffff;
    font-size: 24px;
    font-weight: normal;
    text-shadow: none;
    margin-top: 13px;
  }
`;

const Card = styled.div`
  text-align: center;
`;

const Content = styled.div`
  position: relative;
  margin: 0 auto;
`;

const BasicContainer = styled.div`
  max-width: 428px;
  width: 100%;
`;

const BasicImg = styled.img`
  width: 100%;
  height: 234px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.15);
  }
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
  box-shadow: inset 0 -30px 70px #2e2e2e;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  position: relative;
  width: 100%;
  height: 234px;
  z-index: -2;
  border-radius: 20px;
`;

const Name = styled.div`
  display: flex;
  position: relative;
  top: -55px;
  text-align: initial;
  margin: 0 auto;
  color: #ffffff;
  font-size: 23px;
  line-height: 33px;
  margin-block-end: 0;
  margin-block-start: 0;
  width: 80%;
`;

const ListTitle = styled.div`
  display: block;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
`;
