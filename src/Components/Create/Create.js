import React, { Fragment, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../store/Context';
import './Create.scss';
import Header from '../Header/Header';

const Create = () => {
  const history = useHistory('');
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const addNewProduct = async (e) => {
    const { uid } = user;
    const { ref } = await firebase
      .storage()
      .ref(`image/${image.name}`)
      .put(image);
    const imageUrl = await ref.getDownloadURL();
    try {
      const addProduct = await firebase.firestore().collection('products').add({
        userId: uid,
        name,
        category,
        price,
        imageUrl,
        createdAt: new Date().toString(),
      });

      if (addProduct) {
        history.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <h1 className="header-sell">ADD PRODUCT</h1>
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="label" htmlFor="category">
            Category
          </label>
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            vale={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label className="label" htmlFor="price">
            Price
          </label>
          <input
            className="input price"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <img
            alt="Posts"
            className="preview"
            src={image ? URL.createObjectURL(image) : ''}
          ></img>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" />
          <button onClick={addNewProduct} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
