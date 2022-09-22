import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../api/api-client";



const initialState = {
    isLoading: false,
    campaignsList: [],
}

export const AddCampaigns = createAsyncThunk('campaign/addCampaigns', async (campaigns, { getState }) => {

    const { campaignsList } = { ...getState().campaign };
    const usersData = await client('https://jsonplaceholder.typicode.com/users');
    const campaignsWithUserName = campaigns.map(campg => {
        const data = usersData.find(user => user.id === campg.userId);
        const userName = data ? data.name : "Unknown User"
        return { ...campg, userName }
    })

    return campaignsList.concat(campaignsWithUserName);
});

const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(AddCampaigns.pending, (state) => {
            state.isLoading = true;
        }).addCase(AddCampaigns.fulfilled, (state, action) => {
            state.isLoading = false;
            state.campaignsList = action.payload;
        })
    }

})

// export const {  } = campaignSlice.actions;

// export const selectCampaignList = state => state.campaign.campaignsList;

export default campaignSlice.reducer;