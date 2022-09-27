import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const authSlice = createSlice({
   name: 'auth',
   initialState: { token: null },
   reducers: {
      setCredentials: (state, action) => {
         const { accessToken } = action.payload;
         state.token = accessToken;
      },
      logOutUser: (state) => {
         state.token = null;
      },
   },
});

export const { setCredentials, logOutUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
