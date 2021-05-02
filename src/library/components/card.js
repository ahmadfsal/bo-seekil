import classnames from 'classnames';

const Card = (props) => {
    const { children, className, title } = props;
    const classes = classnames('card', className);

    return (
        <div className={classes}>
            {title && (
                <div className='card-header'>
                    <p className='card-header-title'>{title}</p>
                </div>
            )}
            <div className='card-content'>{children}</div>
        </div>
    );
};

export default Card;
