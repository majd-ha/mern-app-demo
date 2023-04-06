import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetchblog = (blogId) => {
  return axios.get(`/blogs/${blogId}`);
};
export const useSingleFetch = (blogId) => {
  const queryClient = useQueryClient();
  return useQuery(["single-blog", blogId], () => fetchblog(blogId), {
    initialData: () => {
      const singleBlog = queryClient
        .getQueryData(["all", "blogs"])
        ?.data?.find((el) => el._id === blogId);
      if (singleBlog) {
        return {
          data: singleBlog,
        };
      } else {
        return undefined;
      }
    },
  });
};
