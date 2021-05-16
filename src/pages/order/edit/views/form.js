import { Fragment, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Card } from '@components';
import { Button } from '@elements';
import { Formik } from 'formik';
import { Columns, Column, Level, LevelLeft } from '@layout';
import { FormField } from '@form';
import {
    updateOrderInitialValues,
    createOrderValidationSchema
} from 'src/pages/order/shared/scheme';
import { ORDER_STATUS_CANCEL } from 'src/pages/order/shared/constant';
import moment from 'moment';

import FormItems from './form-items';
import FormPricing from './form-pricing';

const CreateOrderForm = (props) => {
    const {
        handleGenerateInvoice,
        handleSubmit,
        itemsData,
        objectValueMasterStatus,
        objectValueOrderType,
        objectValuePartnership,
        objectValueServices,
        orderDetailData
    } = props;
    const history = useHistory();
    const params = useParams();

    return (
        <Formik
            initialValues={updateOrderInitialValues(orderDetailData, itemsData)}
            onSubmit={handleSubmit}
            enableReinitialize
            validationSchema={createOrderValidationSchema}
        >
            {({ handleSubmit, setFieldValue, values }) => (
                <Fragment>
                    <form onSubmit={handleSubmit}>
                        <Card className='is-fullheight'>
                            <Level>
                                <LevelLeft>
                                    <p className='tag is-info is-light'>
                                        {params.id}
                                    </p>
                                    <span className='mx-1'>/</span>
                                    <p className='tag is-info is-light'>
                                        {moment(orderDetailData).format(
                                            'DD MMMM YYYY HH:mm'
                                        )}
                                    </p>
                                </LevelLeft>
                            </Level>

                            <div className='divider'></div>

                            <Columns>
                                <Column>
                                    <FormField
                                        label='Customer Name'
                                        placeholder='John Doe'
                                        type='text'
                                        name='customer_name'
                                        isMandatory
                                        disabled
                                    />
                                </Column>
                                <Column>
                                    <FormField
                                        label='Whatsapp'
                                        placeholder='08xxxxxxxxxx'
                                        type='tel'
                                        pattern='[0-9]*'
                                        name='whatsapp'
                                        isMandatory
                                        disabled
                                    />
                                </Column>
                            </Columns>
                            <Columns>
                                <Column>
                                    <FormField
                                        label='Order Type'
                                        placeholder='Select Order Type'
                                        type='select'
                                        name='order_type_id'
                                        objectValue={objectValueOrderType}
                                        isMandatory
                                        disabled
                                    />
                                </Column>
                            </Columns>

                            <Columns>
                                <Column>
                                    <FormField
                                        label='Store Location'
                                        placeholder='Select Store Location'
                                        type='select'
                                        name='store_id'
                                        objectValue={objectValuePartnership}
                                        disabled
                                        // disabled={
                                        //     values['order_type_id'] !==
                                        //     ORDER_TYPE_ONSTORE
                                        // }
                                        // isMandatory={
                                        //     values['order_type_id'] ===
                                        //     ORDER_TYPE_ONSTORE
                                        // }
                                    />
                                </Column>
                                <Column>
                                    <FormField
                                        label='Drop Off Location'
                                        placeholder='Select Drop Off Location'
                                        type='select'
                                        name='partnership_id'
                                        // initValue={values['partnership_name']}
                                        objectValue={objectValuePartnership}
                                        disabled
                                        // disabled={
                                        //     values['order_type_id'] !==
                                        //     ORDER_TYPE_DROPOFF
                                        // }
                                        // isMandatory={
                                        //     values['order_type_id'] ===
                                        //     ORDER_TYPE_DROPOFF
                                        // }
                                    />
                                </Column>
                            </Columns>

                            <Columns>
                                <Column>
                                    <FormField
                                        name='pickup_address'
                                        label='Pickup Address'
                                        type='textarea'
                                        placeholder='Input Pickup Address'
                                        disabled
                                        // disabled={
                                        //     values['order_type_id'] !==
                                        //     ORDER_TYPE_PICKUP
                                        // }
                                        // isMandatory={
                                        //     values['order_type_id'] ===
                                        //     ORDER_TYPE_PICKUP
                                        // }
                                    />
                                </Column>
                            </Columns>

                            <div className='divider' />

                            <FormItems
                                objectValueServices={objectValueServices}
                                setFieldValue={setFieldValue}
                                values={values}
                            />

                            <div className='divider' />

                            <Columns>
                                <Column>
                                    <FormField
                                        label='Payment Method'
                                        placeholder='Select Payment Method'
                                        type='text'
                                        name='payment_method_name'
                                        disabled
                                    />
                                </Column>
                                <Column>
                                    <FormField
                                        label='Payment Status'
                                        placeholder='Select Payment Status'
                                        type='select'
                                        name='payment_status'
                                        isMandatory
                                        objectValue={[
                                            { text: 'Lunas', value: 'lunas' },
                                            {
                                                text: 'Belum Lunas',
                                                value: 'belum_lunas'
                                            }
                                        ]}
                                    />
                                </Column>
                            </Columns>

                            <Columns>
                                <Column>
                                    <FormField
                                        label='Promo'
                                        placeholder='Select Promo'
                                        type='text'
                                        name='promo_code'
                                        disabled
                                    />
                                </Column>
                                <Column>
                                    <FormField
                                        label='Status'
                                        placeholder='Select Order Status'
                                        type='select'
                                        name='order_status_id'
                                        objectValue={objectValueMasterStatus}
                                    />
                                </Column>
                                <Column>
                                    <FormField
                                        label='Cancel Reason'
                                        placeholder='Select Cancel Reason'
                                        type='select'
                                        name='cancel_reason_id'
                                        objectValue={[]}
                                        disabled={
                                            values['order_status_id'] !==
                                            ORDER_STATUS_CANCEL
                                        }
                                        isMandatory={
                                            values['order_status_id'] ===
                                            ORDER_STATUS_CANCEL
                                        }
                                    />
                                </Column>
                            </Columns>
                            <div className='divider' />
                            <FormPricing values={values} />
                        </Card>
                        <div className='buttons is-right my-5'>
                            <Button className='is-outlined is-danger is-medium'>
                                Drop Order
                            </Button>
                            <Button
                                className='is-medium is-primary'
                                onClick={handleGenerateInvoice}
                            >
                                Generate Invoice
                            </Button>
                            <Button
                                className='is-medium'
                                onClick={() => history.goBack()}
                            >
                                Cancel
                            </Button>
                            <Button
                                className='is-link is-medium'
                                type='submit'
                                style={{ marginRight: 0 }}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Fragment>
            )}
        </Formik>
    );
};

export default CreateOrderForm;
