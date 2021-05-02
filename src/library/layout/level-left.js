import classnames from 'classnames';

const LevelLeft = (props) => {
    const { children, className } = props;
    const classes = classnames('level-left', className);

    return <div className={classes}>{children}</div>;
};

export default LevelLeft;
