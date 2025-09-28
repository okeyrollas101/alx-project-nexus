// pages/product/category/[categoryId].tsx
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { IProduct } from "@/models/Product";

interface CategoryProductPageProps {
  initialProducts: IProduct[];
  initialCategoryName: string;
}

const CategoryProductPage: React.FC<CategoryProductPageProps> = ({
  initialProducts,
  initialCategoryName,
}) => {
  const router = useRouter();
  const { categoryId } = router.query;

  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [categoryName, setCategoryName] = useState(initialCategoryName);
  const [loading, setLoading] = useState(false);

  // ✅ Refetch products if categoryId changes (client-side navigation)
  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    fetch(`/api/products?category=${categoryId}`)
      .then((res) => res.json() as Promise<IProduct[]>)
      .then((data) => {
        setProducts(data);
        setCategoryName(categoryId as string);
      })
      .catch((err) => console.error("Error fetching category products:", err))
      .finally(() => setLoading(false));
  }, [categoryId]);

  return (
    <article className="min-h-screen px-6 py-10 bg-white">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          {categoryName || "Products"}
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Browse our selection of {categoryName?.toLowerCase() || "products"}.
        </p>
      </header>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found in this category.
            </p>
          )}
        </section>
      )}
    </article>
  );
};

export default CategoryProductPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { categoryId } = context.params as { categoryId: string };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${categoryId}`
    );
    const data: IProduct[] = await res.json();

    return {
      props: {
        initialProducts: data || [],
        initialCategoryName: categoryId,
      },
    };
  } catch (error) {
    console.error("SSR fetch error:", error);
    return {
      props: { initialProducts: [], initialCategoryName: "" },
    };
  }
};