import React, { forwardRef, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FilterSidebar = forwardRef(({ className }, ref) => {
  const [searchParams, setsearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 500,
    maxPrice: 10000,
  });
  const [priceRange, setPriceRange] = useState([500, 10000]);
  const categories = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Gray",
    "White",
    "Pink",
    "Beige",
    "navy",
    "Orange",
    "Brown",
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const materials = [
    "Cotton",
    "Wool",
    "Wash & Wear",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
    "Polyester",
    "Leather",
  ];
  const brands = [
    "Adidas",
    "Modren Fit",
    "ChicStyle",
    "Fashionista",
    "Beach Breze",
    "Street Style",
  ];
  const genders = ["Men", "Women"];
  const handleFilteChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log({ name, value, checked, type });
    let newFilters = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }
    setFilters(newFilters);
    console.log(newFilters);
    updateURLParams(newFilters);
  };
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 500,
      maxPrice: params.maxPrice || 10000,
    });

    // 👇 Corrected
    setPriceRange([500, params.maxPrice ? Number(params.maxPrice) : 10000]);
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    // {category : "Top Wear", size : ["XS", "S"]}
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });
    setsearchParams(params);
    navigate(`?${params.toString()}`);
  };
 

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    if (newPrice >= 500 && newPrice <= 10000) {
      setPriceRange([500, newPrice]);
      const newFilters = { ...filters, minPrice: 500, maxPrice: newPrice };
      setFilters(newFilters);
      updateURLParams(newFilters);
    }
  };
  
  return (
    <div ref={ref} className={className}>
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Filter</h1>

        {/* Category Filter*/}
        <div className="mb-8">
  <label className="block text-xl font-semibold text-gray-900 mb-4">
    Category
  </label>
  <div className="space-y-2">
    {categories.map((category) => {
      const isChecked = filters.category === category;

      return (
        <label
          key={category}
          className={`
            flex items-center justify-between
            px-4 py-2 rounded-md cursor-pointer 
            transition-all duration-200 ease-in-out
            border ${isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
            shadow-sm hover:shadow-md
            hover:bg-gray-50
          `}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilteChange}
              checked={isChecked}
              className="form-radio text-blue-500 focus:ring-blue-400 h-4 w-4 mr-3"
            />
            <span className={`text-sm font-medium ${isChecked ? 'text-blue-600' : 'text-gray-800'}`}>
              {category}
            </span>
          </div>

          {isChecked && (
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </label>
      );
    })}
  </div>
</div>

        {/* End*/}

        {/* Gender Filter*/}
        <div className="mb-8">
  <label className="block text-xl font-semibold text-gray-900 mb-4">
    Gender
  </label>
  <div className="space-y-2">
    {genders.map((gender) => {
      const isChecked = filters.gender === gender;

      return (
        <label
          key={gender}
          className={`
            flex items-center justify-between
            px-4 py-2 rounded-md cursor-pointer 
            transition-all duration-200 ease-in-out
            border ${isChecked ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
            shadow-sm hover:shadow-md
            hover:bg-gray-50
          `}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilteChange}
              checked={isChecked}
              className="form-radio text-blue-500 focus:blue-pink-400 h-4 w-4 mr-3"
            />
            <span className={`text-sm font-medium ${isChecked ? 'text-blue-600' : 'text-gray-800'}`}>
              {gender}
            </span>
          </div>

          {isChecked && (
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </label>
      );
    })}
  </div>
</div>

        {/* End*/}
        {/* Color Filter */}
        <div className="mb-10 mr-2">
          <label className="block text-xl font-semibold text-gray-900 mb-4">
            Choose Color
          </label>

          {/* Selected Color */}
          {filters.color && (
            <div className="mb-5 flex items-center justify-between bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 shadow-sm">
              <div className="flex items-center space-x-3">
                <div
                  className="w-6 h-6 rounded-full border-2 border-gray-400"
                  style={{ backgroundColor: filters.color.toLowerCase() }}
                />
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {filters.color}
                </span>
              </div>
              <button
                onClick={() => {
                  const newFilters = { ...filters, color: "" };
                  setFilters(newFilters);
                  updateURLParams(newFilters);
                }}
                className="text-sm text-red-500 hover:underline transition-all"
              >
                ✕ Remove
              </button>
            </div>
          )}

        {/* Color Swatches Grid */}
<div className="grid grid-cols-6 sm:grid-cols-8 gap-3">
  {colors
    .filter((color) => color !== filters.color)
    .map((color) => (
      <button
        key={color}
        name="color"
        value={color}
        onClick={handleFilteChange}
        aria-label={color}
        title={color}
        className={`
          relative 
          w-10 h-10 
          border-2 
          rounded-md 
          shadow-sm 
          hover:scale-105 
          transition-all duration-200 ease-in-out 
          hover:ring-2 hover:ring-blue-500 hover:ring-offset-2
          focus:outline-none
        `}
        style={{ backgroundColor: color.toLowerCase() }}
      >
        <span className="sr-only">{color}</span>
      </button>
    ))}
</div>

        </div>

        {/* End */}

        {/* Size Filter */}
        <div className="mb-6">
  <label htmlFor="size" className="block text-gray-900 font-semibold mb-4 text-lg">
    Select Size
  </label>
  <div className="flex flex-wrap gap-6">
    {sizes.map((size) => (
      <div
        key={size}
        className="flex items-center space-x-3 transition duration-200 ease-in-out transform hover:translate-x-1 hover:shadow-sm cursor-pointer"
      >
        <input
          type="checkbox"
          name="size"
          value={size}
          onChange={handleFilteChange}
          checked={filters.size.includes(size)}
          className="h-5 w-5 text-indigo-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out"
        />
        <span className="text-gray-700 font-medium text-sm">{size}</span>
      </div>
    ))}
  </div>
</div>



        {/* End */}
        {/* Material Filter */}
        <div className="mb-6">
  <label htmlFor="material" className="block text-gray-900 font-semibold mb-4 text-lg">
    Materials
  </label>
  <div className="space-y-4">
    {materials.map((material) => (
      <div
        key={material}
        className="flex items-center space-x-3 transition duration-200 ease-in-out transform hover:translate-x-1 hover:shadow-sm cursor-pointer"
      >
        <input
          type="checkbox"
          name="material"
          value={material}
          onChange={handleFilteChange}
          checked={filters.material.includes(material)}
          className="h-5 w-5 text-indigo-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out"
        />
        <span className="text-gray-800 font-medium text-sm">{material}</span>
      </div>
    ))}
  </div>
</div>

        {/* End */}
        {/* Brands Filter */}
        <div className="mb-6">
  <label htmlFor="brand" className="block text-gray-900 font-semibold mb-4 text-lg">
    Brands
  </label>
  <div className="space-y-4">
    {brands.map((brand) => (
      <div
        key={brand}
        className="flex items-center space-x-3 transition duration-200 ease-in-out transform hover:translate-x-1 hover:shadow-sm cursor-pointer"
      >
        <input
          type="checkbox"
          name="brand"
          value={brand}
          onChange={handleFilteChange}
          checked={filters.brand.includes(brand)}
          className="h-5 w-5 text-indigo-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200 ease-in-out"
        />
        <span className="text-gray-800 font-medium text-sm">{brand}</span>
      </div>
    ))}
  </div>
</div>

        {/* End */}

        {/* Price Range */}
        <div className="mb-8 w-full max-w-md">
  <label htmlFor="priceRange" className="block text-gray-800 font-semibold mb-3 text-lg">
    Select Price Range
  </label>

  <div className="relative">
    <input
      type="range"
      id="priceRange"
      name="priceRange"
      min={500}
      max={10000}
      step={100}
      value={priceRange[1] ?? 10000}
      onChange={handlePriceChange}
      className="w-full h-3 appearance-none rounded-lg cursor-pointer bg-gradient-to-r from-blue-300 to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
    />
    
    {/* Price limits */}
    <div className="flex justify-between text-sm text-gray-600 mt-2">
      <span>Pkr 500</span>
      <span>Pkr 10k</span>
    </div>
  </div>

  {/* Display selected price */}
  <div className="mt-4 text-gray-700 font-medium text-center bg-blue-50 py-2 rounded shadow-inner">
    Selected Price: <span className="text-blue-600">Rs {priceRange[1]}</span>
  </div>
</div>


      </div>
    </div>
  );
});

export default FilterSidebar;
