import classnames from 'classnames';

const Column = (props) => {
    const { children, className } = props;
    const classes = classnames('column', className);

    return <div className={classes}>{children}</div>;
};

export default Column;
