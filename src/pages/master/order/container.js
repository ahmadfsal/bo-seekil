import { useEffect, useState } from 'react';
import { Level, LevelLeft, Columns } from '@layout';
import { Title } from '@elements';
import { ModalLoading } from '@components';
import { seekilApi } from '@service/api.services';
import {
    MASTER_TYPE,
    MASTER_STATUS,
    ADD,
    EDIT,
    DELETE
} from 'src/pages/master/shared/constant';

import MasterType from './views/master-type';
import MasterStatus from './views/master-status';
import ModalAdd from './views/modal-add';

const Order = () => {
    const defaultModalAttr = {
        isShow: false,
        type: '', // Order Type or Order Status
        state: '', // Add or Edit
        id: null // ID for Item which will be edited
    };
    const [isShowModalLoading, setShowModalLoading] = useState(false);
    const [modalAddAttr, setModalAddAttr] = useState(defaultModalAttr);
    const [masterData, setMasterData] = useState({
        type: [],
        status: []
    });

    useEffect(() => {
        initialFetchMasterData();
    }, []);

    const initialFetchMasterData = () => {
        fetchMasterType();
        fetchMasterStatus();
    };

    const fetchMasterType = () => {
        seekilApi
            .get('master/type')
            .then((res) => {
                if (res.status === 200) {
                    setMasterData((prevValue) => ({
                        ...prevValue,
                        type: res?.data?.list
                    }));
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterStatus = () => {
        seekilApi
            .get('master/status')
            .then((res) => {
                if (res.status === 200) {
                    setMasterData((prevValue) => ({
                        ...prevValue,
                        status: res?.data?.list
                    }));
                }
            })
            .catch((err) => console.log(err));
    };

    const handleModalAdd = (type, state, id) => {
        if (modalAddAttr.isShow) {
            setModalAddAttr(defaultModalAttr);
        } else {
            setModalAddAttr({
                isShow: true,
                type,
                state,
                id
            });
        }
    };

    const getTypeOfEdited = () => {
        let str = '';

        switch (modalAddAttr.type) {
            case MASTER_TYPE:
                return (str = 'type');
            case MASTER_STATUS:
                return (str = 'status');
        }

        return str;
    };

    const handleSubmitForm = (values, setFieldValue) => {
        try {
            setModalAddAttr(defaultModalAttr);
            setShowModalLoading(true);

            switch (modalAddAttr.state) {
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
        seekilApi.post(`master/${getTypeOfEdited()}`, values).then((res) => {
            if (res.status === 200) {
                setFieldValue('name', '');
                setFieldValue('description', '');
                initialFetchMasterData();
            }
        });
    };

    const continueUpdateData = (values, setFieldValue) => {
        seekilApi
            .put(`master/${getTypeOfEdited()}/${modalAddAttr.id}`, values)
            .then((res) => {
                if (res.status === 200) {
                    setFieldValue('name', '');
                    setFieldValue('description', '');
                    initialFetchMasterData();
                }
            });
    };

    const continueDeleteData = () => {
        seekilApi
            .delete(`master/${getTypeOfEdited()}/${modalAddAttr.id}`)
            .then((res) => {
                if (res.status === 200) {
                    initialFetchMasterData();
                }
            });
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Order</Title>
                </LevelLeft>
            </Level>

            {/* <Columns> */}
            <MasterType
                handleModalAdd={handleModalAdd}
                typeData={masterData.type}
            />
            <MasterStatus
                handleModalAdd={handleModalAdd}
                statusData={masterData.status}
            />
            {/* </Columns> */}

            <ModalAdd
                handleModalAdd={handleModalAdd}
                handleSubmitForm={handleSubmitForm}
                modalAddAttr={modalAddAttr}
            />

            <ModalLoading isShow={isShowModalLoading} />
        </>
    );
};

export default Order;
