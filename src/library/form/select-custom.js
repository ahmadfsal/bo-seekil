import classnames from 'classnames';
import CreatableSelect from 'react-select/creatable';

const SelectCustom = (props) => {
    const {
        label,
        className,
        name,
        placeholder,
        objectValue = [],
        defaultValue,
        disabled = false,
        onSelectedOption,
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

    const onChange = (selectedOptions) => {
        if (onSelectedOption) onSelectedOption(selectedOptions);
    };

    return (
        <div className='field'>
            {label && <label className={labelClasses}>{label}</label>}
            <div className='control'>
                <CreatableSelect
                    className='basic-single'
                    classNamePrefix='select'
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    isDisabled={disabled}
                    name={name}
                    options={objectValue}
                />
            </div>
        </div>
    );
};

export default SelectCustom