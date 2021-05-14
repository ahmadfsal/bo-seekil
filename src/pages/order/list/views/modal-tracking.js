import { Modal } from '@components';
import { useEffect, useState } from 'react';
import { seekilApi } from '@service/api.services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import moment from 'moment';
import {
    faCheck,
    faClock,
    faReceipt,
    faShippingFast,
    faRunning,
    faTimes,
    faTruckPickup
} from '@fortawesome/free-solid-svg-icons';
import { ORDER_STATUS } from '@constants/master-data.constant';

const ModalTracking = (props) => {
    const [trackingData, setTrackingData] = useState([]);
    const { handleModalTracking, modalAttr } = props;

    useEffect(() => {
        if (modalAttr.isShow) {
            seekilApi
                .get(`order/${modalAttr.order_id}/tracker`)
                .then((res) => {
                    if (res.status === 200) {
                        setTrackingData(res.data.data);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [modalAttr.isShow]);

    const getIcon = (orderStatusId) => {
        let icon = null;

        switch (orderStatusId) {
            case ORDER_STATUS.NEW:
                icon = faReceipt;
                break;
            case ORDER_STATUS.WAITING_LIST:
                icon = faClock;
                break;
            case ORDER_STATUS.IN_PROGRESS:
                icon = faRunning;
                break;
            case ORDER_STATUS.READY_TO_PICKUP:
                icon = faTruckPickup;
                break;
            case ORDER_STATUS.READY_TO_SHIPMENT:
                icon = faShippingFast;
                break;
            case ORDER_STATUS.DONE:
                icon = faCheck;
                break;
            case ORDER_STATUS.CANCEL:
                icon = faTimes;
                break;
            case ORDER_STATUS.ON_PROGRESS_SHIPPED:
                icon = faTruckPickup;
                break;
            default:
                break;
        }

        return icon;
    };

    return (
        <Modal
            isShow={modalAttr.isShow}
            title='Tracking Details'
            onClickNegativeBtn={handleModalTracking}
        >
            <ul className='steps is-vertical'>
                {trackingData.map((item, index) => {
                    const markerClasses = classnames(
                        'steps-marker',
                        item?.order_status_id === ORDER_STATUS.CANCEL
                            ? 'is-danger'
                            : ''
                    );

                    return (
                        <li className='steps-segment' key={index}>
                            <span className={markerClasses}>
                                <FontAwesomeIcon
                                    icon={getIcon(item?.order_status_id)}
                                />
                            </span>
                            <div className='steps-content'>
                                <p className='is-size-6'>
                                    {moment(item?.updatedAt).format(
                                        'dddd, DD MMMM YYYY'
                                    )}
                                </p>
                                <p className='is-size-7'>
                                    {`${moment(item?.updatedAt).format(
                                        'HH:mm:ss'
                                    )} WIB`}
                                </p>
                                <p className='is-size-6 has-text-weight-bold'>
                                    {item?.master_status?.description}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </Modal>
    );
};

export default ModalTracking;
