import { useState, useEffect } from 'react';
import { Title, Table } from '@elements';
import { Level, LevelLeft } from '@layout';
import { seekilApi } from '@service/api.services';

const Customer = () => {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        seekilApi
            .get('customer')
            .then((res) => {
                if (res?.data) setCustomerData(res?.data?.list);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Customer</Title>
                </LevelLeft>
            </Level>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Whatsapp</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customerData?.map((item, index) => (
                        <tr key={item?.id}>
                            <td className='autofit'>{item?.name ?? '-'}</td>
                            <td className='autofit'>{item?.whatsapp ?? '-'}</td>
                            <td className='autofit'>{item?.address ?? '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Customer;
