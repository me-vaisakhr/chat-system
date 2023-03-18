import axios from "axios";

const instance = axios.create({
  baseURL: "https://ltz83ko0r6.execute-api.ap-south-1.amazonaws.com/default/",
  withCredentials: false,
  headers: {
    "x-api-key": "rhIi5jl7yd4lViSBxrUm580J9rYvgz4xabVF6Wme",
  },
});

export default instance;
