import { Card } from '@components';
import { Table } from '@elements';
import { currencyFormat, limitWord } from '@utils';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EDIT, DELETE } from 'src/pages/master/shared/constant';

const TableTopping = (props) => {
    const { handleModalAddEdit, promoData } = props;

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {promoData.map((item) => (
                    <tr key={item?.id}>
                        <td className='autofit'>{item?.name ?? '-'}</td>
                        <td className='autofit'>{item?.code ?? '-'}</td>
                        <td className='autofit'>
                            {`${item?.discount}%` ?? '-'}
                        </td>
                        <td className='autofit'>
                            {limitWord(item?.description) ?? '-'}
                        </td>
                        <td className='autofit'>
                            {moment(item.start_date).format('DD MMMM YYYY')}
                        </td>
                        <td className='autofit'>
                            {moment(item.end_date).format('DD MMMM YYYY')}
                        </td>
                        <td className='autofit'>
                            {item.status === 1 ? 'Active' : 'Non-Active'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default TableTopping;
