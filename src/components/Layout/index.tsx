import {Layout, Col} from 'antd';
import styles from 'components/Layout/index.module.css';
import {IChildren} from 'models/children.ts';
import useIsMobile from 'hooks/useIsMobile.tsx';
const {Content} = Layout;

export default function LayoutApp({children}: IChildren): JSX.Element {
  const isMobile = useIsMobile();
  return (
    <div className={styles.app}>
      <div className={styles.background}>
        <div className={styles['front-stars']} />
        <div className={styles['back-stars']} />
      </div>

      <Layout>
        <Content
          className={styles.bodyWrapper}
          style={{alignItems: isMobile ? 'start' : 'center'}}>
          <Col span={24}> {children}</Col>
        </Content>
      </Layout>
    </div>
  );
}
