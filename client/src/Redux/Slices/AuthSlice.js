import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiousInstance";


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    role: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {},
    loading: false,
    error: null,
    tournamentData: null,
    
};

export const register = createAsyncThunk(
    "/auth/signup", async (data, { rejectWithValue }) => {
        try {
            console.log("upper", data)

            const response = await axiosInstance.post("/api/auth/register", data);
            console.log(data)

            toast.success(response?.data?.message || "User created successfully!");
            return response.data;

        } catch (error) {
            const message = error?.response?.data?.message || "Failed to create user";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "/auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/api/auth/login", data);
            toast.success(res?.data?.message || "Login successful!");
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk(
    "/auth/logout",
    async () => {
        try {
            const res = await axiosInstance.post("");
            toast.success(res?.data?.message || "Logged out successfully!");
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Logout failed";
            toast.error(message);
            throw error;
        }
    }
);

export const createTournament = createAsyncThunk(
    "/auth/create", async (data, { rejectWithValue }) => {
        try {
            console.log("tournament form data", data)

            const response = await axiosInstance.post("/api/tournament/create", data);
            console.log(data)

            toast.success(response?.data?.message || "Tournament created successfully!");
            return response.data;

        } catch (error) {
            const message = error?.response?.data?.message || "Failed to create Tournament";
            toast.error(message);
            return rejectWithValue(message);
        }
    }
);

export const getTournament = createAsyncThunk(
    "tournament/getAllTournament",
    async (_, { rejectWithValue }) => {
        try {
            // First, show loading state
            toast.loading("Loading tournament");

            const response = await axiosInstance.get("/api/auth/Tournament");

            // Update toast to success
            toast.success("Tournament loaded successfully");

            console.log("API Response:", response.data);
            return response?.data?.tournament || [];
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getTeamList = createAsyncThunk(
    "list/getAllList",
    async (_, { rejectWithValue }) => {
        try {
            // First, show loading state
            toast.loading("Loading Team");

            const response = await axiosInstance.get("/api/auth/getList");

            // Update toast to success
            toast.success("Team loaded successfully");

            console.log("API Response:", response.data);
            return response?.data?.Team || [];
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const getPlayerList = createAsyncThunk(
    "list/getPlayerList",
    async (_, { rejectWithValue }) => {
        try { 
            toast.loading("Loading Player");

            const response = await axiosInstance.get("/api/auth/getPlayer");
            toast.success("Team loaded successfully");

            console.log("API Response:", response.data);
            return response?.data?.player || [];
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const user = action?.payload?.user;

                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("role", user?.role || "");

                state.isLoggedIn = true;
                state.data = user;
                state.role = user?.role || "";
            })

            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })


            .addCase(createTournament.pending, (state) => {
                state.loading = true;
            })
            .addCase(createTournament.fulfilled, (state, action) => {
                state.loading = false;
                state.tournamentData = action.payload;
            })
            .addCase(createTournament.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getTournament.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTournament.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(getTournament.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


            .addCase(getTeamList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTeamList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(getTeamList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(getPlayerList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPlayerList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.courses = action.payload;
            })
            .addCase(getPlayerList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });






    },
});

export default authSlice.reducer;
