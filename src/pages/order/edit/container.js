import { useState, useEffect } from 'react';
import { seekilApi } from '@service/api.services';
import { Level, LevelLeft } from '@layout';
import { Title, Notification } from '@elements';
import { Modal } from '@components';
import { useHistory, useParams } from 'react-router-dom';
import Form from './views/form';

const CreateOrder = () => {
    const params = useParams();
    const history = useHistory();
    const [itemsData, setItemsData] = useState([]);
    const [orderDetailData, setOrderDetailData] = useState({});
    const [objectValueServices, setObjectValueServices] = useState([]);
    const [objectValueOrderType, setObjectValueOrderType] = useState([]);
    const [objectValuePartnership, setObjectValueParnership] = useState([]);
    const [objectValueMasterStatus, setObjectValueMasterStatus] = useState([]);
    const [isShowModalGenerateInvoice, setShowModalGenerateInvoice] = useState(
        false
    );

    useEffect(() => {
        fetchOrderDetail();
        fetchItemsByOrderId();
        initialMasterData();
    }, []);

    const initialMasterData = () => {
        fetchServices();
        fetchMasterType();
        fetchPartnership();
        fetchMasterStatus();
    };

    const fetchItemsByOrderId = () => {
        seekilApi
            .get(`order/item/${params.id}`)
            .then(async (res) => {
                if (res.status === 200) {
                    await res?.data?.list?.map((item) => {
                        fetchServicesByItemId(item);
                    });

                    setTimeout(() => {
                        setItemsData(res?.data?.list);
                    }, 1000);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchServicesByItemId = (item) => {
        if (item.item_id) {
            seekilApi
                .get(`order/item/${item.item_id}/services`)
                .then(async (res) => {
                    if (res.status === 200) {
                        const arrServices = await res?.data?.list?.map(
                            (item) => {
                                return {
                                    value: item?.master_service?.id,
                                    label: item?.master_service?.name,
                                    price: item?.master_service?.price,
                                };
                            }
                        );

                        item.services_id = arrServices;
                    }
                })
                .catch((err) => console.log(err));
        }
    };

    const fetchOrderDetail = () => {
        seekilApi
            .get(`order/${params.id}`)
            .then((res) => {
                if (res.status === 200) {
                    setOrderDetailData(res.data.data);
                }
            })
            .catch((err) => console.log(err));
    };

    const fetchServices = () => {
        seekilApi
            .get('master/service')
            .then((res) => {
                if (res?.data) {
                    const arrServices = res?.data?.list?.map((item) => {
                        return {
                            value: item?.id,
                            label: item?.name,
                            price: item?.price
                        };
                    });
                    setObjectValueServices(arrServices);
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
                setObjectValueOrderType(arrOrderType);
            })
            .catch((err) => console.log(err));
    };

    const fetchMasterStatus = () => {
        seekilApi
            .get('master/status')
            .then((res) => {
                const arrMasterStatus = res?.data?.list?.map((item) => {
                    return {
                        text: item?.name,
                        value: item?.id
                    };
                });
                setObjectValueMasterStatus(arrMasterStatus);
            })
            .catch((err) => console.log(err));
    };

    const fetchPartnership = () => {
        seekilApi
            .get('master/partnership')
            .then((res) => {
                const arrPartnership = res?.data?.map((item) => {
                    return {
                        text: item?.name,
                        value: item?.id
                    };
                });
                setObjectValueParnership(arrPartnership);
            })
            .catch((err) => console.log(err));
    };

    const handleSubmit = (values) => {
        seekilApi
            .put(`order/${params.id}`, generateFormValues(values))
            .then((res) => {
                if (res?.data) {
                    // alert('Successfully update order');
                    history.replace('/order');
                    // setShowModalGenerateInvoice(true);
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
            order_status_id: formValues.order_status_id
                ? parseInt(formValues.order_status_id)
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
                id: item.id ? item.id : null,
                order_id: item.order_id ? item.order_id : null,
                item_id: item.item_id ? item.item_id : null,
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
                    <Title>Edit Order</Title>
                </LevelLeft>
            </Level>
            <Form
                handleSubmit={handleSubmit}
                itemsData={itemsData}
                objectValueMasterStatus={objectValueMasterStatus}
                objectValueOrderType={objectValueOrderType}
                objectValuePartnership={objectValuePartnership}
                objectValueServices={objectValueServices}
                orderDetailData={orderDetailData}
            />
            {/* <Modal
                isShow={isShowModalGenerateInvoice}
                title='Generate Invoice'
                onClickNegativeBtn={() => history.replace('/order')}
                onClickPositiveBtn={() => {}}
            >
                Do you want to <strong>generate invoice</strong> for this order?
            </Modal> */}

            {/* <Notification isShow={isShowModalGenerateInvoice}>
                --- Invoice Here ---
            </Notification> */}
        </>
    );
};

export default CreateOrder;
