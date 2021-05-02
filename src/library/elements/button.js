import classnames from 'classnames';

const Button = (props) => {
    const { children, className, type = 'button', ...attr } = props;
    const classes = classnames('button', className);

    return (
        <button className={classes} type={type} {...attr}>
            {children}
        </button>
    );
};

export default Button;
