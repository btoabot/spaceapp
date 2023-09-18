import {Card, Col, Button, Form, Input, Row, DatePicker} from 'antd';
import styles from 'components/Filter/index.module.css';
import {AxisStatus} from 'models/axios.ts';
import {useAppDispatch, useAppSelector} from 'hooks/useAppRedux.tsx';
import {IFilter, ILaunchesStore} from 'models/launches.ts';
import {
  changeFilter,
  launchesSelector,
} from 'store/reducers/launches/launchesReducer.ts';
import {removeEmpty} from 'utils/removeEmpty.ts';
const {RangePicker} = DatePicker;

const span = {
  xs: 18,
  sm: 20,
  md: 8,
  lg: 8,
};

export default function Filter() {
  const {status} = useAppSelector<ILaunchesStore>(launchesSelector);
  const dispatch = useAppDispatch();
  function onSubmit(filter: IFilter) {
    const rangeValue: IFilter[] = filter['date_utc'];
    const result = removeEmpty(filter);
    // console.log(rangeValue);
    if (rangeValue) {
      result['date_utc'] = {
        $gte: rangeValue[0].format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
        $lte: rangeValue[1].format('YYYY-MM-DDTHH:mm:ssZ[Z]'),
      };
    }

    dispatch(changeFilter({filter: result}));
  }

  return (
    <Col span={24}>
      <Card title="Filter" className={styles.filter}>
        <Form
          layout={'inline'}
          name="basic"
          labelCol={{
            span: 6,
            xs: 12,
            sm: 6,
            md: 10,
            lg: 8,
          }}
          onFinish={onSubmit}
          // onFinishFailed={console.log}
          autoComplete="off">
          <Col {...span}>
            <Form.Item label="Launch date" name="date_utc">
              <RangePicker format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col {...span}>
            <Form.Item label="Rocket name" name="rocket.name">
              <Input />
            </Form.Item>
          </Col>
          <Col {...span}>
            <Form.Item label="Mission name" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row align="middle" justify="end">
              <Button
                htmlType="submit"
                className={styles.button}
                loading={status === AxisStatus.Pending}>
                Apply
              </Button>
            </Row>
          </Col>
        </Form>
      </Card>
    </Col>
  );
}
