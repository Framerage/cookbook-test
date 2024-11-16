import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthToken} from "api/auths";

export const getSingUp = createAsyncThunk("SingUp", getAuthToken);
