import { Table } from '@elements';
import { currencyFormat } from '@utils';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

const TableOrderList = (props) => {
    const { data, handleModalTracking } = props;

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
                        <th>Payment Method</th>
                        <th>Payment Status</th>
                        <th>Order Date</th>
                        <th>Updated Date</th>
                        <th>Status</th>
                        <th>Tracking</th>
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
                            <td className='autofit'>
                                {item?.customer?.name ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.customer?.whatsapp ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.master_type?.name ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.master_store?.name ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.customer?.address ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.master_partnership?.name ?? '-'}
                            </td>
                            <td className='autofit'>{`${item?.qty} item`}</td>
                            <td className='autofit'>
                                {item?.master_promo?.code ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.master_payment_method?.name ?? '-'}
                            </td>
                            <td className='autofit'>
                                {item?.payment_status === 'lunas'
                                    ? 'Lunas'
                                    : 'Belum Lunas'}
                            </td>
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
                            <td className='is-clickable has-text-centered'>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    onClick={() =>
                                        handleModalTracking(item?.order_id)
                                    }
                                />
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
