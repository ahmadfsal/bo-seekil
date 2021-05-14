import { Title } from '@elements';
import { Level, LevelLeft } from '@layout';
import { useEffect } from 'react';
import { seekilApi } from 'src/library/services/api.services';

const Dashboard = () => {
    useEffect(() => {
        seekilApi.post('/auth/token', { username: 'it.min' }).then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
            }
        });
    }, []);

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Dashboard</Title>
                </LevelLeft>
            </Level>
            <div className=''>Welcome to Seekil Back Office</div>
        </>
    );
};

export default Dashboard;
