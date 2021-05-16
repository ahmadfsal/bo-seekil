import { Table } from '@elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EDIT, DELETE } from 'src/pages/master/shared/constant';
import moment from 'moment';

const DataTable = (props) => {
    const { handleModalAddEdit, partnershipData } = props;

    return (
        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Whatsapp</th>
                    <th>Address</th>
                    <th>Potongan</th>
                    <th>Drop Zone</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {partnershipData?.map((item) => (
                    <tr key={item?.id}>
                        <td className='autofit'>{item?.name ?? '-'}</td>
                        <td className='autofit'>{item?.whatsapp ?? '-'}</td>
                        <td className='autofit'>{item?.address ?? '-'}</td>
                        <td className='autofit'>
                            {item.potongan ? `${item.potongan} %` : '-'}
                        </td>
                        <td className='autofit'>
                            {item?.drop_zone === 'yes' ? 'Yes' : 'No'}
                        </td>
                        <td className='autofit'>
                            {moment(item?.start_date).format('DD MMMM YYYY') ??
                                '-'}
                        </td>
                        <td className='autofit'>
                            {item?.end_date
                                ? moment(item?.end_date).format('DD MMMM YYYY')
                                : '-'}
                        </td>
                        <td className='autofit'>
                            <FontAwesomeIcon
                                icon={faEdit}
                                className='is-clickable'
                                onClick={() => {
                                    handleModalAddEdit(EDIT, item?.id);
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                className='is-clickable ml-5 has-text-danger'
                                onClick={() => {
                                    handleModalAddEdit(DELETE, item?.id);
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DataTable;
