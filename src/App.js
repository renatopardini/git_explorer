import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

const App = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
