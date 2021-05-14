import { useEffect, useState } from 'react';
import { Level, LevelLeft, LevelRight } from '@layout';
import { Button, Table, Title } from '@elements';
import { seekilApi } from '@service/api.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

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
                <LevelRight>
                    <Button className='is-primary'>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add Partnership
                    </Button>
                </LevelRight>
            </Level>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Whatsapp</th>
                        <th>Address</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Potongan</th>
                        <th>Drop Zone</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    {partnershipData?.map((item) => (
                        <tr key={item?.id}>
                            <td className='autofit'>{item?.name ?? '-'}</td>
                            <td className='autofit'>{item?.whatsapp ?? '-'}</td>
                            <td className='autofit'>{item?.address ?? '-'}</td>
                            <td className='autofit'>{item?.latitude ?? '-'}</td>
                            <td className='autofit'>
                                {item?.longitude ?? '-'}
                            </td>
                            <td className='autofit'>{item?.potongan ?? '-'}</td>
                            <td className='autofit'>
                                {item?.drop_zone === 0 ? 'Yes' : 'No'}
                            </td>
                            <td className='autofit'>
                                {moment(item?.start_date).format(
                                    'DD MMMM YYYY'
                                ) ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.end_date
                                    ? moment(item?.end_date).format(
                                          'DD MMMM YYYY'
                                      )
                                    : '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Partnership;
