import classnames from 'classnames';

const LevelRight = (props) => {
    const { children, className } = props;
    const classes = classnames('level-right', className);

    return <div className={classes}>{children}</div>;
};

export default LevelRight;
