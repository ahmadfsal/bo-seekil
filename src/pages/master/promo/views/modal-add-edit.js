import { useEffect, useState } from 'react';
import { Modal } from '@components';
import { FormField } from '@form';
import { Column, Columns } from '@layout';
import { seekilApi } from '@service/api.services';
import { Formik } from 'formik';
import { ADD, EDIT, DELETE } from 'src/pages/master/shared/constant';
import {
    promoInitialValues,
    promoValidationSchema
} from 'src/pages/master/shared/scheme';

const ModalAddEdit = (props) => {
    const { handleModalAddEdit, handleSubmitForm, modalAddEditAttr } = props;
    const { isShow, type, id } = modalAddEditAttr;
    const [itemWillBeEdited, setItemWillBeEdited] = useState({});

    useEffect(() => {
        if (type === EDIT && id) {
            seekilApi
                .get(`master/promo/${id}`)
                .then((res) => {
                    if (res.status === 200) setItemWillBeEdited(res.data.data);
                })
                .catch((err) => console.log(err));
        } else {
            setItemWillBeEdited({});
        }
    }, [modalAddEditAttr]);

    const resetForm = (setFieldValue) => {
        setFieldValue('name', '');
        setFieldValue('code', '');
        setFieldValue('discount', '');
        setFieldValue('description', '');
        setFieldValue('start_date', '');
        setFieldValue('end_date', '');
        setFieldValue('status', '');
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
            initialValues={promoInitialValues(itemWillBeEdited)}
            validationSchema={promoValidationSchema}
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
                        title={type === ADD ? 'Add New Promo' : 'Edit Promo'}
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
                                    label='Promo Name'
                                    type='text'
                                    placeholder='Input Promo Name'
                                    isMandatory
                                />
                            </Column>
                        </Columns>

                        <Columns>
                            <Column>
                                <FormField
                                    name='code'
                                    label='Code'
                                    type='text'
                                    placeholder='Input Code'
                                    isMandatory
                                />
                            </Column>
                            <Column>
                                <FormField
                                    name='discount'
                                    label='Discount (%)'
                                    type='number'
                                    placeholder='Input Discount'
                                    isMandatory
                                />
                            </Column>
                        </Columns>

                        <Columns>
                            <Column>
                                <FormField
                                    name='status'
                                    label='Status'
                                    type='select'
                                    placeholder='Select Status'
                                    isMandatory
                                    objectValue={[
                                        { value: 'active', text: 'Active' },
                                        { value: 'non-active', text: 'Non-Active' }
                                    ]}
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

                        <Columns>
                            <Column>
                                <FormField
                                    name='start_date'
                                    label='Start Date'
                                    type='date'
                                    placeholder='Select Start Date'
                                    isMandatory
                                />
                            </Column>
                            <Column>
                                <FormField
                                    name='end_date'
                                    label='End Date'
                                    type='date'
                                    placeholder='Input End Date'
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
