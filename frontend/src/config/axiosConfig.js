import axios from "axios";

const SahilAxios = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  timeout: 5000,
});

export default SahilAxios;
