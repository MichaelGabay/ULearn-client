import { Provider } from 'react-redux';
import './App.css';
import myStore from './shared/redux/store';
import AppRoutes from './shared/routes/appRoutes';

function App() {
  return (
    <Provider store={myStore}>
      <AppRoutes />
      </Provider>
  );
}

export default App;
