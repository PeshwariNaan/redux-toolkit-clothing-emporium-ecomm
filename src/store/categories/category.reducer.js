


//Because fetching the categories data is async - we are going to use thunk but now it's createAsyncTHunk
//We are adding the isLoading and error fields for setup
// const initialState = {
//   categories: [],
//   isLoading: false,
//   error: null,
// };




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
