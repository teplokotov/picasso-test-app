import React from 'react';
import styles from './topic.module.css';
import { useNavigate, useParams } from 'react-router-dom';

function Topic() {

  const { id } = useParams();
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(-1);
  }

  return (
    <>
      <div>Topic {id}</div>
      <button onClick={handleOnClick}>Назад</button>
    </>
  );
}

export default Topic;