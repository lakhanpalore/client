import React,{useState} from 'react'
import { Card, Tabs, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import {
    HeartOutlined,ShoppingCartOutlined
  } from "@ant-design/icons";

  import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
  import { Carousel } from 'react-responsive-carousel';

import noimage from "../../images/noimage.jpg";
import ProductListItems from './ProductListItems';
import StarRating from "react-star-ratings"
import RatingModal from "../modal/RatingModal"
import { showAverage } from '../../functions/rating';
import _ from "lodash";
import { useSelector,useDispatch } from "react-redux";

const {TabPane}=Tabs;



const SingleProduct = ({product, onStarClick, star}) => {
 
  const {user, cart}=useSelector((state)=>({...state}));
  const dispatch=useDispatch();
  const [tooltip, setTooltip] = useState("Click to add");

    const{
        title,
        images,
        description,
        _id,
    }=product;

    const handleAddToCart = () => {
      // create cart array
      let cart = [];
      if (typeof window !== "undefined") {
        // if cart is in local storage GET it
        if (localStorage.getItem("cart")) {
          cart = JSON.parse(localStorage.getItem("cart"));
        }
        // push new product to cart
        cart.push({
          ...product,
          count: 1,
        });
        // remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        // save to local storage
        // console.log('unique', unique)
        localStorage.setItem("cart", JSON.stringify(unique));
        // show tooltip
        setTooltip("Added");
  
        //add to reduc state
        dispatch({
         type: "ADD_TO_CART",
         payload: unique, 
        })

         //show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true, 
       })
      }
    };
  

  return (
    <>
      <div className="col-md-7">
        { images && images.length ?( <Carousel showArrows={true} autoPlay infiniteLoop>
              {images && images.map((i)=> 
                <img src={i.url} key={i.public_id} alt=""/>)
            }
          </Carousel>):(
              <Card cover={<img src={noimage} className="card-image" alt=""/>}> 
              </Card>
              
          )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">{description && description}</TabPane>
          <TabPane tab="More" key="2"> Call us on 123456789 to know more about this product </TabPane>
        </Tabs>
      </div>

      

      <div className="col-md-5">
          <h1 className='bg-info p-3'>{title}</h1>
           
           {product && product.ratings && product.ratings.length >0 ? 
                showAverage(product):
                 <div className='text-center pt-1 pb-3'>No ratings yet</div>}
            
          <Card
          actions={[
            <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}>
              <ShoppingCartOutlined className="text-danger" /> <br /> Add to
              Cart
            </a>
          </Tooltip>,
            <Link to="/"><HeartOutlined className="text-info"/><br/>Add to Wishlist</Link>,
            <RatingModal>
            <StarRating
              name={_id}
              numberOfStars={5}
              rating={star}
              changeRating={onStarClick}
              isSelectabl={true}
              starRatedColor="red"
            />
            </RatingModal>

        ]}
          >
            
            <ProductListItems product={product}/>
          </Card></div>

    </>
  )
}

export default SingleProduct
