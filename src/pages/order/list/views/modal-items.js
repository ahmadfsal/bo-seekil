import { Fragment } from 'react';
import { Modal } from '@components';
import { Button } from '@elements';
import { Column, Columns, LevelLeft, Level } from '@layout';
import { Input, Textarea } from '@form';
import { currencyFormat } from '@utils';

const ModalItems = (props) => {
    const { handleModalItems, modalAttr } = props;

    return (
        <Modal
            isShow={modalAttr.isShow}
            title='Items'
            onClickNegativeBtn={handleModalItems}
        >
            {modalAttr?.list?.map((item, index) => {
                return (
                    <Fragment key={item?.id}>
                        {index > 0 && <div className='divider'></div>}
                        <Level>
                            <LevelLeft className='has-text-weight-bold'>
                                {`Item ${index + 1}`}
                            </LevelLeft>
                        </Level>
                        <Columns>
                            <Column>
                                <Input
                                    name='item_name'
                                    label='Item Name'
                                    type='text'
                                    placeholder='Nike, Adidas, New Balance, etc.'
                                    isMandatory
                                    value={item?.item_name ?? ''}
                                />
                            </Column>
                            <Column>
                                <Input
                                    name='services_id'
                                    label='Service'
                                    type='text'
                                    placeholder='Select Service'
                                    value={item?.master_service?.name ?? ''}
                                    isMandatory
                                />
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                                <label className='label'>Topping</label>
                                <div className='field is-grouped is-grouped-multiline'>
                                    -
                                </div>
                            </Column>
                            <Column className='field'>
                                <label className='label'>Subtotal</label>
                                <p className='subtitle'>
                                    Rp{' '}
                                    {item.subtotal
                                        ? `${currencyFormat(item.subtotal)}`
                                        : 0}
                                </p>
                            </Column>
                        </Columns>
                        <Columns>
                            <Column>
                                <Textarea
                                    name='note'
                                    label='Note'
                                    type='textarea'
                                    value={item?.note ?? ''}
                                    placeholder='You can input size of shoes, color or anything here'
                                />
                            </Column>
                        </Columns>
                    </Fragment>
                );
            })}
        </Modal>
    );
};

export default ModalItems;
