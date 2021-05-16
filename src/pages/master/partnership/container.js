import { useEffect, useState } from 'react';
import { Level, LevelLeft, LevelRight } from '@layout';
import { Button, Table, Title } from '@elements';
import { seekilApi } from '@service/api.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ADD, EDIT, DELETE } from 'src/pages/master/shared/constant';

import DataTable from './views/table';
import ModalAddEdit from './views/modal-add-edit';

const Partnership = () => {
    const defaultModalAttr = {
        isShow: false,
        type: null,
        id: null
    };

    const [partnershipData, setPartnershipData] = useState([]);
    const [modalAttr, setModalAttr] = useState(defaultModalAttr);

    useEffect(() => {
        fetchPartnership();
    }, []);

    const fetchPartnership = () => {
        seekilApi
            .get('master/partnership')
            .then((res) => setPartnershipData(res.data.list))
            .catch((err) => console.log(err));
    };

    const handleModalAddEdit = (type, id) => {
        if (modalAttr.isShow) {
            setModalAttr(defaultModalAttr);
        } else {
            setModalAttr({
                isShow: true,
                type,
                id
            });
        }
    };

    const handleSubmitForm = (values, setFieldValue) => {
        try {
            handleModalAddEdit();

            switch (modalAttr.type) {
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
        }
    };

    const continueSaveData = (values, setFieldValue) => {
        seekilApi.post('master/parnership', values).then((res) => {
            if (res.status === 200) {
                fetchPartnership();
                setFieldValue('name', '');
                setFieldValue('whatsapp', '');
                setFieldValue('address', '');
                setFieldValue('latitude', '');
                setFieldValue('longitude', '');
                setFieldValue('potongan', '');
                setFieldValue('drop_zone', '');
                setFieldValue('start_date', '');
                setFieldValue('end_date', '');
            }
        });
    };

    const continueUpdateData = (values, setFieldValue) => {
        seekilApi
            .put(`master/partnership/${modalAttr.id}`, values)
            .then((res) => {
                if (res.status === 200) {
                    fetchPartnership();
                    setFieldValue('name', '');
                    setFieldValue('whatsapp', '');
                    setFieldValue('address', '');
                    setFieldValue('latitude', '');
                    setFieldValue('longitude', '');
                    setFieldValue('potongan', '');
                    setFieldValue('drop_zone', '');
                    setFieldValue('start_date', '');
                    setFieldValue('end_date', '');
                }
            });
    };

    const continueDeleteData = () => {
        seekilApi
            .delete(`master/partnership/${modalAttr.id}`)
            .then((res) => {
                if (res.status === 200) fetchPartnership();
            });
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Partnership</Title>
                </LevelLeft>
                <LevelRight>
                    <Button
                        className='is-primary'
                        onClick={() => handleModalAddEdit(ADD)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add Partnership
                    </Button>
                </LevelRight>
            </Level>

            <DataTable
                handleModalAddEdit={handleModalAddEdit}
                partnershipData={partnershipData}
            />

            <ModalAddEdit
                handleModalAddEdit={handleModalAddEdit}
                handleSubmitForm={handleSubmitForm}
                modalAttr={modalAttr}
            />
        </>
    );
};

export default Partnership;
