import React from 'react';

const imgStyle = {

  img: {
    outline: 'none',
    textDecoration: 'none',
    border: 'none',
    display: 'block'
  }

};

function Img(data) {
  const { src, alt, className, style = {} } = data;
  return (
    <img
      src={src}
      alt={alt}
      style={{ ...imgStyle.img, ...style }}
      className={className}
    />
  );
}

export default Img;
