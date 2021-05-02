import classnames from 'classnames';

const Level = (props) => {
    const { children, className } = props;
    const classes = classnames('level', className);

    return <div className={classes}>{children}</div>;
};

export default Level;
