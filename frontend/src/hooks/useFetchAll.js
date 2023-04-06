import axios from "axios";
import { useQuery } from "react-query";
import { useAuthContext } from "./useAuthContext";
import { useBlogContext } from "./useBlogContext";

export default function useFetchAll(url, key) {
  const context = useAuthContext();
  const { dispatch } = useBlogContext();
  const fetchAllBlogs = () => {
    return axios.get(url, {
      headers: {
        Authorization: `Bearer ${context.state?.user?.token}`,
      },
    });
  };

  const {
    isLoading: loading,
    error,
    data,
  } = useQuery([key, "blogs"], fetchAllBlogs, {
    onSuccess: (data) => {
      // console.log(data.data);
      dispatch({ type: "SET_BLOGS", payload: data?.data });
    },
    enabled: !!context.state.user,
  });
  // useEffect(() => {
  // const fetchBlogs = async () => {
  //   if (!context.state.user) {
  //     return;
  //   }

  // const response = await fetch(url, {
  //   headers: {
  //     Authorization: `Bearer ${context.state.user.token}`,
  //   },
  // });
  // const data = await response.json();
  // if (response.ok) {
  //   dispatch({ type: "SET_BLOGS", payload: data });
  //   setLoading(false);
  // }
  // if (!response.ok) {
  //   setLoading(false);
  // setError("failed to get data");
  //     }
  //   };
  //   if (context.state.user) {
  //     fetchBlogs();
  //   }
  // }, [context.state.user, dispatch, url]);

  return {
    loading,
    error,
    data,
  };
}
