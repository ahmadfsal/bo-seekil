import React from 'react';
import { FormFieldArray } from '@form';

const FormItemsServices = (props) => {
    const { BASENAME, objectValue, setFieldValue, values } = props;

    const getSubtotal = (selectedOptions) => {
        const selectedServices = [];
        const subtotal = selectedOptions.reduce((acc, curr) => {
            selectedServices.push(curr.value);
            return acc + curr.price;
        }, 0);

        let disc = (subtotal * values['discount']) / 100;

        if (!isNaN(disc)) {
            disc = disc
        } else {
            disc = 0
        }

        setFieldValue('potongan', disc)
        setFieldValue(`${BASENAME}.services_id`, selectedServices);
        setFieldValue(`${BASENAME}.subtotal`, parseInt(subtotal));
    };

    return (
        <FormFieldArray
            name={`${BASENAME}.services_id`}
            label='Service'
            type='select-multiple'
            placeholder='Select Service'
            objectValue={objectValue}
            onSelectedOption={(selectedOptions) => getSubtotal(selectedOptions)}
            isMandatory
        />
    );
};

export default FormItemsServices;
