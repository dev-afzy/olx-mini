import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { useParams } from 'react-router-dom';

import './View.css';
function View() {
  const params = useParams();
  const { firebase } = useContext(FirebaseContext);
  const fireStore = firebase.firestore();
  console.log('params-->', params);
  const [post, setPost] = useState();
  useEffect(() => {
    getPost();
  }, [params]);

  const getPost = async () => {
    try {
      const productCollection = fireStore.collection('products').doc(params.id);
      const productDoc = await productCollection.get();
      const productDetails = productDoc.data();
      const userCollection = await fireStore
        .collection('users')
        .where('id', '==', productDetails.userId)
        .get();
      userCollection.forEach((user) => {
        const userDetails = user.data();
        userDetails['sellerName'] = userDetails.name;
        setPost({ ...userDetails, ...productDetails });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={post?.imageUrl || ''} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; Price: {post?.price} </p>
          <span>Name: {post?.name}</span>
          <p>Category: {post?.category}</p>
          <span>CreatedAt: {new Date(post?.createdAt).toDateString()}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Name: {post?.sellerName}</p>
          <p>Phone: {post?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
