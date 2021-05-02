import classnames from 'classnames';

const Textarea = (props) => {
    const {
        className,
        field,
        label,
        name,
        placeholder,
        validationClasses,
        rows,
        value,
        objectValue,
        isMandatory,
        ...attr
    } = props;
    const classes = classnames(
        'textarea is-fullwidth',
        validationClasses,
        className
    );
    const labelClasses = classnames('label', isMandatory && 'is-mandatory');

    return (
        <>
            {label && <label className={labelClasses}>{label}</label>}
            <textarea
                className={classes}
                name={name}
                rows={rows}
                placeholder={placeholder}
                value={value}
                {...field}
                {...attr}
            />
        </>
    );
};

export default Textarea;
