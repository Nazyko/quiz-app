import { createAsyncThunk, createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ICategory {
  id: number;
  name: string;
}

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("Токен не найден");
    }

    try {
      const response = await axios.get<ICategory[]>(`https://quizapi.io/api/v1/categories?apiKey=${token}`);
      console.log(response.data);
      
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Ошибка загрузки категорий");
    }
  }
);

type CategoryState = {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
};

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
