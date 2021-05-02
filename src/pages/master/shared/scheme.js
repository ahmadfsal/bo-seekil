import * as yup from 'yup';
import VALIDATION_MESSAGE from '@constants/validation-message';

// Order
export const createOrderTypeStatusInitialValues = (data) => {
    return {
        name: data?.name ?? '',
        description: data?.description ?? ''
    };
};

export const createOrderTypeStatusValidationSchema = yup.object({
    name: yup
        .string()
        .required(`Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(20, `Name ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    description: yup
        .string()
        .required(`Description ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(255, `Description ${VALIDATION_MESSAGE.MAX_LENGTH}`)
});

// Service
export const createServiceInitialValues = (data) => {
    return {
        name: data?.name ?? '',
        estimate: data?.estimate ?? '',
        price: data?.price ?? '',
        description: data?.description ?? ''
    };
};

export const createServiceValidationSchema = yup.object({
    name: yup
        .string()
        .required(`Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(100, `Name ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    estimate: yup
        .string()
        .required(`Estimate ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(15, `Estimate ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    price: yup.string().required(`Price ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    description: yup
        .string()
        .required(`Description ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(255, `Description ${VALIDATION_MESSAGE.MAX_LENGTH}`)
});

// Topping
export const toppingInitialValues = (data) => {
    return {
        name: data?.name ?? '',
        price: data?.price ?? '',
        description: data?.description ?? ''
    };
};

export const toppingValidationSchema = yup.object({
    name: yup
        .string()
        .required(`Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(100, `Name ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    price: yup.string().required(`Price ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    description: yup
        .string()
        .required(`Description ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(255, `Description ${VALIDATION_MESSAGE.MAX_LENGTH}`)
});