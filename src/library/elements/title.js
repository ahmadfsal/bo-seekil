import classnames from 'classnames';

const Title = (props) => {
    const { className, children, isSubtitle } = props;
    const classes = classnames(isSubtitle ? 'subtitle' : 'title', className);

    return <div className={classes}>{children}</div>;
};

export default Title;
