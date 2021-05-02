import { Table } from '@elements';
import { currencyFormat } from '@utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EDIT, DELETE } from 'src/pages/master/shared/constant';

const TableProduct = (props) => {
    const { data, handleModalAddEdit } = props;

    return (
        <Table className='is-fullwidth'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Estimate</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data?.list?.map((item) => (
                    <tr key={item?.id}>
                        <td className='autofit'>{item?.name}</td>
                        <td>{`${item?.estimate} (days)`}</td>
                        <td>Rp {currencyFormat(item?.price)}</td>
                        <td className='is-max-width-200'>
                            {item?.description}
                        </td>
                        <td>
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

export default TableProduct;
