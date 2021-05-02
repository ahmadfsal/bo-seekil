import { Level, LevelLeft, LevelRight } from '@layout';
import { Button, Title } from '@elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import TableProduct from './views/table';

const MasterProducts = () => {
    return (
        <>
            <Level>
                <LevelLeft>
                    <Title>Product</Title>
                </LevelLeft>
                <LevelRight>
                    <Button className='is-primary'>
                        <FontAwesomeIcon icon={faPlus} />
                        &nbsp;Add Product
                    </Button>
                </LevelRight>
            </Level>
            <TableProduct />
        </>
    );
};

export default MasterProducts;
