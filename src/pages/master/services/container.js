import { useEffect, useState } from 'react';
import { Level, LevelLeft, LevelRight } from '@layout';
import { Button, Title } from '@elements';
import { ModalLoading } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { seekilApi } from '@service/api.services';
import { ADD, EDIT, DELETE } from 'src/pages/master/shared/constant';

import Table from './views/table';
import ModalAddEdit from './views/modal-add-edit';

const MasterServices = () => {
    const defaultModalAddEdit = {
        isShow: false,
        type: '', // ADD or Edit
        id: null // ID for Item which will be edited
    };
    const [servicesData, setServicesData] = useState([]);
    const [isShowModalLoading, setShowModalLoading] = useState(false);
    const [modalAddEditAttr, setModalAddEditAttr] = useState(
        defaultModalAddEdit
    );

    useEffect(() => {
        fetchServiceData();
    }, []);

    const fetchServiceData = () => {
        seekilApi
            .get('master/service')
            .then((res) => setServicesData(res.data))
            .catch((err) => console.log(err));
    };

    const handleModalAddEdit = (type, id) => {
        if (modalAddEditAttr.isShow) {
            setModalAddEditAttr(defaultModalAddEdit);
        } else {
            setModalAddEditAttr({
                isShow: true,
                type,
                id
            });
        }
    };

    const handleSubmitForm = (values, setFieldValue) => {
        try {
            setShowModalLoading(true);
            handleModalAddEdit();

            switch (modalAddEditAttr.type) {
                case ADD:
                    continueSaveData(values, setFieldValue);
                    break;
                case EDIT:
                    continueUpdateData(values, setFieldValue);
                    break;
                case DELETE:
                    continueDeleteData();
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        } finally {
            setShowModalLoading(false);
        }
    };

    const continueSaveData = (values, setFieldValue) => {
        seekilApi.post('master/service', values).then((res) => {
            if (res.status === 200) {
                fetchServiceData();
                setFieldValue('name', '');
                setFieldValue('estimate', '');
                setFieldValue('price', '');
                setFieldValue('description', '');
            }
        });
    };

    const continueUpdateData = (values, setFieldValue) => {
        seekilApi.put(`master/service/${modalAddEditAttr.id}`, values).then((res) => {
            if (res.status === 200) {
                fetchServiceData();
                setFieldValue('name', '');
                setFieldValue('estimate', '');
                setFieldValue('price', '');
                setFieldValue('description', '');
            }
        });
    };

    const continueDeleteData = () => {
        seekilApi.delete(`master/service/${modalAddEditAttr.id}`).then((res) => {
            if (res.status === 200) {
                fetchServiceData();
            }
        });
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Services</Title>
                </LevelLeft>
                <LevelRight>
                    <Button
                        className='is-primary'
                        onClick={() => handleModalAddEdit(ADD)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add Services
                    </Button>
                </LevelRight>
            </Level>

            <Table
                data={servicesData}
                handleModalAddEdit={handleModalAddEdit}
            />

            <ModalLoading isShow={isShowModalLoading} />

            <ModalAddEdit
                handleModalAddEdit={handleModalAddEdit}
                handleSubmitForm={handleSubmitForm}
                modalAddEditAttr={modalAddEditAttr}
            />
        </>
    );
};

export default MasterServices;
