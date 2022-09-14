import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './App';

const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(<Root />);
