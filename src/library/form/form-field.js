import { Field } from 'formik';
import { Input, Select, Textarea, SelectMultiple, SelectCustom } from '@form';
import classnames from 'classnames';

const FormField = (props) => {
    const {
        disabled,
        name,
        type = 'text',
        className,
        label,
        placeholder,
        value,
        objectValue,
        isMandatory = false,
        ...attr
    } = props;
    const classes = classnames('field', className);
    let ElementInput;

    const getElemenInput = () => {
        switch (type) {
            case 'text':
            case 'number':
            case 'tel':
            case 'hidden':
            case 'password':
            default:
                return Input;
            case 'select':
                return Select;
            case 'select-custom':
                return SelectCustom;
            case 'textarea':
                return Textarea;
            case 'select-multiple':
                return SelectMultiple;
        }
    };

    ElementInput = getElemenInput();

    return (
        <Field name={name}>
            {(fieldProps) => {
                const { field, form } = fieldProps;

                const validationClasses =
                    form.errors[field.name] && form.touched[field.name]
                        ? 'is-danger'
                        : '';

                return (
                    <div className={classes}>
                        <ElementInput
                            label={label}
                            type={type}
                            validationClasses={validationClasses}
                            name={name}
                            disabled={disabled}
                            value={value}
                            placeholder={placeholder}
                            objectValue={objectValue}
                            isMandatory={isMandatory}
                            {...field}
                            {...attr}
                        />
                        {form.errors[field.name] &&
                            form.touched[field.name] && (
                                <p className='help is-danger'>
                                    {form.errors[field.name]}
                                </p>
                            )}
                    </div>
                );
            }}
        </Field>
    );
};

export default FormField;
