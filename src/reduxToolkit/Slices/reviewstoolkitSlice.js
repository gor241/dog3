import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

const initialState= { 
    reviews:[],
    rating:2,
    text:'',
    isCheckModal:false,
    isLoading:false,
    error:null
}

  export const setAddReview = createAsyncThunk(
    'products/review',
    async (productId,{getState}) => {
      const state = getState()
      const {text,rating} = state.rewiews
      const data = await api.addReview(productId,text,rating);
      return data;
    }
  );


  export const delReview = createAsyncThunk(
    'products/delReview',
    async ({ productId, idReview }) => {
      const data = await api.delReview(productId,idReview);
      return data;
    }
  );

// создаём Slice это будет макетом редюсера со всем что нам нужно 
const reviewstoolkitSlice = createSlice({
    name:'rewiews', // имя любое 
    initialState,
    reducers:{ // сам редюсер , в более понятной форме
        setIsText(state,action){
            state.text = action.payload 
        },
        setIsRating(state,action){
            state.rating = action.payload 
        },
        setIsModal(state,action){
            state.isCheckModal = action.payload 
        },
        setError(state,action){
            state.error = action.payload 
        },
        setReviews(state,action){
          state.reviews = action.payload 
      },
      removeErrorMessage(state){
          state.error = null
      }
    },
    extraReducers: builder => {
        builder
          .addCase(setAddReview.pending, state => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(setAddReview.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews 
            state.isCheckModal = false;
            state.isLoading = false;
            state.error = null;
          })
          .addCase(setAddReview.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Ошибка сервера';
          })
          .addCase(delReview.pending, state => {
            state.isLoading = true;
            state.error = null;
          })
          .addCase(delReview.fulfilled, (state, action) => {
            state.reviews = action.payload.reviews 
            state.isLoading = false;
            state.error = null;
          })
          .addCase(delReview.rejected, (state) => {
            state.isLoading = false;
            state.error = 'Ошибка сервера';
          });
      },
})

export default reviewstoolkitSlice.reducer
export const {setIsText,setIsRating,setIsModal,setError,setReviews,removeErrorMessage} = reviewstoolkitSlice.actions
export const getText = (state) => state.rewiews.text;
export const getRating = (state) => state.rewiews.rating;
export const getCheckModal = (state) => state.rewiews.isCheckModal;
export const getReviews = (state) => state.rewiews.reviews;
export const getErrorMessage = (state) => state.rewiews.error;