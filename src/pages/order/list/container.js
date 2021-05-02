import { useEffect, useState } from 'react';
import { Level, LevelLeft, LevelRight } from '@layout';
import { Button, Title } from '@elements';
import { ModalLoading } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { seekilApi } from '@service/api.services';
import { Link } from 'react-router-dom';

import Table from './views/table';
import Filter from './views/filter';
import ModalItems from './views/modal-items';

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const [orderStatusData, setOrderStatusData] = useState([]);
    const [orderTypeData, setOrderTypeData] = useState([]);
    const [isShowModalLoading, setShowModalLoading] = useState(false);
    const [modalAttr, setModalItemsAttr] = useState({
        isShow: false,
        list: []
    });

    useEffect(() => {
        fetchOrderList();
        fetchOrderStatus();
        fetchOrderType();
    }, []);

    const fetchOrderType = () => {
        try {
            setShowModalLoading(true);
            seekilApi
                .get('master/type')
                .then((res) => {
                    if (res.status === 200) {
                        const arrOrderType = res?.data?.list?.map((item) => {
                            return {
                                text: item?.name,
                                value: item?.id
                            };
                        });
                        setOrderTypeData(arrOrderType);
                    } else {
                        setOrderTypeData([]);
                    }
                })
                .catch((err) => {
                    throw err;
                });
        } catch (error) {
        } finally {
            setShowModalLoading(false);
        }
    };

    const fetchOrderStatus = () => {
        try {
            setShowModalLoading(true);
            seekilApi
                .get('master/status')
                .then((res) => {
                    if (res.status === 200) {
                        const arrOrderStatus = res?.data?.list?.map((item) => {
                            return {
                                text: item?.name,
                                value: item?.id
                            };
                        });
                        setOrderStatusData(arrOrderStatus);
                    } else {
                        setOrderStatusData([]);
                    }
                })
                .catch((err) => {
                    throw err;
                });
        } catch (error) {
        } finally {
            setShowModalLoading(false);
        }
    };

    const fetchOrderList = () => {
        try {
            setShowModalLoading(true);
            seekilApi
                .get('order')
                .then((res) => {
                    if (res.status === 200) {
                        setOrderList(res.data);
                    } else {
                        setOrderList([]);
                    }
                })
                .catch((err) => {
                    throw err;
                });
        } catch (error) {
        } finally {
            setShowModalLoading(false);
        }
    };

    const handleFetchItems = (orderId) => {
        seekilApi
            .get(`order/item/${orderId}`)
            .then((res) => {
                if (res?.data) {
                    setModalItemsAttr((prevValue) => ({
                        ...prevValue,
                        isShow: true,
                        list: res?.data?.list
                    }));
                }
            })
            .catch((err) => console.log(err));
    };

    const handleModalItems = () => {
        setModalItemsAttr((prevValue) => ({
            ...prevValue,
            isShow: !prevValue.isShow
        }));
    };

    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Order</Title>
                </LevelLeft>
                <LevelRight>
                    <Link to='/order/create'>
                        <Button className='is-primary'>
                            <FontAwesomeIcon icon={faPlus} />
                            &nbsp;Create Order
                        </Button>
                    </Link>
                </LevelRight>
            </Level>
            {/* <Filter
                orderStatusData={orderStatusData}
                orderTypeData={orderTypeData}
            /> */}
            <Table data={orderList} handleFetchItems={handleFetchItems} />
            <ModalLoading isShow={isShowModalLoading} />
            <ModalItems
                handleModalItems={handleModalItems}
                modalAttr={modalAttr}
            />
        </>
    );
};

export default Order;
