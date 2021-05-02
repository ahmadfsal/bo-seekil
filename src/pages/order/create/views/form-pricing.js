import { Column, Columns } from '@layout';
import { currencyFormat } from '@utils';

const FormPricing = (props) => {
    const { values } = props;

    const getSubtotalOrTotal = () => {
        return values['items'].reduce((acc, curr) => {
            const subtotal = acc + parseInt(curr.subtotal);

            if (!isNaN(subtotal)) {
                return parseInt(subtotal);
            }
            return 0;
        }, 0);
    };

    const getTotal = () => {
        const { pickup_delivery_price, potongan } = values;
        const total =
            getSubtotalOrTotal() +
            parseInt(pickup_delivery_price) -
            parseInt(potongan);

        return total;
    };

    return (
        <Columns className='is-size-6 is-margin-bottom'>
            <Column className='is-4 is-offset-8'>
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Subtotal Item
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right has-text-success'>
                        {`Rp ${currencyFormat(getSubtotalOrTotal())}`}
                    </Column>
                </Columns>
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Ongkos Kirim
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right has-text-success'>
                        {`Rp ${currencyFormat(values.pickup_delivery_price)}`}
                    </Column>
                </Columns>
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Diskon
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right has-text-danger'>
                        {`Rp ${currencyFormat(values.potongan)}`}
                    </Column>
                </Columns>
                <div className='divider' />
                <Columns>
                    <Column className='has-text-left has-text-weight-bold'>
                        Total
                    </Column>
                    <Column className='is-0'>:</Column>
                    <Column className='has-text-right has-text-weight-bold is-paddingless-right'>
                        {`Rp ${currencyFormat(getTotal())}`}
                    </Column>
                </Columns>
            </Column>
        </Columns>
    );
};

export default FormPricing;
