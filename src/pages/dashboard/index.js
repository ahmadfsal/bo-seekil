import { Title } from '@elements';
import { Level, LevelLeft } from '@layout';

const Dashboard = () => {
    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Dashboard</Title>
                </LevelLeft>
            </Level>
            <div className=''>
                Welcome to Seekil Back Office
            </div>
        </>
    );
};

export default Dashboard;
