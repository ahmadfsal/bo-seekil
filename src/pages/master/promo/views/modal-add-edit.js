import { useEffect, useState } from 'react';
import { Modal } from '@components';
import { FormField } from '@form';
import { Column, Columns } from '@layout';
import { seekilApi } from '@service/api.services';
import { Formik } from 'formik';
import { ADD, EDIT, DELETE } from 'src/pages/master/shared/constant';
import {
    toppingInitialValues,
    toppingValidationSchema
} from 'src/pages/master/shared/scheme';

const ModalAddEdit = (props) => {
    const { handleModalAddEdit, handleSubmitForm, modalAddEditAttr } = props;
    const { isShow, type, id } = modalAddEditAttr;
    const [itemWillBeEdited, setItemWillBeEdited] = useState({});

    useEffect(() => {
        if (type === EDIT && id) {
            seekilApi
                .get(`master/topping/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        setItemWillBeEdited(res.data);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            setItemWillBeEdited({});
        }
    }, [modalAddEditAttr]);

    const resetForm = (setFieldValue) => {
        setFieldValue('name', '');
        setFieldValue('price', '');
        setFieldValue('description', '');
    };

    return type === DELETE ? (
        <Modal
            title='Delete Item'
            isShow={isShow}
            onClickNegativeBtn={handleModalAddEdit}
            onClickPositiveBtn={handleSubmitForm}
        >
            <p>Are you sure want to delete this item?</p>
        </Modal>
    ) : (
        <Formik
            initialValues={toppingInitialValues(itemWillBeEdited)}
            validationSchema={toppingValidationSchema}
            enableReinitialize
            onSubmit={(values, action) => {
                handleSubmitForm(values, action.setFieldValue);
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Modal
                        isShow={isShow}
                        onClickPositiveBtn={handleSubmit}
                        title={
                            type === ADD ? 'Add New Topping' : 'Edit Toppings'
                        }
                        positiveBtnText='Save'
                        onClickNegativeBtn={() => {
                            handleModalAddEdit();
                            resetForm(setFieldValue);
                        }}
                    >
                        <Columns>
                            <Column>
                                <FormField
                                    name='name'
                                    label='Topping Name'
                                    type='text'
                                    placeholder='Input Topping Name'
                                    isMandatory
                                />
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                                <FormField
                                    name='price'
                                    label='Price'
                                    type='number'
                                    placeholder='Input Price'
                                    isMandatory
                                />
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                                <FormField
                                    name='description'
                                    label='Description'
                                    type='textarea'
                                    placeholder='Input Description'
                                    isMandatory
                                />
                            </Column>
                        </Columns>
                    </Modal>
                </form>
            )}
        </Formik>
    );
};

export default ModalAddEdit;
