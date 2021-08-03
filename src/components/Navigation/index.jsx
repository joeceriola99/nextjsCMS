import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export default function AdminNavigation(props) {
  const router = useRouter();

  const { cartCount } = useSelector((state) => state.cartData);

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 15,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);

  const cartHandler = () => {
    let data = Cookies.get('userID');
    console.log(data);
    if (data) {
      router.push('/checkout');
    } else {
      router.push('auth/login');
    }
  };
  const [toggleNav, setToggleNav] = useState(false);
  const toggleMenu = () => {
    setToggleNav(!toggleNav);
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Image src={'/LogoAjSlider.png'} height={30} width={150} alt="AJ SLider" />
        <div style={{ marginLeft: 'auto' }}>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={toggleNav ? 'collapse navbar-collapse navbarToggle' : 'collapse navbar-collapse'}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#" onClick={() => router.push('/home')}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => router.push('/orderNow')}>
                  Order Now
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contact Us
                </a>
              </li>
              <li className="nav-item">
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={cartCount} color="secondary">
                    <ShoppingCartIcon onClick={cartHandler} />
                  </StyledBadge>
                </IconButton>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}
