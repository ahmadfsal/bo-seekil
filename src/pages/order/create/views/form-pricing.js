import { Column, Columns } from '@layout';
import { currencyFormat } from '@utils';
import { countSubtotal } from '@utils';

const FormPricing = (props) => {
    const { values } = props;

    return (
        <Columns className='is-size-6 is-margin-bottom'>
            <Column className='is-4 is-offset-8'>
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Subtotal Item
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right has-text-success'>
                        Rp
                        {countSubtotal(values).subtotal
                            ? currencyFormat(countSubtotal(values).subtotal)
                            : 0}
                    </Column>
                </Columns>
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Ongkos Kirim
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right has-text-success'>
                        Rp{' '}
                        {values.pickup_delivery_price
                            ? currencyFormat(values.pickup_delivery_price)
                            : 0}
                    </Column>
                </Columns>
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Diskon
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right has-text-danger'>
                        Rp{' '}
                        {values.potongan ? currencyFormat(values.potongan) : 0}
                    </Column>
                </Columns>
                <div className='divider' />
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Total
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right'>
                        Rp
                        {countSubtotal(values).total
                            ? currencyFormat(countSubtotal(values).total)
                            : 0}
                    </Column>
                </Columns>
            </Column>
        </Columns>
    );
};

export default FormPricing;
