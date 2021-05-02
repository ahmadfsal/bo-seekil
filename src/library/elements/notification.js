import classnames from 'classnames';
import Button from './button';

const Notification = (props) => {
    const { children, className, isShow = false } = props;
    const classes = classnames('notification is-light is-warning', className);

    return (
        isShow && (
            <div className='notification-wrapper'>
                <div className={classes}>
                    <Button className='delete'></Button>
                    {children}
                </div>
            </div>
        )
    );
};

export default Notification;
