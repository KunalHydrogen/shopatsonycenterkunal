import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
//Importing Featured Collections
// import Swiper core and required modules
import { useRef, useEffect } from 'react';
import { register } from 'swiper/element/bundle';
import { Sony_data } from "~/Products.js";



register();

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context}) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}




 function Products({title, price, MRP, YouSave, button, images, link}){
    return(
        <div className="Inner_Product_div">
             <img src={images} alt={title} />
            <p>{title}</p>
            <div className="price_Mrp">
            <span className="Price">{price}</span>
            <span className="MRP">MRP {MRP}</span>
            </div>
            <span className="YouSave">You Save:<span className="InnerValue">{YouSave}</span></span>
            <div className="Addtocart">
            <a  onClick={{link}}>Add to Cart</a>
            </div>
        </div>
    );
}


const ProductList = ({ data }) => {
  return (
    <div className="Wrapper_Product">
      {data.map((product, index) => (
        <Products key={index} {...product} />
      ))}
    </div>
  );
};



export default function Index() {
  const {collections} = useLoaderData();


  //const swiperElRef = useRef(null);

  // useEffect(() => {
  //   // listen for Swiper events using addEventListener
  //   swiperElRef.current.addEventListener('swiperprogress', (e) => {
  //     const [swiper, progress] = e.detail;
  //     console.log(progress);
  //   });

  //   swiperElRef.current.addEventListener('swiperslidechange', (e) => {
  //     console.log('slide changed');
  //   });


  // }, []);
  const swiperRef = useRef(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      navigation: true,
      pagination: true,
      loop: true,
      // These are new...
      injectStyles: [
        `
          .swiper-button-next,
          .swiper-button-prev {
           color:white;
           width:20px;
          }
          .swiper-pagination-bullet{
          }
      `,
      ],
    };

    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);
  
  return (
    <section className="BannerSection">
      <div className="ImageBox">
      <swiper-container ref={swiperRef} init="false">
        {collections.nodes.map((collection) => {
          return (
           
            <swiper-slide>
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              
                {collection?.image && (
                  <Image 
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                  />
                )}
             
            </Link>
           </swiper-slide>
         
          );
         
        })}
         </swiper-container>


      </div> 

<div>
 
</div>
 
<ProductList data={Sony_data} />

    </section>

  
  );

}



const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        handle
        image {
          altText
          url
        }
      }
    }
  }
`;



