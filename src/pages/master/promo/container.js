import { useEffect, useState } from 'react';
import { Level, LevelLeft, LevelRight } from '@layout';
import { Button, Title } from '@elements';
import { ModalLoading } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { seekilApi } from '@service/api.services';
import { ADD, EDIT, DELETE } from 'src/pages/master/shared/constant';

import TablePromo from './views/table';
import ModalAddEdit from './views/modal-add-edit';

const MasterPromo = () => {
    const defaultModalAddEdit = {
        isShow: false,
        type: '', // ADD or Edit
        id: null // ID for Item which will be edited
    };
    const [isShowModalLoading, setShowModalLoading] = useState(false);
    const [promoData, setPromoData] = useState([]);
    const [modalAddEditAttr, setModalAddEditAttr] =
        useState(defaultModalAddEdit);

    useEffect(() => {
        fetchMasterPromo();
    }, []);

    const fetchMasterPromo = () => {
        seekilApi
            .get('master/promo')
            .then((res) => {
                if (res.status === 200) {
                    setPromoData(res?.data?.list);
                }
            })
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
        seekilApi.post('master/promo', values).then((res) => {
            if (res.status === 200) {
                fetchMasterPromo();
                setFieldValue('name', '');
                setFieldValue('code', '');
                setFieldValue('discount', '');
                setFieldValue('description', '');
                setFieldValue('start_date', '');
                setFieldValue('end_date', '');
                setFieldValue('status', '');
            }
        });
    };

    const continueUpdateData = (values, setFieldValue) => {
        seekilApi
            .put(`master/promo/${modalAddEditAttr.id}`, values)
            .then((res) => {
                if (res.status === 200) {
                    fetchMasterPromo();
                    setFieldValue('name', '');
                    setFieldValue('code', '');
                    setFieldValue('discount', '');
                    setFieldValue('description', '');
                    setFieldValue('start_date', '');
                    setFieldValue('end_date', '');
                    setFieldValue('status', '');
                }
            });
    };

    const continueDeleteData = () => {
        seekilApi.delete(`master/promo/${modalAddEditAttr.id}`).then((res) => {
            if (res.status === 200) {
                fetchMasterPromo();
            }
        });
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Promo</Title>
                </LevelLeft>
                <LevelRight>
                    <Button
                        className='is-primary'
                        onClick={() => handleModalAddEdit(ADD)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add Promo
                    </Button>
                </LevelRight>
            </Level>

            <TablePromo
                promoData={promoData}
                handleModalAddEdit={handleModalAddEdit}
            />

            <ModalAddEdit
                handleModalAddEdit={handleModalAddEdit}
                handleSubmitForm={handleSubmitForm}
                modalAddEditAttr={modalAddEditAttr}
            />
        </>
    );
};

export default MasterPromo;
