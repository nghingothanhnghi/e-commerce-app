// components/CartList.jsx
// Example usage in a component
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ListGroup, Badge, Button } from 'react-bootstrap';
import { IconTrash, IconShoppingCartQuestion } from '@tabler/icons-react';
import { useCart } from '../../contexts/CartContext';

const CartList = () => {
    const { cartState, removeFromCart } = useCart();
    console.log('Cart Items:', cartState.items);
    return (
        <div>
            {cartState.items.length > 0 ? (
                <ListGroup as="ol">
                    {cartState.items.map((item, index) => (
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={index}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.name}</div>
                                {item.quantity} item(s)
                                {/* Add other item details as needed */}
                            </div>
                            <div>
                                <Button
                                    variant="light"
                                    size="sm"
                                    className="ms-2 btn-circle"
                                    onClick={() => removeFromCart(item)}
                                >
                                    <IconTrash />
                                </Button>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <div className="text-center mt-3 py-7">
                    <h4 className='text-muted'><IconShoppingCartQuestion size={46}/></h4>
                    <p>Your cart is empty.</p>
                </div>
            )}

        </div>

    );
};

export default CartList;
