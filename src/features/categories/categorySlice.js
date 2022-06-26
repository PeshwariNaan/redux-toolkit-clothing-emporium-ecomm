import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
//import { createSelector } from '@reduxjs/toolkit';
import { createSelector } from "reselect";

//Because fetching the categories data is async - we are going to use thunk
//We are adding the isLoading and error fields for setup - not sure if the error is necessarry with rtk?
export const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategoriesStartAsync = createAsyncThunk(
  'category/getCategoryItems',
  async (_, thunkAPI) => {
    try {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      console.log(categoriesArray)
      return categoriesArray
    } catch (error) {
      return thunkAPI.rejectWithValue('category/getCategoryItems async call - Something went wrong');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  extraReducers: {
    [fetchCategoriesStartAsync.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchCategoriesStartAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    },
    [fetchCategoriesStartAsync.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
  },
});

//Now we create a memoized selector for this slice of data. As long as nothing changes in the categories state then nothing will rerun
export const selectCategories = createSelector((state) => state.category.categories)

// Now this is memoized - as long as the categories array does not change then don't rerun - this will optimize the app
export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('Categories selector fired')
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
  }
);

export const selectCategoriesisLoading = createSelector((state) => state.category.isLoading)

export default categoriesSlice.reducer;

// export const fetchCategoriesStartAsync = () => {
//   return async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//       const categoriesArray = await getCategoriesAndDocuments('categories');
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailure(error));
//     }
//   };
// };

// Now using FETCH_CATEGORIES_SUCCESS instead of SET_CATEGORIES
// export const categoriesReducer = (
//   state = CATEGORIES_INITIAL_STATE,
//   action = {}
// ) => {
//   const { type, payload } = action;

//   switch (type) {
//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
//       return { ...state, isLoading: true };

//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         categories: payload,
//         isLoading: false
//       };

//     case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAIL:
//       return { ...state, error: payload, isLoading: false };
//     default:
//       return state;
//   }
// };
