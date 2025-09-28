import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "@/models/Product";
import { ProductCard } from "@/interfaces";

interface ProductState {
  products: (ProductCard & { _id: string; id: string })[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch(`/api/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return (await res.json()) as (IProduct & { _id: string })[];
  }
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId: string) => {
    const res = await fetch(
      `/api/products?category=${categoryId}`
    );
    if (!res.ok) throw new Error("Failed to fetch category products");
    return (await res.json()) as (IProduct & { _id: string })[];
  }
);

// Create product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData: FormData) => {
    const res = await fetch(`/api/products`, {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to create product");
    return (await res.json()) as IProduct & { _id: string };
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ _id, formData }: { _id: string; formData: FormData }) => {
    const res = await fetch(
      `/api/products/product/${_id}`,
      { method: "PUT", body: formData }
    );
    if (!res.ok) throw new Error("Failed to update product");
    return (await res.json()) as IProduct & { _id: string };
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (_id: string) => {
    const res = await fetch(
      `/api/products/product/${_id}`,
      { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Failed to delete product");
    return _id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<(IProduct & { _id: string })[]>) => {
          state.loading = false;
          state.products = action.payload.map((product) => ({
            ...product,
            _id: product._id,
            id: product._id, // both available
          }));
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // Fetch by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProductsByCategory.fulfilled,
        (state, action: PayloadAction<(IProduct & { _id: string })[]>) => {
          state.loading = false;
          state.products = action.payload.map((product) => ({
            ...product,
            _id: product._id,
            id: product.id || product._id,
          }));
        }
      )
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<IProduct & { _id: string }>) => {
          state.loading = false;
          state.products.push({
            ...action.payload,
            _id: action.payload._id,
            id: action.payload.id || action.payload._id,
          });
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<IProduct & { _id: string }>) => {
          state.loading = false;
          const index = state.products.findIndex(
            (p) => p._id === action.payload._id || p.id === action.payload.id
          );
          if (index !== -1) {
            state.products[index] = {
              ...action.payload,
              _id: action.payload._id,
              id:  action.payload._id,
            };
          }
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) =>  p._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  },
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;