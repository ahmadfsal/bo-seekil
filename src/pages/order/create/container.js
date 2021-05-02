import { useState, useEffect } from 'react';
import { seekilApi } from '@service/api.services';
import { Level, LevelLeft } from '@layout';
import { Title, Notification } from '@elements';
import { Modal } from '@components';
import { useHistory } from 'react-router-dom';
import Form from './views/form';

const CreateOrder = () => {
    const history = useHistory();
    const [isShowModalGenerateInvoice, setShowModalGenerateInvoice] = useState(
        false
    );
    const [masterData, setMasterData] = useState({
        service: [],
        type: [],
        partnership: [],
        promo: [],
        customer: []
    });

    useEffect(() => {
        initialFetchMasterData();
    }, []);

    const initialFetchMasterData = () => {
        fetchMasterServices();
        fetchMasterType();
        fetchMasterPartnership();
        fetchMasterPromo();
        fetchCustomer();
    };

    const fetchCustomer = () => {
        seekilApi
            .get('customer')
            .then(res => {
                if (res.status === 200) {
                    const arrCustomer = res?.data?.list?.map(item => {
                        return {
                            value: item?.id,
                            label: item?.name,
                            whatsapp: item?.whatsapp,
                            address: item?.address
                        }
                    })
                    setMasterData(prevValue => ({
                        ...prevValue,
                        customer: arrCustomer
                    }))
                }
            })
    }

    const fetchMasterPromo = () => {
        seekilApi
            .get('master/promo')
            .then((res) => {
                if (res?.data) {
                    const arrPromo = res?.data?.list?.map(item => {
                        return {
                            value: item?.id,
                            label: item?.code,
                            discount: item?.discount
                        }
                    });

                    setMasterData((prevValue) => ({
                        ...prevValue,
                        promo: arrPromo
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
                const arrPartnership = res?.data?.map((item) => {
                    return {
                        text: item?.name,
                        value: item?.id
                    };
                });
                setMasterData((prevValue) => ({
                    ...prevValue,
                    partnership: arrPartnership
                }));
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (values) => {
        seekilApi
            .post('order', generateFormValues(values))
            .then((res) => {
                if (res?.data) {
                    setShowModalGenerateInvoice(true);
                }
            })
            .catch((err) => console.log(err));
    };

    const generateFormValues = (formValues) => {
        return {
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
            promo_id: formValues.promo_id
                ? parseInt(formValues.promo_id)
                : null,
            pickup_deliver_price: formValues.pickup_deliver_price
                ? parseInt(formValues.pickup_deliver_price)
                : null,
            potongan: formValues.potongan
                ? parseInt(formValues.potongan)
                : null,
            order_status_id: 1,
            qty: formValues?.items?.length ?? null,
            total: formValues?.items?.reduce((acc, curr) => {
                return acc + parseInt(curr.subtotal);
            }, 0),
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
            <Modal
                isShow={isShowModalGenerateInvoice}
                title='Generate Invoice'
                onClickNegativeBtn={() => history.replace('/order')}
                onClickPositiveBtn={() => {}}
            >
                Do you want to <strong>generate invoice</strong> for this order?
            </Modal>

            {/* <Notification isShow={isShowModalGenerateInvoice}>
                --- Invoice Here ---
            </Notification> */}
        </>
    );
};

export default CreateOrder;
