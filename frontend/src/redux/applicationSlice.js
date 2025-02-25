import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        applicants: null,
        getStatus:""
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload;
        },
        setGetStatus: (state,action)=>{
            state.getStatus=action.payload
        }
    }
});

export const { setAllApplicants,setGetStatus } = applicationSlice.actions;
export default applicationSlice.reducer;
