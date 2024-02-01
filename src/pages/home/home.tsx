import React from 'react';
import styles from './home.module.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate = useNavigate();

  const [state, setState] = React.useState({
    items: Array.from({ length: 20 })
  });

  function fetchMoreData() {
    setTimeout(() => {
      setState({
        items: state.items.concat(Array.from({ length: 20 }))
      });
    }, 300);
  };

  function handleOnClick(id: number) {
    navigate('/topic/' + id);
  }

  return (
    <>
      <h1>Главная страница</h1>
      <hr />
      <InfiniteScroll
        dataLength={state.items.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Загрузка...</h4>}
      >
        {state.items.map((i, index) => (
          <div className={styles.card} key={index}>
            №{index} - Заголовок - Текст - <button onClick={() => handleOnClick(index)}>Просмотр</button>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}

export default Home;