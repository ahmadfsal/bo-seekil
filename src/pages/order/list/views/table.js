import { Table } from '@elements';
import { currencyFormat } from '@utils';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TableOrderList = (props) => {
    const { data, handleFetchItems } = props;

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Whatsapp</th>
                        <th>Order Type</th>
                        <th>Store Location</th>
                        <th>Pickup Address</th>
                        <th>Drop Off Location</th>
                        <th>Items</th>
                        <th>Promo</th>
                        <th>Order Date</th>
                        <th>Updated Date</th>
                        <th>Status</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.list?.map((item) => (
                        <tr key={item?.id}>
                            <td className='is-clickable'>
                                <Link to={`/order/edit/${item?.order_id}`}>
                                    {item?.order_id ?? '-'}
                                </Link>
                            </td>
                            <td className='autofit'>{item?.customer_name ?? '-'}</td>
                            <td className='autofit'>{item?.whatsapp ?? '-'}</td>
                            <td className='autofit'>{item?.master_type?.name ?? '-'}</td>
                            <td className='autofit'>{item?.master_store?.name ?? '-'}</td>
                            <td className='autofit'>{item?.pickup_address ?? '-'}</td>
                            <td className='autofit'>{item?.master_partnership?.name ?? '-'}</td>
                            <td className='autofit'>{`${item?.qty} item`}</td>
                            <td className='autofit'>{item?.promo?.name ?? '-'}</td>
                            <td className='autofit'>
                                {moment(item?.order_date).format(
                                    'DD MMMM YYYY H:mm:ss'
                                )}
                            </td>
                            <td className='autofit'>
                                {moment(item?.updatedAt).format(
                                    'DD MMMM YYYY H:mm:ss'
                                )}
                            </td>
                            <td className='autofit'>
                                {item?.master_status?.name ?? '-'}
                            </td>
                            <td className='autofit'>
                                Rp {currencyFormat(item?.total) ?? '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default TableOrderList;
