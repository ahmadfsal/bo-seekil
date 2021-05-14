import { Level, LevelLeft, LevelRight, Column } from '@layout';
import { Card } from '@components';
import { Button, Table, Title } from '@elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    EDIT,
    MASTER_STATUS,
    ADD,
    DELETE
} from 'src/pages/master/shared/constant';

const MasterStatus = (props) => {
    const { handleModalAdd, statusData } = props;

    return (
        <div className='mt-5'>
            <Level>
                <LevelLeft>
                    <Title isSubtitle>Status</Title>
                </LevelLeft>
                <LevelRight>
                    <Button
                        className='is-primary'
                        onClick={() => {
                            handleModalAdd(MASTER_STATUS, ADD, null);
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add New Status
                    </Button>
                </LevelRight>
            </Level>

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {statusData.map((item) => (
                        <tr key={item?.id}>
                            <td className='autofit'>{item?.name}</td>
                            <td className='is-max-width-100'>
                                {item?.description}
                            </td>
                            <td>
                                <FontAwesomeIcon
                                    icon={faEdit}
                                    className='is-clickable'
                                    onClick={() => {
                                        handleModalAdd(
                                            MASTER_STATUS,
                                            EDIT,
                                            item?.id
                                        );
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className='is-clickable ml-5 has-text-danger'
                                    onClick={() => {
                                        handleModalAdd(
                                            MASTER_STATUS,
                                            DELETE,
                                            item?.id
                                        );
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default MasterStatus;
