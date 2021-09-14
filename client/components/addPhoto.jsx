import React from 'react';

export default function AddPhoto(props) {
  return (
    props.url
      ? <div className="card">
        <img src={props.url}></img>
      </div>
      : <div className="flex-container millenial-pink">
        <label htmlFor="image" className="center-align">
          <span className="material-icons white-text">photo_camera</span>
          <h6 className="white-text">Add Photo</h6>
        </label>
        <input
          type="file"
          name="image"
          id="image"
          className="visually-hidden"
          onChange={props.onChange}
        />
      </div>
  );
}
