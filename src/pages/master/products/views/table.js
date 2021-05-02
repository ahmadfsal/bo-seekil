import { Table } from '@elements';

const TableProduct = (props) => {
    return (
        <Table className='is-fullwidth'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody></tbody>
        </Table>
    );
};

export default TableProduct;
