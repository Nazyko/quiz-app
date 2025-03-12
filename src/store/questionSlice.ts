import { createAsyncThunk, createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { IQuestion } from "../types/type";

export const getQuestions = createAsyncThunk(
  "question/getQuestions",
  async ({apiKey, limit, category, difficulty }: {apiKey:string, limit: number, category: string; difficulty: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${limit}&category=${category}&difficulty=${difficulty}`,
      );
      return response.data;
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return rejectWithValue("Ошибка загрузки вопросов");
    }
  }
);

type QuestionState = {
  questions: IQuestion[];
  loading: boolean;
  error: string | null;
};

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action: PayloadAction<IQuestion[]>) => {
        state.questions = action.payload;
        console.log(action.payload);
        
        state.loading = false;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default questionSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
