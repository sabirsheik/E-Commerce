import { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeatureCollection from "../components/Products/FeatureCollection";
import FeatureSection from "../components/Products/FeatureSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/ProductSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const productsState = useSelector((state) => state.product) || {};
  //  console.log("Products Array:", productsState.product);
  // console.log("Products Length:", productsState.product.length);
  const { products = [], loading, error } = productsState;
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch Products For a Specific Collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "bottom Wear",
        limit: 8,
      })
    );

    // Fetch Best Seller Products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/product-bestSeller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Best seller fetch error :", error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Gender Collection Section */}
      <GenderCollectionSection />

      {/* New Arrivals */}
      <NewArrivals />

      {/* Best Seller Section */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading Best Seller Product .....</p>
      )}

      {/* Top Wears Section */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>

        {loading ? (
          <p className="text-center">Loading Top Wears...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : Array.isArray(products) && products.length === 0 ? (
          <p className="text-center text-gray-500">
            No top wears found for women.
          </p>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>

      {/* Feature Collection */}
      <FeatureCollection />

      {/* Feature Section */}
      <FeatureSection />
    </div>
  );
};

export default Home;
