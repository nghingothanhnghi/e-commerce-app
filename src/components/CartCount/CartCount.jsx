// Example usage in a component
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconShoppingBag } from '@tabler/icons-react';
import { Offcanvas, Button } from 'react-bootstrap';
import { useCart } from '../../contexts/CartContext';
import CartList from '../CartList/CartList';

const CartCounter = () => {
    const { cartCount, cartState, clearCart } = useCart();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Button variant='light' size='sm' onClick={handleShow} className="position-relative btn-circle">
                <IconShoppingBag size={18} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                    <span className="visually-hidden">Cart Count</span>
                </span>
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <CartList />

                </Offcanvas.Body>{cartState.items.length > 0 && (
                    <div className="offcanvas-footer d-flex p-3">
                        <Button className='col' variant="light" size="lg" onClick={clearCart}>
                            Clear Cart
                        </Button>
                    </div>
                )}
            </Offcanvas>
        </>
    );
};

export default CartCounter;
