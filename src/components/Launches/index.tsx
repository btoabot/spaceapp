import {Col, Button, Row} from 'antd';
import {useAppDispatch, useAppSelector} from 'hooks/useAppRedux';

import {useEffect} from 'react';

import {fetchLaunches} from 'store/reducers/launches/launchesActions.ts';
import LaunchList from 'components/LaunchList/index.tsx';
import Filter from 'components/Filter';
import {ILaunchesStore} from 'models/launches.ts';
import {launchesSelector} from 'store/reducers/launches/launchesReducer.ts';
import {populate} from 'consts/populate.ts';
import styles from 'components/Launches/index.module.css';
import {useNavigate} from 'react-router-dom';

export default function Launches(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {page, limit, sort, filter} =
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
          ...filter,

          upcoming: false,
        },
      }),
    );
  }, [page, limit, sort, filter]);

  function goToFavorite() {
    navigate(`/spaceapp/favorites`);
  }

  return (
    <>
      <Col span={24}>
        <Col span={24}>
          <Row
            align="middle"
            className={styles.wrapper}
            justify="space-between">
            <h2>Launched</h2>
            <Button onClick={goToFavorite}>To Favorite List</Button>
          </Row>
        </Col>
        <Filter />
      </Col>
      <LaunchList />
    </>
  );
}
