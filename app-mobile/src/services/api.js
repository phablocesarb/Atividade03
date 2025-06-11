import axios from "axios";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.100.5";

const baseURL =
  Platform.OS === "android"
    ? `http://${LOCAL_IP}:8095`
    : `http://localhost:8095`;

const api = axios.create({
  baseURL: baseURL,
});

export default api;

