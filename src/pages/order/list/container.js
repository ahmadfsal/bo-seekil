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
import ModalTracking from './views/modal-tracking';

const Order = () => {
    const [orderList, setOrderList] = useState([]);
    const [isShowModalLoading, setShowModalLoading] = useState(false);
    const [modalAttr, setModalTrackingAttr] = useState({
        isShow: false,
        order_id: null
    });

    useEffect(() => {
        fetchOrderList();
    }, []);

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

    const handleModalTracking = (orderId) => {
        setModalTrackingAttr((prevValue) => ({
            ...prevValue,
            isShow: !prevValue.isShow,
            order_id: orderId
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
            <Table data={orderList} handleModalTracking={handleModalTracking} />

            <ModalLoading isShow={isShowModalLoading} />

            <ModalTracking
                handleModalTracking={handleModalTracking}
                modalAttr={modalAttr}
            />
        </>
    );
};

export default Order;
