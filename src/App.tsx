import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';

import {ConfigProvider, theme} from 'antd';
import {router} from 'router';
import store from 'store';

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: [theme.darkAlgorithm],
        }}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  );
}

export default App;
