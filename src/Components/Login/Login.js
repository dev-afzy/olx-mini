import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory('');
  const { firebase } = useContext(FirebaseContext);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const auth = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (auth) {
        history.push('/');

        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const errorMessage = error ? (
    <p className="error-message"> Invalid username or password</p>
  ) : (
    ''
  );

  return (
    <div>
      <div className="loginParentDiv">
        <div style={{ textAlign: 'center' }}>
          <img width="200px" height="200px" src={Logo}></img>
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
          {errorMessage}
        </form>
        <Link className="link" to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
