import classnames from 'classnames';

const Breadcrumb = (props) => {
    const { children, className } = props;
    const classes = classnames('breadcrumb', className);

    return (
        <nav className={classes} aria-label='breadcrumbs'>
            <ul>{children}</ul>
        </nav>
    );
};

export default Breadcrumb;
