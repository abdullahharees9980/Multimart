import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import PictureSlider from '../redux/slices/PictureSlider';

import { db } from '../firebase.config';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null);
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: products } = useGetData('products');
  const { cartItems } = useSelector((state) => state.cart);

  const docRef = doc(db, 'products', id);

  useEffect(() => {
    const getProduct = async () => {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log('no product');
      }
    };

    getProduct();
  }, [id]);

  const {
    imgUrl,
    productName,
    price,
    // avgRating,
    // reviews,
    description,
    shortDesc,
    category,
    stock,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category && item.id !== id);
  const relatedProducts1 = products.filter((item) => item.stock === stock && item.id !== id);

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };

    // Store the review in Firestore
    const addFeedback = async () => {
      try {
        const feedbackRef = await collection(db, 'feedback');
        await addDoc(feedbackRef, reviewObj);
        toast.success('Thankyou for the feedback');
        // Clear form fields and reset rating
        reviewUser.current.value = '';
        reviewMsg.current.value = '';
        setRating(null);
      } catch (error) {
        console.error('Error adding feedback: ', error);
        toast.error('Failed to submit review');
      }
    };

    addFeedback();
  };

  const addToCart = async () => {
    const newCartItem = {
      id,
      productName: product.productName,
      price: product.price,
      imgUrl: product.imgUrl,
      uid: uid,
      quantity: 1,
    };

    if (uid !== '') {
      const alreadyExists = cartItems.filter((cartItem) => {
        return cartItem.productName === product.productName;
      });
      if (alreadyExists.length > 0) {
        const existingItem = doc(db, 'cart', alreadyExists[0].id);
        await updateDoc(existingItem, {
          quantity: alreadyExists[0].quantity + 1,
        });
        toast.success('Product updated');
      } else {
        try {
          const docRef = await collection(db, 'cart');
          await addDoc(docRef, newCartItem);
          toast.success('Product added successfully');
        } catch (error) {
          toast.error('Failed to add cart Item');
        }
      }
    } else {
      navigate('/login');
      toast.error('Please login');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt="" />
            </Col>

            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">${price}</span>
                  <span>Category: {category}</span>
                  <span>Stock: {stock}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>

                <motion.button whileTap={{ scale: 1.2 }} className="buy_btn" onClick={addToCart}>
                  Add to Cart
                </motion.button>
                <div>
                  <button className="buy_btn w-30 mt-3">
                    <Link to="/shop">Continue Shopping</Link>
                  </button>
                </div>
              </div>
            </Col>

            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
            <ProductsList data={relatedProducts1} />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab' : 'desc'}`} onClick={() => setTab('desc')}>
                  Description
                </h6>
                <h6 className={`${tab === 'desc' ? 'active__tab' : 'rev'}`} onClick={() => setTab('rev')}>
                  Feedback
                </h6>
              </div>

              {tab === 'desc' ? (
                <div className="tab__content mt-5 ">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <div className="review__form">
                      <h4>Leave your Experience</h4>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
                        </div>

                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.span
                              key={star}
                              className={`star ${star <= rating ? 'filled' : ''}`}
                              whileTap={{ scale: 1.2 }}
                              onClick={() => setRating(star)}
                            >
                              <i className="ri-star-fill"></i>
                            </motion.span>
                          ))}
                        </div>

                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message...."
                            required
                          />
                        </div>
                        <motion.button whileTap={{ scale: 1.2 }} type="submit" className="buy_btn">
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
