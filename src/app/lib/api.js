import React from "react";
import axios from "axios";
import { API_ENDPOINT, API_TOKEN } from "./config";

export const axiosGet= axios.create(
    {
        baseURL:API_ENDPOINT,
        headers:
        {
            "Authorization":`${API_TOKEN}`
        }
    }
)

export const axiosPost= axios.create(
    {
        baseURL:API_ENDPOINT,
        headers:
        {
            "Authorization":`${API_TOKEN}`
        }
    }
)