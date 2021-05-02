import ReactDOM from 'react-dom';
import App from './pages';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import '@assets/styles/index.scss';

ReactDOM.render(
    <>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>,
    document.getElementById('root')
);

reportWebVitals();
