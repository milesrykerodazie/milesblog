import { apiSlice } from '../../app/api/apiSlice';
import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const repliesAdapter = createEntityAdapter({});
const initialState = repliesAdapter.getInitialState();

export const replyApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({}),
});
