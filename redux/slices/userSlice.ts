import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AppDispatch } from "@/redux/store";

export interface IUserState {
  user: null | any;
  token: string | null;
  role: "admin" | "guest" | "client";
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
  status: "active" | "inactive" | "block" | "unblock";
}

const initialState: IUserState = {
  user: null,
  token: Cookies.get("token") || null,
  isLoggedIn: Boolean(Cookies.get("token")),
  loading: false,
  error: null,
  role: "guest",
  status: "inactive",
};

// ✅ Async register action
export const registerUser = createAsyncThunk<
  any,
  { firstName: string; lastName: string; email: string; password: string },
  { dispatch: AppDispatch }
>("user/register", async (formData, thunkAPI) => {
  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Registration failed");

    const data = await res.json();

    // ✅ Save token consistently
    Cookies.set("token", data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const loginUser = createAsyncThunk<
  any,
  { email: string; password: string },
  { dispatch: AppDispatch }
>("user/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await res.json();
    console.log("Login response:", data, res.status);

    if (!res.ok) throw new Error(data.message || "Login failed");

    Cookies.set("token", data.token, { expires: 1 });
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    return data;
  } catch (err: any) {
    console.error("Login error:", err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 🔹 Restore state from storage
    loadUserFromStorage: (state) => {
      const token = Cookies.get("token") || localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        state.token = token;
        state.user = JSON.parse(user);
        state.isLoggedIn = true;
        state.role = JSON.parse(user).role || "client";
      }
    },

    // 🔹 Logout
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.role = "guest";
      Cookies.remove("token");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    // 🔹 Update user
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role || "client";
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.user.role || "client";
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { loadUserFromStorage, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;