import { useEffect, useState } from 'react';
import { Modal } from '@components';
import { Column, Columns } from '@layout';
import { FormField } from '@form';
import { ADD, EDIT, DELETE } from 'src/pages/master/shared/constant';
import { Formik } from 'formik';
import { seekilApi } from '@service/api.services';
import {
    partnershipInitialValues,
    partnershipValidationSchema
} from 'src/pages/master/shared/scheme';

const ModalAddEdit = (props) => {
    const { modalAttr, handleSubmitForm, handleModalAddEdit } = props;
    const { id, isShow, type } = modalAttr;
    const [itemWillBeEdited, setItemWillBeEdited] = useState({});

    useEffect(() => {
        if (type === EDIT && id) {
            seekilApi
                .get(`master/partnership/${id}`)
                .then((res) => {
                    if (res.status === 200) setItemWillBeEdited(res.data.data);
                })
                .catch((err) => console.log(err));
        } else setItemWillBeEdited({});
    }, [modalAttr]);

    const resetForm = (setFieldValue) => {
        setFieldValue('name', '');
        setFieldValue('whatsapp', '');
        setFieldValue('address', '');
        setFieldValue('latitude', '');
        setFieldValue('longitude', '');
        setFieldValue('potongan', '');
        setFieldValue('drop_zone', '');
        setFieldValue('start_date', '');
        setFieldValue('end_date', '');
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
            enableReinitialize
            initialValues={partnershipInitialValues(itemWillBeEdited)}
            validationSchema={partnershipValidationSchema}
            onSubmit={(values, action) => {
                handleSubmitForm(values, action.setFieldValue);
            }}
        >
            {({ handleSubmit, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Modal
                        isShow={isShow}
                        onClickPositiveBtn={handleSubmit}
                        positiveBtnText='Save'
                        title={
                            type === ADD
                                ? 'Add New Partnership'
                                : 'Edit Partnership'
                        }
                        onClickNegativeBtn={() => {
                            handleModalAddEdit();
                            resetForm(setFieldValue);
                        }}
                    >
                        <Columns>
                            <Column>
                                <FormField
                                    type='text'
                                    name='name'
                                    label='Name'
                                    placeholder='Input Name'
                                    isMandatory
                                />
                            </Column>
                            <Column>
                                <FormField
                                    type='text'
                                    name='whatsapp'
                                    label='Whatsapp'
                                    placeholder='Input Whatsapp'
                                    isMandatory
                                />
                            </Column>
                        </Columns>

                        <Columns>
                            <Column>
                                <FormField
                                    type='textarea'
                                    name='address'
                                    label='Address'
                                    placeholder='Input Address'
                                    isMandatory
                                />
                            </Column>
                        </Columns>

                        <Columns>
                            <Column>
                                <FormField
                                    type='number'
                                    name='potongan'
                                    label='Potongan (%)'
                                    placeholder='Input Potongan'
                                    isMandatory
                                />
                            </Column>
                            <Column>
                                <FormField
                                    type='select'
                                    name='drop_zone'
                                    label='Drop Zone'
                                    placeholder='Select Drop Zone'
                                    objectValue={[
                                        { value: 'yes', text: 'Yes' },
                                        { value: 'no', text: 'No' }
                                    ]}
                                    isMandatory
                                />
                            </Column>
                        </Columns>

                        <Columns>
                            <Column>
                                <FormField
                                    type='date'
                                    name='start_date'
                                    label='Start Date'
                                    placeholder='Select Start Date'
                                    isMandatory
                                />
                            </Column>
                            <Column>
                                <FormField
                                    type='date'
                                    name='end_date'
                                    label='End Date'
                                    placeholder='Select End Date'
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
