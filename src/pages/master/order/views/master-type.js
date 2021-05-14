import { Level, LevelLeft, LevelRight, Column } from '@layout';
import { Card } from '@components';
import { Button, Table, Title } from '@elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import {
    MASTER_TYPE,
    EDIT,
    ADD,
    DELETE
} from 'src/pages/master/shared/constant';

const MasterType = (props) => {
    const { handleModalAdd, typeData } = props;

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title isSubtitle>Type</Title>
                </LevelLeft>
                <LevelRight>
                    <Button
                        className='is-primary'
                        onClick={() => {
                            handleModalAdd(MASTER_TYPE, ADD, null);
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add New Type
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
                    {typeData.map((item) => (
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
                                            MASTER_TYPE,
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
                                            MASTER_TYPE,
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
        </>
    );
};

export default MasterType;
