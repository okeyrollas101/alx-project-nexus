import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCard } from "@/interfaces";

interface SearchState {
  keyword: string;
  filteredProducts: ProductCard[];
  allProducts: ProductCard[];
}

const initialState: SearchState = {
  keyword: "",
  filteredProducts: [],
  allProducts: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setAllProducts(state, action: PayloadAction<ProductCard[]>) {
      state.allProducts = action.payload;
      state.filteredProducts = [...action.payload];
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
      const keyword = state.keyword.toLowerCase();
      state.filteredProducts = state.allProducts.filter((p) =>
        p.name.toLowerCase().includes(keyword)
      );
    },
    filterProducts(state, action: PayloadAction<ProductCard[] | undefined>) {
      const allProducts = action.payload || state.allProducts;
      if (!allProducts) {
        state.filteredProducts = [];
        return;
      }

      if (!state.keyword.trim()) {
        state.filteredProducts = allProducts.map((p) => ({ ...p }));
      } else {
        state.filteredProducts = allProducts.filter((p) =>
          p.name.toLowerCase().includes(state.keyword.toLowerCase())
        );
      }
    },
  },
});

export const { setAllProducts, setKeyword, filterProducts } = searchSlice.actions;
export default searchSlice.reducer;