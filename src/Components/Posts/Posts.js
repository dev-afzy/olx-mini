import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';
import Heart from '../../assets/Heart';
import './Post.css';

function Posts() {
  const history = useHistory('');
  const { firebase } = useContext(FirebaseContext);
  const [post, setPost] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('products')
      .get()
      .then((snapshot) => {
        const AllPost = snapshot.docs.map((product) => {
          return {
            ...product.data(),
            id: product.id,
          };
        });
        setPost(AllPost);
      });
  }, []);

  const detailedView = (item) => {
    history.push(`/view/${item.id}`);
  };

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {post.map((item) => {
            return (
              <div onClick={() => detailedView(item)} className="card">
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {item.price}</p>
                  <span className="kilometer">{item.category}</span>
                  <p className="name"> {item.name}</p>
                </div>
                <div className="date">
                  <span>{new Date(item.createdAt).toDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
