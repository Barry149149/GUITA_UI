import axios from "axios";

export default axios.create({
  baseURL: "https://en0ltfj1i55rko.x.pipedream.net",
  headers: {
    "Content-type": "application/json"
  }
});