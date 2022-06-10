import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit/dist/createAsyncThunk';

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default userSlice.reducer;
