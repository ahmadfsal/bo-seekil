import React from 'react';
import { seekilApi } from '@service/api.services';
import { FormFieldArray } from '@form';

const FormItemsServices = (props) => {
    const { BASENAME, item, objectValue, setFieldValue } = props;

    const getSubtotal = (selectedOptions) => {
        const selectedServices = [];
        const arrServices = selectedOptions.reduce(async(acc, curr) => {
            const arr = await seekilApi
                .get(`order/item/services/${curr.value}`)
                .then(res => {
                    const { data } = res.data
                    if (data) {
                        return {
                            id: data.id,
                            item_id: data.item_id,
                            service_id: data.service_id
                        }
                    } else {
                        return {
                            id: null,
                            item_id: null,
                            service_id: curr.value
                        }
                    }
                })
                .catch(err => err)

            selectedServices.push(arr)
        }, []);

        const subtotal = selectedOptions.reduce((acc, curr) => {
            return acc + curr.price;
        }, 0);

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
            defaultValue={item.services_id}
            onSelectedOption={(selectedOptions) => getSubtotal(selectedOptions)}
            isMandatory
            disabled
        />
    );
};

export default FormItemsServices;
