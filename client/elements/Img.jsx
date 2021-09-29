import React from 'react';

const imgStyle = {

  img: {
    outline: 'none',
    textDecoration: 'none',
    border: 'none',
    display: 'block'
  }

};

function Img(props) {
  return (
    <img
      src={props.src}
      style={{ ...imgStyle.img, ...props.style }}
    />
  );
}

export default Img;
