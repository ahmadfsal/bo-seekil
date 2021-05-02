import { Fragment } from 'react';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { blankItemObject } from 'src/pages/order/shared/scheme';
import { FormFieldArray } from '@form';
import { Column, Columns, LevelRight, LevelLeft, Level } from '@layout';
import { Button } from '@elements';
import { currencyFormat } from '@utils';

import FormItemsServices from './form-items-services';

const FormItems = (props) => {
    const { objectValueServices, setFieldValue, values } = props;

    return (
        <FieldArray name='items'>
            {({ push, remove }) => (
                <Fragment>
                    {values.items.map((item, index) => {
                        const BASENAME = `items[${index}]`;

                        return (
                            <Fragment key={index}>
                                {index > 0 && <div className='divider'></div>}
                                {/* <Level>
                                    <LevelLeft className='has-text-weight-bold'>
                                        {`Item ${index + 1}`}
                                    </LevelLeft>
                                    <LevelRight>
                                        <div className='buttons'>
                                            {index > 0 && (
                                                <Button
                                                    className='is-danger is-outlined'
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                    &nbsp;Remove Item
                                                </Button>
                                            )}
                                            {index ===
                                                values.items.length - 1 && (
                                                <Button
                                                    className='is-outlined is-info'
                                                    onClick={() =>
                                                        push(blankItemObject)
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPlus}
                                                    />
                                                    &nbsp;Add new item
                                                </Button>
                                            )}
                                        </div>
                                    </LevelRight>
                                </Level> */}
                                <Columns key={index}>
                                    <Column>
                                        <FormFieldArray
                                            name={`${BASENAME}.item_name`}
                                            label='Item Name'
                                            type='textarea'
                                            placeholder='Nike, Adidas, New Balance, etc.'
                                            isMandatory
                                            disabled
                                        />
                                    </Column>
                                    <Column>
                                        <Column>
                                            <FormFieldArray
                                                name={`${BASENAME}.note`}
                                                label='Note'
                                                type='textarea'
                                                placeholder='You can input size of shoes, color or anything here'
                                                disabled
                                            />
                                        </Column>
                                    </Column>
                                </Columns>
                                <Columns>
                                    <Column>
                                        <FormItemsServices
                                            BASENAME={BASENAME}
                                            item={item}
                                            objectValue={objectValueServices}
                                            setFieldValue={setFieldValue}
                                        />
                                    </Column>
                                    <Column className='field'>
                                        <label className='label'>
                                            Subtotal
                                        </label>
                                        <p className='subtitle'>
                                            {`Rp ${
                                                item.subtotal
                                                    ? currencyFormat(
                                                          item.subtotal
                                                      )
                                                    : '-'
                                            }`}
                                        </p>
                                    </Column>
                                </Columns>
                            </Fragment>
                        );
                    })}
                </Fragment>
            )}
        </FieldArray>
    );
};

export default FormItems;
