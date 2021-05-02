import classnames from 'classnames';

const Section = (props) => {
    const { children, className } = props;
    const classes = classnames('section', className);

    return <div className={classes}>{children}</div>;
};

export default Section;
