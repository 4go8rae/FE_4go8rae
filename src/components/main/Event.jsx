import React, { useState, useEffect } from "react";
import styled from "styled-components";
import image1 from "../../assert/main/image1.png"
import image2 from "../../assert/main/buy.png"
import image3 from "../../assert/main/image2.jpg"
import Slider from "react-slick";

const Event = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
  };

  const eventList = [
    // image1,
    image2,
    // image3
  ]

  const randomIndex = Math.floor(Math.random() * eventList.length);
  const backgroundImg = eventList[randomIndex];

  return (
    <StFestival>
      <Title>이달의 행사</Title>
      <FestivalList>
        <Card >
          <img
            alt="images"
            src={backgroundImg}
          />
        </Card>
      </FestivalList>
    </StFestival>
  );
};

export default Event;

const StFestival = styled.div`
  max-width: 428px;
  width: 100%;
  text-align: center;
  font-size: 37px;
  color: #79b9d3;
  height: 400px;
  padding-top: 60px;
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
`;

const FestivalList = styled.div`
  height: 200px;
`;

const Card = styled.div`
  margin-bottom: 0;
  img {
    max-width: 428px;
    width: 100%;
    border-radius: 30px;
    height:235px;
    &:hover {
      cursor: pointer;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    }
  }
  p {
    margin: 20px auto;
    font-size: 25px;
    color: #414141;
  }
`;
