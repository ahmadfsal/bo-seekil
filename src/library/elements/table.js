import classnames from 'classnames';

const Table = (props) => {
    const { children, className, ...attr } = props;
    const classes = classnames('table is-fullwidth', className);

    return (
        <div className='table-wrapper'>
            <table className={classes} {...attr}>
                {children}
            </table>
        </div>
    );
};

export default Table;
