import {Button, Col, Row} from 'antd';
import {useAppDispatch, useAppSelector} from 'hooks/useAppRedux';

import {useEffect} from 'react';

import {fetchLaunches} from 'store/reducers/launches/launchesActions.ts';
import LaunchList from 'components/LaunchList/index.tsx';
import {ILaunchesStore} from 'models/launches.ts';
import {launchesSelector} from 'store/reducers/launches/launchesReducer.ts';
import {populate} from 'consts/populate.ts';
import styles from './index.module.css';
import {useNavigate} from 'react-router-dom';

export default function Favorites(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {favorites, page, limit, sort} =
    useAppSelector<ILaunchesStore>(launchesSelector);

  useEffect(() => {
    dispatch(
      fetchLaunches({
        options: {
          page,
          limit,
          sort,
          populate,
        },
        query: {
          _id: favorites,
          upcoming: false,
        },
      }),
    );
  }, [page, limit, sort, favorites]);

  function goHome() {
    navigate(`/spaceapp/`);
  }

  return (
    <>
      <Col span={24}>
        <Row align="middle" className={styles.wrapper} justify="space-between">
          <h2>Favorite</h2>
          <Button onClick={goHome}>To Launches</Button>
        </Row>
      </Col>
      <LaunchList />
    </>
  );
}
