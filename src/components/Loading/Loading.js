import React from 'react'
import styled, { keyframes, css } from 'styled-components'

const cubeMove = keyframes`
    25% { 
      transform: translateX(42px) rotate(-90deg) scale(0.5);
      -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    } 50% { 
      transform: translateX(42px) translateY(42px) rotate(-179deg);
      -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
    } 50.1% { 
      transform: translateX(42px) translateY(42px) rotate(-180deg);
      -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
    } 75% { 
      transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
      -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    } 100% { 
      transform: rotate(-360deg);
      -webkit-transform: rotate(-360deg);
    }
`

const Spinner = styled.div`
  margin: 100px auto;
  width: 40px;
  height: 40px;
  align-self: center;
  justify-self: center;
  position: relative;
`

const cubeCSS = css`
  background-color: #501214;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  
  -webkit-animation: ${cubeMove} 1.8s infinite ease-in-out;
  animation: ${cubeMove} 1.8s infinite ease-in-out;
`

const CubeOne = styled.div`
  ${cubeCSS}
`
const CubeTwo = styled.div`
  ${cubeCSS}
  animation-delay: -0.9s;
`

export const Loading = props => {
  return (
    <Spinner>
      <CubeOne />
      <CubeTwo />
    </Spinner>
  )
}
