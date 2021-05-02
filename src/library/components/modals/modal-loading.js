import { useEffect } from 'react';
import classnames from 'classnames';

const ModalLoading = (props) => {
    const { className, isShow } = props;
    const classes = classnames('modal', isShow ? 'is-active' : '', className);

    useEffect(() => {
        if (isShow) {
            document
                .getElementsByTagName('html')[0]
                .classList.add('is-clipped');
        } else {
            document
                .getElementsByTagName('html')[0]
                .classList.remove('is-clipped');
        }
    }, [isShow]);

    return (
        <div className={classes}>
            <div className='modal-background'></div>
            <div className='modal-loading-wrapper'>
                <div className='modal-loading'></div>
            </div>
        </div>
    );
};

export default ModalLoading;
