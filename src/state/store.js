import { configureStore } from '@reduxjs/toolkit';
import campaignReducer from './campaignSlice';


const store = configureStore({
    reducer: {
        campaign: campaignReducer
    }
})


export default store