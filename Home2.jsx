import React, { useState, useEffect } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row } from 'reactstrap';
import Slider from "react-slick";
import '../styles/home.css';
import { Link } from "react-router-dom";
import ProductsLists from '../components/UI/ProductsList';
import HashLoader from "react-spinners/HashLoader";
import useGetData from '../custom-hooks/useGetData';
import Services from "../services/Services";

const Shop = () => {
  const { data: productsData, loading: productsLoading } = useGetData('products');
  const { data: sliderData, loading: sliderLoading } = useGetData("slider");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const handleFilter = e => {
    const filterValue = e.target.value;

    if (filterValue === 'Tablet') {
      const filterProducts = productsData.filter(item => item.category === 'Tablet');
      setProducts(filterProducts);
    } else if (filterValue === 'Laptops') {
      const filterProducts = productsData.filter(item => item.category === 'Laptops');
      setProducts(filterProducts);
    } else if (filterValue === 'mobile') {
      const filterProducts = productsData.filter(item => item.category === 'mobile');
      setProducts(filterProducts);
    } else if (filterValue === 'chair') {
      const filterProducts = productsData.filter(item => item.category === 'chair');
      setProducts(filterProducts);
    } else {
      setProducts(productsData);
    }

    if (filterValue === 'watch') {
      const filterProducts = productsData.filter(item => item.category === 'watch');
      setProducts(filterProducts);
    }

    if (filterValue === 'Headphones') {
      const filterProducts = productsData.filter(item => item.category === 'Headphones');
      setProducts(filterProducts);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Helmet title='Home'>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <HashLoader loading={productsLoading || sliderLoading} size={40} color="#36d7b7" />
      </div>

      <section className="slider_section">
        <Slider {...sliderSettings}>
          {sliderData.map((slider, index) => (
            <Link to="/shop" key={`slider${index}`}>
              <div>
                <img
                  src={slider.imgUrl}
                  key={`slider${index}`}
                  alt={`Slider ${index}`}
                />
              </div>
            </Link>
          ))}
        </Slider>
        <Services />
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <HashLoader loading={productsLoading} size={40} color="#36d7b7" />
            </div>
            <ProductsLists data={products} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Shop;
