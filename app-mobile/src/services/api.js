import axios from "axios";
import { Platform } from "react-native";

const LOCAL_IP = "192.168.100.3";

const baseURL =
  Platform.OS === "android"
    ? `http://${LOCAL_IP}:8095/pcontroller`
    : `http://localhost:8095/pcontroller`;

const api = axios.create({
  baseURL,
});

export default api;
