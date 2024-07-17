import React from 'react';
import styled from 'styled-components';
import promotionImage from '../../assets/rawSvg/promotionSVG.svg';
import HeadingComponent from '../headingComponent/heading';

export default function AuthPromotionScreen() {
  return (
    <ImageBackground>
      <TextContainer>
        <Heading text="Welcome to EZDebris" fontSize="1.75rem" color="white" />
        <Heading text="Log in to manage disaster response, track incidents, and streamline operations efficiently." fontSize="0.95rem" color="white" margin="5px 0 0 0" />
      </TextContainer>
    </ImageBackground>
  );
}

const Heading = ({ text = '', margin, fontSize = '0.75rem', color = '#3B3B3B' }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};

const ImageBackground = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${promotionImage});
  background-size: cover; 
  background-position: center;
  height: 100vh;
  position: relative;
`;

const TextContainer = styled.div`
  position: absolute; 
  bottom: 10%; 
  left: 50%; 
  transform: translateX(-50%); 
  width: 80%;
  padding: 20px;
  background: rgba(145, 145, 145, 0.54); 
  border-radius: 10px; 
  color: white;
  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.7);
  z-index: 1; 
  text-align: left; 
`;