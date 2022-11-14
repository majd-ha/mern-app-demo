import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useBlogContext } from "./useBlogContext";

export default function useFetchAll(url) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const context = useAuthContext();
  const { state, dispatch } = useBlogContext();
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!context.state.user) {
        return;
      }
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${context.state.user.token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_BLOGS", payload: data });
        setLoading(false);
      }
      if (!response.ok) {
        setLoading(false);
        setError("failed to get data");
      }
    };
    if (context.state.user) {
      fetchBlogs();
    }
  }, [context.state.user, dispatch, url]);

  return {
    loading,
    error,
    state,
  };
}
