import axios from "axios";

export const RESASClient = axios.create({
  baseURL: "	https://opendata.resas-portal.go.jp",
  timeout: 1000,
  headers: {
    "X-API-KEY": process.env.RESAS_API_KEY || "DEFAULT_KEY",
  },
});
