// Example usage in a component
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import { useWishlist } from '../../contexts/WishlistContext';

const WishlistCount = () => {
    const { wishlistCount } = useWishlist();

    return (
        <Link className="btn btn-light btn-sm position-relative btn-circle">
            <IconHeart size={18}/>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {wishlistCount}
                <span className="visually-hidden">Wishlist Count</span>
            </span>
        </Link>
    );
};

export default WishlistCount;
