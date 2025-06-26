import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

import SummaryApi from "../common/SummaryApi.js";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees.js";
import { pricewithDiscount } from "../utils/PriceWithDiscount.js";

import Divider from "../components/Divider.jsx";
import AddToCartButton from "../components/AddToCartButton.jsx";

import image1 from "../assets/minute_delivery.png";
import image2 from "../assets/Best_Prices_Offers.png";
import image3 from "../assets/Wide_Assortment.png";

export default function ProductDisplayPage() {
  const { product } = useParams();
  const productId = product?.split("-")?.slice(-1)[0];
  const [productData, setProductData] = useState({
    name: "",
    image: [],
    description: "",
    unit: "",
    price: 0,
    discount: 0,
    stock: 0,
    more_details: {},
    type: "",
    shelfLife: "",
    countryOfOrigin: "",
    fssaiLicense: "",
    customerCareDetails: "",
    returnPolicy: "",
    expiryDate: "",
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageContainerRef = useRef();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
    window.scrollTo(0, 0);
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId },
      });
      if (response.data.success) {
        setProductData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollRight = () => {
    imageContainerRef.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainerRef.current.scrollLeft -= 100;
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 rounded-full animate-spin border-4 border-t-transparent border-[#4e953f]"></div>
        </div>
      ) : (
        <section className="container mx-auto p-4 grid lg:grid-cols-2">
          {/* Left Section */}
          <div className="space-y-4">
            <div className="bg-white rounded shadow h-64 lg:h-[65vh] flex items-center justify-center">
              {productData.image?.length > 0 && (
                <img
                  src={productData.image[currentImageIndex]}
                  alt={productData.name}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-3 my-2">
              {productData.image?.map((img, index) => (
                <div
                  key={img + index + "point"}
                  className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === currentImageIndex && "bg-slate-300"
                    }`}
                />
              ))}
            </div>

            <div className="grid relative">
              <div
                ref={imageContainerRef}
                className="flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none"
              >
                {productData.image?.map((img, index) => (
                  <div
                    className="w-20 h-20 min-h-20 min-w-20 cursor-pointer shadow-md"
                    key={img + index}
                  >
                    <img
                      src={img}
                      alt="min-product"
                      onClick={() => setCurrentImageIndex(index)}
                      className="w-full h-full object-scale-down"
                    />
                  </div>
                ))}
              </div>
              {productData.image?.length > 3 && (
                <div className="w-full -ml-3 h-full hidden lg:flex justify-between absolute items-center">
                  <button
                    onClick={handleScrollLeft}
                    className="z-10 bg-white relative p-1 rounded-full shadow-lg"
                  >
                    <FaAngleLeft />
                  </button>
                  <button
                    onClick={handleScrollRight}
                    className="z-10 bg-white relative p-1 rounded-full shadow-lg"
                  >
                    <FaAngleRight />
                  </button>
                </div>
              )}
            </div>

            {/* Description (desktop) */}
            <div className="hidden lg:block space-y-2">
              <InfoBlock
                title="Description"
                content={productData.description}
              />
              <InfoBlock title="Unit" content={productData.unit} />
              <InfoBlock title="Type" content={productData.type} />
              <InfoBlock title="Shelf Life" content={productData.shelfLife} />
              <InfoBlock
                title="Country Of Origin"
                content={productData.countryOfOrigin}
              />
              <InfoBlock
                title="FSSAI License"
                content={productData.fssaiLicense}
              />
              <InfoBlock
                title="Customer Care Details"
                content={productData.customerCareDetails}
              />
              <InfoBlock
                title="Return Policy"
                content={productData.returnPolicy}
              />
              <InfoBlock title="Expiry Date" content={productData.expiryDate} />
              {Object.entries(productData.more_details || {}).map(
                ([key, val], i) => (
                  <InfoBlock key={i} title={key} content={val} />
                )
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="p-4 lg:pl-7 text-base lg:text-lg">
            <p className="bg-green-100 text-green-700 text-xs inline-block px-2 py-1 rounded-full">
              10 Min Delivery
            </p>
            <h2 className="text-lg font-semibold lg:text-3xl">
              {productData.name}
            </h2>
            <p>{productData.unit}</p>
            <Divider />

            {/* Pricing */}
            <div>
              <p className="font-semibold">Price</p>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-green-50 border border-green-500 px-3 py-1 rounded">
                  {DisplayPriceInRupees(
                    pricewithDiscount(productData.price, productData.discount)
                  )}
                </span>
                {productData.discount > 0 && (
                  <>
                    <span className="line-through text-gray-400">
                      {DisplayPriceInRupees(productData.price)}
                    </span>
                    <span className="text-green-600 font-bold">
                      {productData.discount}% Off
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            {productData.stock === 0 ? (
              <p className="text-lg text-red-500 my-2">Out of Stock</p>
            ) : (
              <div className="my-4">
                <AddToCartButton data={productData} />
              </div>
            )}

            {/* Why Shop Section */}
            <div>
              <h2 className="font-semibold">Why shop from NeedYou?</h2>
              <WhyShopFeature
                img={image1}
                title="Superfast Delivery"
                desc="Get your order delivered to your doorstep at the earliest from dark stores near you."
              />
              <WhyShopFeature
                img={image2}
                title="Best Prices & Offers"
                desc="Best price destination with offers directly from the manufacturers."
              />
              <WhyShopFeature
                img={image3}
                title="Wide Assortment"
                desc="Choose from 5000+ products across food, personal care, household & other categories."
              />
            </div>

            {/* Mobile Description */}
            <div className="block lg:hidden space-y-2">
              <InfoBlock
                title="Description"
                content={productData.description}
              />
              <InfoBlock title="Unit" content={productData.unit} />
              <InfoBlock title="Type" content={productData.type} />
              <InfoBlock title="Shelf Life" content={productData.shelfLife} />
              <InfoBlock
                title="Country Of Origin"
                content={productData.countryOfOrigin}
              />
              <InfoBlock
                title="FSSAI License"
                content={productData.fssaiLicense}
              />
              <InfoBlock
                title="Customer Care Details"
                content={productData.customerCareDetails}
              />
              <InfoBlock
                title="Return Policy"
                content={productData.returnPolicy}
              />
              <InfoBlock title="Expiry Date" content={productData.expiryDate} />
              {Object.entries(productData.more_details || {}).map(
                ([key, val], i) => (
                  <InfoBlock key={i} title={key} content={val} />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

const InfoBlock = ({ title, content }) => (
  <div>
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

const WhyShopFeature = ({ img, title, desc }) => (
  <div className="flex gap-3 items-center my-2">
    <img src={img} alt={title} className="w-20 h-20 object-contain" />
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm">{desc}</p>
    </div>
  </div>
);
