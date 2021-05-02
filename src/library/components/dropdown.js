import { useState, useEffect, Fragment } from 'react';
import { Button } from '@elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';

const Dropdown = (props) => {
    const {
        className,
        objectValue,
        label,
        placeholder = 'Select',
        isMandatory = false,
        onSelectedOption
    } = props;

    const [isActive, setIsActive] = useState(false);
    const [valueDropdown, setValueDropdown] = useState({});
    const [optionData, setOptionData] = useState([]);

    useEffect(() => {
        setOptionData(objectValue);
    }, [objectValue]);

    const classes = classnames(
        'dropdown is-fullwidth',
        isActive ? 'is-active' : '',
        className
    );
    const labelClasses = classnames('label', isMandatory && 'is-mandatory');

    const handleActivatedDropwdown = () => setIsActive(!isActive);

    const handleSelectedOption = (obj) => {
        setValueDropdown(obj);
        handleActivatedDropwdown();

        if (onSelectedOption) {
            onSelectedOption(obj);
        }
    };

    return (
        <Fragment>
            {label && <label className={labelClasses}>{label}</label>}
            <div className={classes}>
                <div className='dropdown-trigger'>
                    <Button
                        className='is-fullwidth'
                        aria-haspopup='true'
                        aria-controls='dropdown-menu'
                        onClick={handleActivatedDropwdown}
                    >
                        <span className='is-fullwidth has-text-left'>
                            {valueDropdown.text
                                ? valueDropdown.text
                                : placeholder}
                        </span>
                        <span className='icon is-small'>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </span>
                    </Button>
                </div>
                <div
                    className='dropdown-menu'
                    id='dropdown-menu'
                    role='menu'
                    style={{ overflowY: 'auto' }}
                >
                    <div className='dropdown-content'>
                        {objectValue.length > 0 &&
                            objectValue.map((item, index) => {
                                const itemClasses = classnames(
                                    'dropdown-item',
                                    valueDropdown.text === item.text
                                        ? 'is-active'
                                        : ''
                                );

                                return (
                                    <a
                                        key={index}
                                        className={itemClasses}
                                        onClick={() => {
                                            handleSelectedOption(item);
                                        }}
                                    >
                                        {item.text}
                                    </a>
                                );
                            })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Dropdown;
