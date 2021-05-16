import classnames from 'classnames';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

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
        isCreatable = false,
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

    const ElementSelect = isCreatable ? CreatableSelect : Select;

    return (
        <div className='field'>
            {label && <label className={labelClasses}>{label}</label>}
            <div className='control'>
                <ElementSelect
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

export default SelectCustom;
