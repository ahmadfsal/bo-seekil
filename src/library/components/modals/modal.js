import { useEffect } from 'react';
import classnames from 'classnames';
import { Button } from '@elements';

const Modal = (props) => {
    const {
        children,
        className,
        isShow,
        title,
        positiveBtnText = 'Yes',
        negativeBtnText = 'Cancel',
        positiveBtnType = 'button',
        onClickPositiveBtn,
        onClickNegativeBtn
    } = props;
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
            <div className='modal-card'>
                <header className='modal-card-head'>
                    <p className='modal-card-title'>{title}</p>
                    <Button
                        className='delete'
                        aria-label='close'
                        onClick={onClickNegativeBtn}
                    ></Button>
                </header>
                <section className='modal-card-body'>{children}</section>
                <footer className='modal-card-foot buttons is-right is-marginless'>
                    <Button
                        className='is-link'
                        onClick={onClickPositiveBtn}
                        type={positiveBtnType}
                    >
                        {positiveBtnText}
                    </Button>
                    <Button onClick={onClickNegativeBtn}>
                        {negativeBtnText}
                    </Button>
                </footer>
            </div>
        </div>
    );
};

export default Modal;
