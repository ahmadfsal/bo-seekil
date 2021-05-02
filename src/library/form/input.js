import { useRef } from 'react';
import classnames from 'classnames';

const Input = (props) => {
    const inputRef = useRef(null);
    const {
        className,
        label,
        name,
        field,
        placeholder,
        validationClasses,
        type,
        value,
        objectValue,
        isMandatory,
        ...attr
    } = props;

    const inputClasses = classnames('input', className);
    const labelClasses = classnames('label', isMandatory && 'is-mandatory');

    return (
        <>
            {label && <label className={labelClasses}>{label}</label>}
            <div className='control'>
                <input
                    className={`${inputClasses} ${validationClasses}`}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value || ''}
                    ref={inputRef}
                    {...field}
                    {...attr}
                />
            </div>
        </>
    );
};

export default Input;
