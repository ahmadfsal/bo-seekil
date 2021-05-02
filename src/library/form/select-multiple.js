import React from 'react';
import classnames from 'classnames';
import Select, { components } from 'react-select';
import {
    SortableContainer,
    SortableElement,
    sortableHandle
} from 'react-sortable-hoc';

const SelectMultiple = (props) => {
    const {
        label,
        className,
        name,
        placeholder,
        objectValue = [],
        defaultValue,
        onSelectedOption,
        disabled = false,
        value,
        validationClasses,
        isMandatory,
        ...attr
    } = props;
    
    const [selected, setSelected] = React.useState(
        typeof defaultValue !== undefined ? defaultValue : []
    );

    const arrayMove = (array, from, to) => {
        array = array.slice();
        array.splice(
            to < 0 ? array.length + to : to,
            0,
            array.splice(from, 1)[0]
        );
        return array;
    };

    const SortableMultiValue = SortableElement((props) => {
        const onMouseDown = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };
        const innerProps = { ...props.innerProps, onMouseDown };
        return <components.MultiValue {...props} innerProps={innerProps} />;
    });

    const SortableMultiValueLabel = sortableHandle((props) => (
        <components.MultiValueLabel {...props} />
    ));

    const SortableSelect = SortableContainer(Select);

    const onChange = (selectedOptions) => {
        setSelected(selectedOptions);

        if (onSelectedOption) onSelectedOption(selectedOptions);
    };

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newValue = arrayMove(selected, oldIndex, newIndex);
        setSelected(newValue);
    };

    const labelClasses = classnames('label', isMandatory && 'is-mandatory');

    return (
        <div className='field'>
            {label && <label className={labelClasses}>{label}</label>}
            <SortableSelect
                className
                useDragHandle
                axis='xy'
                placeholder={placeholder}
                isDisabled={disabled}
                onSortEnd={onSortEnd}
                distance={4}
                getHelperDimensions={({ node }) => node.getBoundingClientRect()}
                isMulti
                options={objectValue}
                value={selected}
                onChange={onChange}
                closeMenuOnSelect={false}
                components={{
                    MultiValue: SortableMultiValue,
                    MultiValueLabel: SortableMultiValueLabel
                }}
            />
        </div>
    );
};

export default SelectMultiple;
