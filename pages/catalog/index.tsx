"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import ProductCardComponent from "@/components/product/ProductCard";
import SearchBar from "@/components/common/SearchBar";
import { ProductCard } from "@/interfaces";
import {
  setKeyword,
  setAllProducts,
  filterProducts,
} from "@/redux/slices/searchSlice";
import { Grid3X3, List } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCardRowComponent from "@/components/product/ProductCardRow";
interface Props {
  allProducts: ProductCard[];
  categories: string[];
}

const CatalogPage: React.FC<Props> = ({ allProducts, categories }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const keyword = useSelector((state: RootState) => state.search.keyword);
  const filteredProducts = useSelector(
    (state: RootState) => state.search.filteredProducts
  );

  const [sortBy, setSortBy] = useState("name");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [isGrigView, setIsGrigView] = useState(true);

  useEffect(() => {
    if (allProducts?.length) {
      dispatch(setAllProducts(allProducts));
      dispatch(filterProducts(allProducts));
    }
  }, [allProducts, dispatch]);

  useEffect(() => {
    const search = searchParams.get("search") || "";
    dispatch(setKeyword(search));
    dispatch(filterProducts(allProducts));
  }, [searchParams, allProducts, dispatch]);

  const displayedProducts = filteredProducts
    ?.filter((p) =>
      selectedCategory ? p.categoryId === selectedCategory : true
    )
    .filter(
      (p) =>
        Number(p.price) >= priceRange[0] && Number(p.price) <= priceRange[1]
    )
    .filter((p) => Number(p.rating) >= minRating)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "priceAsc":
          return Number(a.price) - Number(b.price);
        case "priceDesc":
          return Number(b.price) - Number(a.price);
        case "rating":
          return Number(b.rating) - Number(a.rating);
        default:
          return 0;
      }
    });

  return (
    <article className="px-4 lg:px-16 py-6 flex flex-col gap-6">
      {/* Header */}
      <header className="space-y-2 flex flex-col items-center justify-center py-12">
        <h1 className="text-[35px] font-bold">Product Catalog</h1>
        <p className="text-gray-600 text-[20px] text-center max-w-2xl">
          Discover our complete collection of premium products across all
          categories.
        </p>
      </header>

      <section className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 space-y-6 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto p-4 bg-white shadow rounded-lg hidden lg:block">
          <h2 className="text-xl font-bold my-6">Filter By Category</h2>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${
                selectedCategory === null ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </li>
            {(categories || []).map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer capitalize ${
                  selectedCategory === cat ? "font-bold text-[#A95F21]" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>

          {/* Price Range */}
          <div>
            <h2 className="text-xl font-bold mb-2">Price Range</h2>
            <div className="flex space-x-2 items-center">
              <input
                type="number"
                className="border rounded p-1 w-16"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
              />
              <span>-</span>
              <input
                type="number"
                className="border rounded p-1 w-16"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], +e.target.value])
                }
              />
            </div>
          </div>

          {/* Minimum Rating */}
          <div>
            <h2 className="text-xl font-bold mb-2">Minimum Rating</h2>
            <input
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(+e.target.value)}
              className="w-full"
            />
            <div>{minRating.toFixed(1)} Stars & Up</div>
          </div>
        </aside>
          {/* mobile filter */}
          <section>
          <div className="lg:hidden mb-4 w-2/3 md:w-1/3">
            <details className="bg-white p-4 rounded-lg shadow">
              <summary className="font-bold cursor-pointer">Filter By Category</summary>
              <div className="mt-4 space-y-4">
             <ul className="space-y-2">
            <li
              className={`cursor-pointer ${
                selectedCategory === null ? "font-bold" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </li>
            {(categories || []).map((cat) => (
              <li
                key={cat}
                className={`cursor-pointer capitalize ${
                  selectedCategory === cat ? "font-bold text-[#A95F21]" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
          </div>
          </details>
          </div>
          </section>
        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Sorting & Count */}
          <div className="lg:flex justify-between items-center mt-4 space-y-4 lg:space-y-0">
            <span className="text-gray-600">
              Showing {displayedProducts?.length || 0} of{" "}
              {filteredProducts?.length || 0} products
            </span>
            <div className="flex items-center space-x-12 mt-4 lg:mt-0">
              <label htmlFor="sort" className="text-gray-600 font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                className="border-none outline-none rounded p-1 w-40"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              <div className="flex items-center gap-2 border border-gray-300 py-1 px-2 rounded" arial-label="change product view" aria-colindex={2}>
                <Grid3X3
                  className="cursor-pointer hover:bg-[#A95F21] hover:text-gray-200 rounded-sm p-1 mr-2"
                  size={24}
                  aria-label="grid view"
                  role="button"
                  onClick={() => setIsGrigView(true)}
                />
                <List
                  className="cursor-pointer hover:bg-[#A95F21] hover:text-gray-200 rounded-sm p-1"
                  size={24}
                  aria-label="list view"

                   role="button"
                   onClick={() => setIsGrigView(false)}
                />
              </div>
            </div>
          </div>

          {/* Product Grid with Framer Motion */}
          {displayedProducts?.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 py-6 scroll-smooth">
             
              {displayedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {isGrigView ?
                  <ProductCardComponent {...product} />
                  : <ProductCardRowComponent {...product} />}
                </motion.div>
              ))}
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 space-y-4">
              <div className="flex items-center justify-center mb-4">
                <SearchBar />
              </div>
              <h2 className="text-3xl font-bold">🔍 No Results Found</h2>
              <p className="text-gray-600">
                We couldn&apos;t find any products matching{" "}
                <span className="text-gray-600 font-semibold">{keyword}</span>.
                Try different keywords or browse our categories.
              </p>
              <button
                onClick={() => dispatch(setKeyword(""))}
                className="mt-4 px-6 py-2 bg-[#F59D55] text-white rounded-lg hover:bg-[#A95F21] transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </main>
      </section>
    </article>
  );
};

export default CatalogPage;

// ✅ Server-side data fetching
export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const allProducts: ProductCard[] = await res.json();

  // Extract categories safely
  const categories = Array.from(
    new Set(allProducts.map((p) => p.categoryId).filter(Boolean))
  );

  return { props: { allProducts, categories } };
};