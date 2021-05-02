import RouteList from './index.routes';
import { Navbar, Sidebar } from '../library/components';
import './index.styles.scss';

const Main = () => {
    return (
        <>
            <Navbar />
            <div className='content-container'>
                <Sidebar />
                <div className='content-body'>
                    <RouteList />
                </div>
            </div>
        </>
    );
};

export default Main;
