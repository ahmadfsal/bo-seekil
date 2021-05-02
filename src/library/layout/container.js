import classnames from 'classnames';

const Container = (props) => {
    const { children, className } = props;
    const classes = classnames('container', className);

    return <div className={classes}>{children}</div>;
};

export default Container;
