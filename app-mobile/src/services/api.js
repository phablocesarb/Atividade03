// src/api.js
import axios from "axios";
import { Platform } from "react-native";

// IP da sua máquina na rede local
const LOCAL_IP = "192.168.100.5";

const baseURL =
  Platform.OS === "android"
    ? `http://${LOCAL_IP}:8095/pcontroller`
    : `http://localhost:8095/pcontroller`;

const api = axios.create({
  baseURL,
});

export default api;
