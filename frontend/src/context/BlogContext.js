import { createContext, useReducer } from "react";

export const BlogContext = createContext();
export const BlogContextProvider = ({ children }) => {
  const blogReducer = (state, action) => {
    switch (action.type) {
      case "SET_BLOGS":
        return {
          blogs: action.payload,
        };
      case "CREATE_BLOG":
        return {
          blogs: [action.payload, ...state.blogs],
        };
      case "DELETE_BLOG":
        return {
          blogs: state.blogs.filter((w) => w._id !== action.payload._id),
        };
      case "UPDATE_BLOG":
        return {
          blogs: state.blogs.map((el) => {
            if (el._id === action.payload._id) {
              return action.payload;
            } else {
              return el;
            }
          }),
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(blogReducer, { blogs: null });
  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
