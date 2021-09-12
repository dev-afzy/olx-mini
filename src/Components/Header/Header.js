import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context';

function Header() {
  const { user, setUser } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUser(null);
      });
    console.log('test');
  };
  const name = (
    <div className="module">
      <div className="trigger">
        <span>
          <em>🖐</em> {user?.displayName}
        </span>
        <ul className="locations">
          <li onClick={logout}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to="/">
            <OlxLogo></OlxLogo>
          </Link>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user?.displayName ? (
            name
          ) : (
            <Link to="/login">
              <span className="login">LOGIN</span>
            </Link>
          )}
        </div>

        {user?.displayName ? (
          <div className="sellMenu">
            <Link to="/create">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </Link>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Header;
