import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '@components';
import { Button } from '@elements';
import { Formik } from 'formik';
import { Columns, Column } from '@layout';
import { FormField } from '@form';
import {
    createOrderInitialValues,
    createOrderValidationSchema
} from 'src/pages/order/shared/scheme';
import {
    ORDER_TYPE_DROPOFF,
    ORDER_TYPE_ONSTORE,
    ORDER_TYPE_PICKUP
} from 'src/pages/order/shared/constant';

import FormItems from './form-items';
import FormPricing from './form-pricing';

const CreateOrderForm = (props) => {
    const { handleSubmit, masterData } = props;
    const history = useHistory();

    const handleSelectPromo = (objValue, formValues, setFieldValue) => {
        const { value, discount } = objValue;
        const { items } = formValues;

        const subtotal = items.reduce((acc, curr) => {
            const subtotal = acc + parseInt(curr.subtotal);

            if (!isNaN(subtotal)) {
                return parseInt(subtotal);
            }
            return 0;
        }, 0);

        let disc = (subtotal * discount) / 100;

        if (!isNaN(disc)) {
            disc = disc;
        } else {
            disc = 0;
        }

        setFieldValue('discount', discount);
        setFieldValue('potongan', disc);
        setFieldValue('promo_id', parseInt(value));
    };

    const handleSelectCutomer = (objValue, setFieldValue) => {
        const { label, whatsapp, value } = objValue;

        if (label && whatsapp) {
            setFieldValue('customer_name', label);
            setFieldValue('whatsapp', whatsapp);
        } else {
            setFieldValue('customer_name', value);
            setFieldValue('whatsapp', '');
        }
    };

    return (
        <Formik
            initialValues={createOrderInitialValues}
            onSubmit={handleSubmit}
            enableReinitialize
            validationSchema={createOrderValidationSchema}
        >
            {({ handleSubmit, setFieldValue, values }) => (
                <form onSubmit={handleSubmit}>
                    <Card className='is-fullheight'>
                        <Columns>
                            <Column>
                                <FormField
                                    label='Customer Name'
                                    placeholder='John Doe'
                                    type='select-custom'
                                    name='customer_name'
                                    objectValue={masterData.customer}
                                    onSelectedOption={(value) => {
                                        handleSelectCutomer(
                                            value,
                                            setFieldValue
                                        );
                                    }}
                                    isMandatory
                                />
                            </Column>
                            <Column>
                                <FormField
                                    label='Whatsapp'
                                    placeholder='08xxxxxxxxxx'
                                    type='number'
                                    name='whatsapp'
                                    isMandatory
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
                                    objectValue={masterData.type}
                                    isMandatory
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
                                    objectValue={masterData.partnership}
                                    disabled={
                                        values['order_type_id'] !==
                                        ORDER_TYPE_ONSTORE
                                    }
                                    isMandatory={
                                        values['order_type_id'] ===
                                        ORDER_TYPE_ONSTORE
                                    }
                                />
                            </Column>
                            <Column>
                                <FormField
                                    label='Drop Off Location'
                                    placeholder='Select Drop Off Location'
                                    type='select'
                                    name='partnership_id'
                                    objectValue={masterData.partnership}
                                    disabled={
                                        values['order_type_id'] !==
                                        ORDER_TYPE_DROPOFF
                                    }
                                    isMandatory={
                                        values['order_type_id'] ===
                                        ORDER_TYPE_DROPOFF
                                    }
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
                                    disabled={
                                        values['order_type_id'] !==
                                        ORDER_TYPE_PICKUP
                                    }
                                    isMandatory={
                                        values['order_type_id'] ===
                                        ORDER_TYPE_PICKUP
                                    }
                                />
                            </Column>
                        </Columns>

                        <div className='divider' />

                        <FormItems
                            masterData={masterData}
                            setFieldValue={setFieldValue}
                            values={values}
                        />

                        <div className='divider' />

                        <Columns>
                            <Column>
                                <FormField
                                    label='Ongkos Kirim'
                                    placeholder='Input Ongkos Kirim'
                                    type='number'
                                    name='pickup_delivery_price'
                                />
                            </Column>
                            <Column>
                                <FormField
                                    label='Promo'
                                    placeholder='Select Promo'
                                    type='select-custom'
                                    objectValue={masterData.promo}
                                    name='promo_id'
                                    onSelectedOption={(value) => {
                                        handleSelectPromo(
                                            value,
                                            values,
                                            setFieldValue
                                        );
                                    }}
                                />
                            </Column>
                        </Columns>

                        <div className='divider' />

                        <FormPricing values={values} />
                    </Card>
                    <div className='buttons is-right my-5'>
                        <Button
                            className='is-medium'
                            onClick={() => history.goBack()}
                            type='reset'
                        >
                            Cancel
                        </Button>
                        <Button
                            className='is-link is-medium'
                            type='submit'
                            style={{ marginRight: 0 }}
                        >
                            Create
                        </Button>
                    </div>
                </form>
            )}
        </Formik>
    );
};

export default CreateOrderForm;
