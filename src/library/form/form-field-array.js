import { useRef, Fragment } from 'react';
import { Input, Select, Textarea, SelectMultiple } from '@form';
import { Field, getIn } from 'formik';
import { Dropdown } from '@components';
import classnames from 'classnames';

const FormFieldArray = (props) => {
    const {
        name,
        type = 'text',
        className,
        elementClassName,
        objectValue = [],
        defaultValue,
        label,
        disabled = false,
        isMandatory = false,
        ...attr
    } = props;

    const classes = classnames(className, 'field');
    const ref = useRef(name);

    let ElementInput;

    const getElemenInput = () => {
        switch (type) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'number':
            default:
                return Input;
            case 'select':
                return Select;
            case 'textarea':
                return Textarea;
            case 'dropdown':
                return Dropdown;
            case 'select-multiple':
                return SelectMultiple;
        }
    };

    ElementInput = getElemenInput();

    return (
        <Field
            name={name}
            render={(fieldProps) => {
                const { field, form } = fieldProps;
                const error = getIn(form.errors, name);
                const touch = getIn(form.touched, name);

                const validationClasses = classnames(
                    touch && error ? 'is-danger' : '',
                    elementClassName
                );

                return (
                    <div className={classes} ref={ref}>
                        <Fragment>
                            <ElementInput
                                label={label}
                                type={type}
                                validationClasses={validationClasses}
                                objectValue={objectValue}
                                defaultValue={defaultValue}
                                disabled={disabled}
                                isMandatory={isMandatory}
                                name={name}
                                {...field}
                                {...attr}
                            />
                            {touch && error ? (
                                <p className='help is-danger'>{error}</p>
                            ) : null}
                        </Fragment>
                    </div>
                );
            }}
        />
    );
};

export default FormFieldArray;
