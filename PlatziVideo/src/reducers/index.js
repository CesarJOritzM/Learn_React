const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FAVORITE":
      return {
        ...state,
        myList: [...state.myList, action.payLoad],
      };
    case "DELETE_FAVORITE":
      return {
        ...state,
        myList: state.myList.filter((items) => items.id !== action.payLoad),
      };
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: action.payLoad,
      };
    case "LOGOUT_REQUEST":
      return {
        ...state,
        user: action.payLoad,
      };
    case "REGISTER_REQUEST":
      return {
        ...state,
        user: action.payLoad,
      };
    case "GET_VIDEO_SOURCE":
      return {
        ...state,
        playing:
          [...state.trends, ...state.originals].find(
            (item) => item.id === Number(action.payload)
          ) || [],
      };
    case "SEARCH_REQUEST":
      return {
        ...state,
        search: action.payload,
        searchResults:
          [...state.trends, ...state.originals].filter((item) =>
            item.title.toLowerCase().includes(action.payload.toLowerCase())
          ) || [],
      };
    default:
      return state;
  }
};

export default reducer;
