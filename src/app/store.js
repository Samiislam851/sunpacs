import { configureStore } from "@reduxjs/toolkit";
import userMongoSlice from "../features/userMongoSlice/userMongoSlice";

const store = configureStore({
    reducer: {
        mongodbUserReducer: userMongoSlice
    }
})
export default store