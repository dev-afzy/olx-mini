import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';

import Logo from '../../olx-logo.png';
import './Signup.scss';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory('');

  const { firebase } = useContext(FirebaseContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await auth.user.updateProfile({ displayName: name });
    const addUser = await firebase.firestore().collection('users').add({
      name,
      email,
      phone,
      id: auth?.user?.uid,
    });
    if (addUser) {
      history.push('/login');
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <div className="logo-img">
          <img height="200px" src={Logo}></img>
        </div>
        <div className="formGroup">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              placeholder="Enter your name"
            />
            <br />
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            <br />
            <label htmlFor="phone">Phone</label>
            <input
              className="input"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            <br />
            <br />
            <button>Signup</button>
          </form>
          <Link className="link" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
