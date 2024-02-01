import React from 'react';
import styles from './topic.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../store/api/topics.api';

function Topic() {

  const { id } = useParams();
  const navigate = useNavigate();

  const {data: post, error, isLoading} = useGetPostByIdQuery(Number(id));

  function handleOnClick() {
    navigate(-1);
  }

  return (
    <>
      { post && 
        <>
          <h1 className={styles.heading}>📖 {post.id}. {post.title}</h1>
          <p className={styles.description}>{post.body}</p>
        </>
      }
      <p className={styles.description}>
        <button onClick={handleOnClick}>Назад</button>
      </p>
      { isLoading && <p className={styles.info}>⌛ Загрузка данных...</p> }
      { error && <p className={styles.info}>😫 Ошибка загрузки данных</p> }
    </>
  );
}

export default Topic;