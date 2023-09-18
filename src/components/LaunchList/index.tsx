import {Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {Docs, ILaunchesStore} from 'models/launches.ts';
import {useAppDispatch, useAppSelector} from 'hooks/useAppRedux';
import {
  launchesSelector,
  changeTable,
  addFavorites,
  removeFavorites,
} from 'store/reducers/launches/launchesReducer';
import {formatDate} from 'utils/formatDate.ts';
import {useNavigate} from 'react-router-dom';
import styles from 'components/LaunchList/index.module.css';
import useIsMobile from 'hooks/useIsMobile.tsx';
import {AxisStatus} from 'models/axios.ts';
import {StarOutlined, StarFilled} from '@ant-design/icons';

const columns = ({
  isMobile,
  favorites,
  dispatch,
}: {
  isMobile: boolean;
  favorites: string[];
  dispatch: any;
}): ColumnsType<Docs> => {
  return [
    {
      title: 'Favorite',
      width: isMobile ? 30 : 50,
      dataIndex: 'favorites',
      key: 'favorites',
      fixed: 'left',
      onCell: (record) => {
        return {
          onClick: (ev) => {
            ev.stopPropagation();
            const id = record.id;
            if (favorites.includes(id)) {
              dispatch(removeFavorites(id));
            } else {
              dispatch(addFavorites(id));
            }
          },
        };
      },
      render: (id) => {
        return (
          <div className={styles.starWrapper}>
            {favorites.includes(id) ? <StarFilled /> : <StarOutlined />}
          </div>
        );
      },
    },
    {
      title: 'Flight number',
      width: isMobile ? 30 : 60,
      dataIndex: 'flight_number',
      key: 'flight_number',
      fixed: 'left',
      sorter: true,
    },
    {
      title: 'Name',
      width: isMobile ? 100 : 200,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Rocket',
      width: 150,
      dataIndex: ['rocket', 'name'],
      key: 'rocket',
      sorter: true,
    },
    {
      title: 'Date',
      width: 120,
      dataIndex: 'date_utc',
      key: 'date_utc',
      sorter: true,
      render: formatDate,
    },
    {
      title: 'Status',
      width: 150,
      dataIndex: 'success',
      key: 'success',
      sorter: true,
      render: (success) => {
        return success ? (
          <Tag bordered={false} color="success">
            success
          </Tag>
        ) : (
          <Tag bordered={false} color="error">
            error
          </Tag>
        );
      },
    },
    {
      title: 'Number of crew',
      width: 100,
      dataIndex: 'crew',
      key: 'crew',
      render: (crew) => {
        return crew?.length || 0;
      },
    },
  ];
};

function LaunchList() {
  const {docs, limit, totalDocs, status, filter, page, favorites} =
    useAppSelector<ILaunchesStore>(launchesSelector);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  function onSelect(id: string) {
    navigate(`/spaceapp/launch/${id}`);
  }

  function onChangeTable(pagination: any, _filter: any, sorter: any) {
    const {current, pageSize} = pagination;
    dispatch(
      changeTable({
        page: current,
        limit: pageSize,
        sort: sorter.column
          ? {
              [sorter.field]: sorter.order === 'descend' ? 'desc' : 'asc',
            }
          : null,
        filter,
      }),
    );
  }

  return (
    <Table
      className={styles.table}
      columns={columns({isMobile, favorites, dispatch})}
      dataSource={docs.map((doc) => ({
        key: doc.id,
        favorites: doc.id,
        ...doc,
      }))}
      size={isMobile ? 'small' : 'middle'}
      scroll={{x: 1300, y: 400}}
      bordered={true}
      onRow={(record) => {
        return {
          onClick: () => onSelect(record.id),
        };
      }}
      pagination={{
        defaultPageSize: limit,
        pageSize: limit,
        total: totalDocs,
        current: page,
      }}
      onChange={onChangeTable}
      loading={status === AxisStatus.Pending}
    />
  );
}

export default LaunchList;
