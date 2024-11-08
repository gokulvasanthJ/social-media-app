const initialState = {
    posts: [],
    loading: true,
  };
  
  export const postReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_POSTS':
        return { ...state, posts: action.payload, loading: false };
      case 'ADD_POST':
        return { ...state, posts: [action.payload, ...state.posts], loading: false };
      case 'UPDATE_POST':
        return {
          ...state,
          posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
          loading: false,
        };
      case 'DELETE_POST':
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== action.payload),
          loading: false,
        };
      default:
        return state;
    }
  };
  