import axios from "axios";

const buildClient = ({ req } = {}) => {
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseURL: "http://localhost:5000",
        withCredentials: true

    });
  }
};

export default buildClient;