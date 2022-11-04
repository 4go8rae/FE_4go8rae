import React from 'react'
import styled from "styled-components";
import image2 from "../../assert/main/buy.png"

const DetailImage = () => {
  return (
    <>
     <Img alt='detailImg' src={image2}/>
    </>
  )
}

export default DetailImage;

const Img = styled.img`
  border: 1px solid rgb(238, 238, 238);
  position: relative;
  width: 100%;
  height: 100%;
  /* min-width:428px; */
  min-height:300px;
  max-height:300px;
  border-radius: 20px;
  margin-bottom:20px;
  z-index:0;
`