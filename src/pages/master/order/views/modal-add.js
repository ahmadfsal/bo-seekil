import { useEffect, useState } from 'react';
import { Modal } from '@components';
import { seekilApi } from '@service/api.services';
import {
    ADD,
    DELETE,
    MASTER_STATUS,
    MASTER_TYPE
} from 'src/pages/master/shared/constant';
import { Formik } from 'formik';
import { FormField } from '@form';
import {
    createOrderTypeStatusInitialValues,
    createOrderTypeStatusValidationSchema
} from 'src/pages/master/shared/scheme';

const ModalAdd = (props) => {
    const { handleModalAdd, handleSubmitForm, modalAddAttr } = props;
    const { isShow, type, state, id } = modalAddAttr;
    const [itemWillBeEdited, setItemWillBeEdited] = useState({});
    const isOrderType = type === MASTER_TYPE;
    const isStateAdd = state === ADD;

    const getTitle = () => {
        let title = '';

        switch (type) {
            case MASTER_TYPE:
                return (title = 'Type Name');
            case MASTER_STATUS:
                return (title = 'Status Name');
        }

        return title;
    };

    const getTypeOfEdited = () => {
        let str = '';

        switch (type) {
            case MASTER_TYPE:
                return (str = 'type');
            case MASTER_STATUS:
                return (str = 'status');
        }

        return str;
    };

    useEffect(() => {
        if (isStateAdd) {
            setItemWillBeEdited({});
        } else {
            if (id) {
                seekilApi
                    .get(`master/${getTypeOfEdited()}/${id}`)
                    .then((res) => {
                        if (res.status === 200) {
                            setItemWillBeEdited(res.data);
                        }
                    })
                    .catch((err) => console.log(err));
            }
        }
    }, [modalAddAttr]);

    return state === DELETE ? (
        <Modal
            isShow={isShow}
            onClickPositiveBtn={handleSubmitForm}
            title='Delete Item'
            onClickNegativeBtn={handleModalAdd}
        >
            <p>Are you sure want to delete this item?</p>
        </Modal>
    ) : (
        <Formik
            initialValues={createOrderTypeStatusInitialValues(itemWillBeEdited)}
            validationSchema={createOrderTypeStatusValidationSchema}
            enableReinitialize
            onSubmit={(values, actions) => {
                handleSubmitForm(values, actions.setFieldValue);
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Modal
                        isShow={isShow}
                        positiveBtnType='submit'
                        positiveBtnText='Save'
                        onClickPositiveBtn={handleSubmit}
                        onClickNegativeBtn={() => {
                            handleModalAdd();
                            setFieldValue('name', '');
                            setFieldValue('description', '');
                        }}
                        title={
                            isOrderType
                                ? `${isStateAdd ? 'Add New Type' : 'Edit Type'}`
                                : `${
                                      isStateAdd
                                          ? 'Add New Status'
                                          : 'Edit Status'
                                  }`
                        }
                    >
                        <FormField
                            name='name'
                            type='text'
                            label={getTitle()}
                            isMandatory
                            placeholder={`Input ${getTitle()}`}
                        />
                        <FormField
                            name='description'
                            type='textarea'
                            label='Description'
                            placeholder='Input Description'
                            isMandatory
                        />
                    </Modal>
                </form>
            )}
        </Formik>
    );
};

export default ModalAdd;
