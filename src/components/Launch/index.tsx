import {useNavigate, useParams} from 'react-router-dom';

import {Badge, Descriptions, Spin, Result, Button} from 'antd';
import {useEffect} from 'react';
import {fetchLaunches} from 'store/reducers/launches/launchesActions.ts';
import {useAppDispatch, useAppSelector} from 'hooks/useAppRedux.tsx';
import {populate} from 'consts/populate.ts';
import {ILaunchesStore, Docs} from 'models/launches.ts';
import {launchesSelector} from 'store/reducers/launches/launchesReducer';
import {formatDate} from 'utils/formatDate.ts';
import {LoadingOutlined} from '@ant-design/icons';
import type {DescriptionsProps} from 'antd';
import styles from 'components/Launch/index.module.css';
import {AxisStatus} from 'models/axios.ts';

export default function Launch() {
  const {launchId} = useParams<{launchId: string}>();
  const dispatch = useAppDispatch();
  const {docs, status} = useAppSelector<ILaunchesStore>(launchesSelector);
  const doc = docs[0];
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchLaunches({
        query: {
          _id: launchId,
          upcoming: false,
        },
        options: {
          populate,
        },
      }),
    );
  }, []);
  function onBackHome() {
    navigate(`/spaceapp/`);
  }

  if (status === AxisStatus.Rejected) {
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Button onClick={onBackHome} type="primary">
            Back Home
          </Button>
        }
      />
    );
  }
  if (!doc) {
    return (
      <Spin
        className={styles.wrapper}
        indicator={<LoadingOutlined style={{fontSize: 24}} spin />}
      />
    );
  }

  return <Descriptions title="Launch Info" bordered items={renderItems(doc)} />;
}

function renderItems(doc: Docs): DescriptionsProps['items'] {
  return [
    {
      key: '1',
      label: 'Name',
      children: doc.name,
    },
    {
      key: '2',
      label: 'Rocket name',
      children: <>{doc.rocket.name}</>,
    },

    {
      key: '3',
      label: 'Orbit',
      children: <>{doc.payloads[0].orbit}</>,
    },
    {
      key: '4',
      label: 'Date',
      children: formatDate(doc.date_utc),
    },
    {
      key: '5',
      label: 'Type',
      children: <>{doc.payloads[0].type}</>,
      span: 2,
    },
    {
      key: '6',
      label: 'Status',
      children: (
        <Badge
          status={doc.success ? 'success' : 'error'}
          text={doc.success ? 'Success' : 'Error'}
        />
      ),
      span: 3,
    },
    {
      key: '7',
      label: 'Launchpad',
      children: <>{doc.launchpad.full_name}</>,
    },
    {
      key: '8',
      label: 'Mass (kg)',
      children: <>{doc.payloads[0].mass_kg}</>,
    },
    {
      key: '9',
      label: 'Ships',
      children: doc.ships.length,
    },
    {
      key: '10',
      label: 'Details',
      children: <>{doc.details}</>,
    },
  ];
}
