import * as Yup from 'yup';
import VALIDATION_MESSAGE from '@constants/validation-message';

export const blankItemObject = {
    item_name: '',
    services_id: [],
    subtotal: 0,
    note: ''
};

export const createOrderInitialValues = {
    customer_name: '',
    whatsapp: '',
    order_type_id: '',
    store_id: '',
    pickup_address: '',
    partnership_id: '',
    order_status_id: '',
    promo_id: '',
    pickup_delivery_price: 0,
    potongan: 0,
    qty: '',
    total: '',
    items: [blankItemObject]
};

export const updateOrderInitialValues = (data, arrItems) => {
    return {
        customer_id: data?.customer_id ?? '',
        customer_name: data?.customer_name ?? '',
        whatsapp: data?.whatsapp ?? '',
        order_type_id: data?.order_type_id ?? '',
        store_id: data?.store_id ?? '',
        pickup_address: data?.pickup_address ?? '',
        partnership_id: data?.pickup_address ?? '',
        order_status_id: data?.order_status_id ?? '',
        promo_id: data?.promo_id ?? '',
        promo_code: data?.master_promo?.code,
        pickup_delivery_price: data.pickup_delivery_price
            ? data.pickup_delivery_price
            : 0,
        potongan: data.potongan ? data.potongan : 0,
        discount: 0,
        qty: data?.qty ?? '',
        total: data?.total ?? '',
        items: generateItems(arrItems)
    };
};

const generateItems = (items) => {
    return items?.map((item) => {
        return {
            id: item?.id ?? '',
            order_id: item?.order_id ?? '',
            item_id: item?.item_id ?? '',
            item_name: item?.item_name ?? '',
            services_id: item.services_id ? item.services_id : [],
            subtotal: item?.subtotal ?? '',
            note: item?.note ?? ''
        };
    });
};

export const createOrderValidationSchema = Yup.object({
    customer_name: Yup.string().required(
        `Customer Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
    ),
    whatsapp: Yup.string().required(
        `Whatsapp ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
    ),
    order_type_id: Yup.string().required(
        `Order Type ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
    ),
    store_id: Yup.string().when('order_type_id', {
        is: '1',
        then: Yup.string().required(
            `Store Location ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
        ),
        otherwise: Yup.string()
    }),
    pickup_address: Yup.string().when('order_type_id', {
        is: '2',
        then: Yup.string().required(
            `Pickup Address ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
        ),
        otherwise: Yup.string()
    }),
    partnership_id: Yup.string().when('order_type_id', {
        is: '3',
        then: Yup.string().required(
            `Drop Off Location ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
        ),
        otherwise: Yup.string()
    }),
    items: Yup.array().of(
        Yup.object({
            item_name: Yup.string().required(
                `Item Name ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
            ),
            services_id: Yup.array().required(
                `Service ${VALIDATION_MESSAGE.REQUIRED_FIELD}`
            ),
            note: Yup.string().max(255, `Note ${VALIDATION_MESSAGE.MAX_LENGTH}`)
        })
    )
});
