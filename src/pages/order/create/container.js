import { useState, useEffect } from 'react';
import { seekilApi } from '@service/api.services';
import { Level, LevelLeft } from '@layout';
import { Title } from '@elements';
import { useHistory } from 'react-router-dom';
import Form from './views/form';
import { countSubtotal } from '@utils';

const CreateOrder = () => {
    const history = useHistory();
    const [masterData, setMasterData] = useState({
        service: [],
        type: [],
        partnership: [],
        promo: [],
        customer: [],
        store: [],
        payment_method: []
    });

    useEffect(() => {
        initialFetchMasterData();
    }, []);

    const initialFetchMasterData = () => {
        fetchMasterServices();
        fetchMasterType();
        fetchMasterPartnership();
        fetchMasterPromo();
        fetchMasterStore();
        fetchMasterPaymentMethod();
        fetchCustomer();
    };

    const fetchCustomer = () => {
        seekilApi.get('customer').then((res) => {
            if (res.status === 200) {
                const arrCustomer = res?.data?.list?.map((item) => {
                    return {
                        value: item?.id,
                        label: item?.name,
                        whatsapp: item?.whatsapp,
                        address: item?.address
                    };
                });
                setMasterData((prevValue) => ({
                    ...prevValue,
                    customer: arrCustomer
                }));
            }
        });
    };

    const fetchMasterPromo = () => {
        seekilApi
            .get('master/promo')
            .then((res) => {
                if (res?.data) {
                    const arrPromo = res?.data?.list?.map((item) => {
                        return {
                            value: item?.id,
                            label: item?.code,
                            discount: item?.discount
                        };
                    });

                    setMasterData((prevValue) => ({
                        ...prevValue,
                        promo: arrPromo
                    }));
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterPaymentMethod = () => {
        seekilApi
            .get('master/payment-method')
            .then((res) => {
                if (res?.data) {
                    const arrPaymentMethod = res?.data?.list?.map((item) => {
                        return {
                            value: item?.id,
                            text: item?.name
                        };
                    });

                    setMasterData((prevValue) => ({
                        ...prevValue,
                        payment_method: arrPaymentMethod
                    }));
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterServices = () => {
        seekilApi
            .get('master/service')
            .then((res) => {
                if (res?.data) {
                    const arrServices = res?.data?.list?.map((item) => {
                        return {
                            label: item?.name,
                            value: item?.id,
                            price: item?.price
                        };
                    });
                    setMasterData((prevValue) => ({
                        ...prevValue,
                        service: arrServices
                    }));
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterType = () => {
        seekilApi
            .get('master/type')
            .then((res) => {
                const arrOrderType = res?.data?.list?.map((item) => {
                    return {
                        text: item?.name,
                        value: item?.id
                    };
                });
                setMasterData((prevValue) => ({
                    ...prevValue,
                    type: arrOrderType
                }));
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterPartnership = () => {
        seekilApi
            .get('master/partnership')
            .then((res) => {
                const arrPartnership = res?.data?.list?.reduce((acc, curr) => {
                    if (curr.drop_zone === 0) {
                        acc = [
                            {
                                text: curr?.name,
                                value: curr?.id
                            }
                        ];
                    }
                    return acc;
                }, []);

                setMasterData((prevValue) => ({
                    ...prevValue,
                    partnership: arrPartnership
                }));
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterStore = () => {
        seekilApi
            .get('master/store')
            .then((res) => {
                const arrStore = res?.data?.list?.map((item) => {
                    return {
                        text: item?.staging,
                        value: item?.id,
                        address: item?.address
                    };
                });

                setMasterData((prevValue) => ({
                    ...prevValue,
                    store: arrStore
                }));
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (values) => {
        seekilApi
            .post('order', generateFormValues(values))
            .then((res) => {
                if (res?.data) {
                    history.replace('/order');
                }
            })
            .catch((err) => console.log(err));
    };

    const generateFormValues = (formValues) => {
        return {
            customer_id: formValues?.customer_id ?? null,
            customer_name: formValues?.customer_name ?? null,
            whatsapp: formValues.whatsapp
                ? formValues.whatsapp.toString()
                : null,
            order_type_id: formValues.order_type_id
                ? parseInt(formValues.order_type_id)
                : null,
            store_id: formValues.store_id
                ? parseInt(formValues.store_id)
                : null,
            pickup_address: formValues.pickup_address
                ? formValues.pickup_address
                : null,
            partnership_id: formValues.partnership_id
                ? parseInt(formValues.partnership_id)
                : null,
            payment_method_id: formValues.payment_method_id
                ? parseInt(formValues.payment_method_id)
                : null,
            payment_status: formValues.payment_status
                ? parseInt(formValues.payment_status)
                : null,
            promo_id: formValues.promo_id
                ? parseInt(formValues.promo_id)
                : null,
            pickup_delivery_price: formValues.pickup_delivery_price
                ? parseInt(formValues.pickup_delivery_price)
                : null,
            potongan: formValues.potongan
                ? parseInt(formValues.potongan)
                : null,
            order_status_id: 1,
            qty: formValues?.items?.length ?? null,
            total: countSubtotal(formValues).total,
            items: generateItemsValues(formValues?.items) ?? null
        };
    };

    const generateItemsValues = (items) => {
        return items?.map((item) => {
            return {
                item_name: item.item_name ? item.item_name : null,
                services_id: item.services_id ? item.services_id : null,
                subtotal: item.subtotal ? item.subtotal : null,
                note: item.note ? item.note : null
            };
        });
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Create Order</Title>
                </LevelLeft>
            </Level>

            <Form handleSubmit={handleSubmit} masterData={masterData} />
        </>
    );
};

export default CreateOrder;
