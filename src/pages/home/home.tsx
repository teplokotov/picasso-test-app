import React from 'react';
import styles from './home.module.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { useGetAllPostsQuery } from '../../store/api/topics.api';
import { limit } from '../../utils/constants';

function Home() {

  const navigate = useNavigate();

  const [startPos, setStartPos] = React.useState<number>(0);
  const {data , error, isLoading} = useGetAllPostsQuery({limit: limit, start: startPos});
  const posts = data ?? [];

  function fetchMoreData(): void {
    setStartPos(startPos + limit);
  };

  function handleOnClick(id: number): void {
    navigate('/topic/' + id);
  }

  return (
    <>
      <h1 className={styles.heading}>🏠 Главная страница</h1>
      {
      <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={posts.length < 100 && !error ? true : false}
          loader={<p className={styles.info}>⌛ Загрузка...</p>}
        > 
          {
            posts.map((post, index) => (
              <div className={styles.card} key={index}>
                <h2 className={styles.cardHeading}>
                  {post.id}. {post.title}
                </h2>
                <p className={styles.cardDescription}>{post.body}</p>
                <button onClick={() => handleOnClick(index)}>Просмотр</button>
              </div>
            ))
          }
        </InfiniteScroll>
      }
      { isLoading && <p className={styles.info}>⌛ Загрузка данных...</p> }
      { error && <p className={styles.info}>😫 Ошибка загрузки данных</p> }
    </>
  );
}

export default Home;