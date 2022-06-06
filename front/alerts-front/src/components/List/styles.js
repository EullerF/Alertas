import styled from "styled-components";

    const imageWidth = 380;
    const imageHeight = 347;
    const size = 0.15; /* To help resize */
    const width = imageWidth * size;
    const height = imageHeight * size;
    const rotationCenter = (imageHeight - 130.5) * size;
    const rotateTime = 2.5;

   export const Triangles = styled.div`
    position: relative;
    @keyframes rotationTriangles {
    0% {
      transform: rotate(0deg);
    }
    33.33% {
      transform: rotate(120deg);
    }
    66.66% {
      transform: rotate(240deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  img {
    position: absolute;
    width: ${`${width}px`};
    height: ${`${height}px`};
    transform-origin: 50% ${`${rotationCenter}px`};
    animation: rotationTriangles ${`${rotateTime}s`} ease-in-out infinite;
  }
  img.triangle1 {
    top: ${`${-height}px`};
    left: ${`${-width / 2}px`};
  }
  img.triangle2 {
    top: 0;
    left: 0;
  }
  img.triangle3 {
    top: 0;
    left: ${`${-width}px`};
  }
  }`;

  export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;