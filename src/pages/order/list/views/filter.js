import { Card } from '@components';
import { Columns, Column } from '@layout';
import { Button } from '@elements';
import { FormField } from '@form';
import { Formik } from 'formik';

const Filter = (props) => {
    const { orderStatusData, orderTypeData } = props;
    return (
        <Formik initialValues={{ order_type: '', order_status: '' }}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Card title='Filter' className='mb-5'>
                        <Columns>
                            <Column>
                                <FormField
                                    name='order_type'
                                    label='Order Type'
                                    type='select'
                                    placeholder='Select Order Type'
                                    objectValue={orderTypeData}
                                />
                            </Column>
                            <Column>
                                <FormField
                                    name='order_status'
                                    label='Order Status'
                                    type='select'
                                    placeholder='Select Order Status'
                                    objectValue={orderStatusData}
                                />
                            </Column>
                        </Columns>
                        <Columns>
                            <Column className='is-offset-8 is-pulled-right'>
                                <div className='buttons is-right'>
                                    <Button type='reset'>Reset</Button>
                                    <Button type='submit' className='is-dark'>
                                        Apply Filter
                                    </Button>
                                </div>
                            </Column>
                        </Columns>
                    </Card>
                </form>
            )}
        </Formik>
    );
};

export default Filter;
