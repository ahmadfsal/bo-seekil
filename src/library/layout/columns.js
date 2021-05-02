import classnames from 'classnames';

const Columns = (props) => {
    const { children, className } = props;
    const classes = classnames('columns', className);

    return <div className={classes}>{children}</div>;
};

export default Columns;
