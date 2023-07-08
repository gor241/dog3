import { configureStore } from "@reduxjs/toolkit";
import registrationkitSlice from "./Slices/registrationkitSlice";
import reviewstoolkitSlice from "./Slices/reviewstoolkitSlice";

export const store = configureStore({
  reducer: {
    registration: registrationkitSlice, // здесь можем добавлять несколько разных редюсеров
    rewiews: reviewstoolkitSlice
  },
});
