import React from 'react';

export default function ErrorMessage(props) {
  return (
    <div className="flex-container">
      {props.msg}
    </div>
  );
}
