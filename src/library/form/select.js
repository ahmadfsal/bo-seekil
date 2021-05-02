import classnames from 'classnames';

const Select = (props) => {
    const {
        label,
        className,
        name,
        placeholder,
        objectValue = [],
        defaultValue,
        value,
        validationClasses,
        isMandatory,
        ...attr
    } = props;
    const classes = classnames(
        'select is-fullwidth',
        validationClasses,
        className
    );
    const labelClasses = classnames('label', isMandatory && 'is-mandatory');

    return (
        <div className='field'>
            {label && <label className={labelClasses}>{label}</label>}
            <div className='control'>
                <div className={classes}>
                    <select name={name} value={value ? value : ''} {...attr}>
                        {placeholder && (
                            <option value='' disabled defaultValue>
                                {placeholder}
                            </option>
                        )}

                        {objectValue.map((item, index) => {
                            return (
                                <option key={index} value={item.value}>
                                    {item.text}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Select;
