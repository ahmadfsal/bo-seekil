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

// Promo
export const promoInitialValues = (data) => {
    return {
        name: data?.name ?? '',
        code: data?.code ?? '',
        discount: data?.discount ?? '',
        description: data?.description ?? '',
        start_date: data?.start_date ?? '',
        end_date: data?.end_date ?? '',
        status: data?.status ?? ''
    };
};

export const promoValidationSchema = yup.object({
    name: yup
        .string()
        .required(`Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(100, `Name ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    code: yup
        .string()
        .required(`Code ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(10, `Code ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    discount: yup
        .string()
        .required(`Discount ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    description: yup
        .string()
        .required(`Description ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    start_date: yup
        .string()
        .required(`Start Date ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    end_date: yup
        .string()
        .required(`End Date ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    status: yup
        .string()
        .required(`Status ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
});

// partnership
export const partnershipInitialValues = (data) => {
    return {
        name: data?.name ?? '',
        whatsapp: data?.whatsapp ?? '',
        address: data?.address ?? '',
        potongan: data?.potongan ?? '',
        drop_zone: data?.drop_zone ?? 1,
        start_date: data?.start_date ?? '',
        end_date: data?.end_date ?? ''
    };
};

export const partnershipValidationSchema = yup.object({
    name: yup
        .string()
        .required(`Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(255, `Name ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    whatsapp: yup
        .string()
        .required(`Whatsapp ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    address: yup
        .string()
        .required(`Address ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
        .max(255, `Address ${VALIDATION_MESSAGE.MAX_LENGTH}`),
    potongan: yup
        .string()
        .required(`Potongan ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    drop_zone: yup
        .string()
        .required(`Drop Zone ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    start_date: yup
        .string()
        .required(`Start Date ${VALIDATION_MESSAGE.REQUIRED_FIELD}`),
    end_date: yup
        .string()
        .required(`End Date ${VALIDATION_MESSAGE.REQUIRED_FIELD}`)
});
