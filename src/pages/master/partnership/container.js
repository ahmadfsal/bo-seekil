import { useEffect, useState } from 'react';
import { Level, LevelLeft } from '@layout';
import { Table, Title } from '@elements';
import { seekilApi } from '@service/api.services';

const Partnership = () => {
    const [partnershipData, setPartnershipData] = useState([]);

    useEffect(() => {
        fetchPartnership();
    }, []);

    const fetchPartnership = () => {
        seekilApi
            .get('master/partnership')
            .then((res) => setPartnershipData(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Partnership</Title>
                </LevelLeft>
            </Level>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {partnershipData.map((item) => (
                        <tr key={item?.id}>
                            <td>{item?.name}</td>
                            <td>{item?.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Partnership;
