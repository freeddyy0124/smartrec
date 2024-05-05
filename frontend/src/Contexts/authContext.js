import { useEffect, useState, useMemo } from "react";
import { AuthContext } from "./authContextHelper";
import buildClient from "../api/build-client";

export const AuthProvider = ({ children }) => {
    const client = buildClient();

    const [user, setUser] = useState(null);

    const isAuthenticated = () => {
        return user && Object.keys(user).length > 0;
    }

    const fetchUser = async () => {
        try {
            const res = await client.get("/api/users/currentuser", { withCredentials: true });
            setUser(res?.data?.currentUser);
        } catch (err) {
            console.log(err);
            setUser(null); // Consider setting user to null if the fetch fails
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await client.post("/api/users/signin", {
            email,
            password,
        });
        setUser(data.currentUser);
        return data;
    };

    const logout = async () => {
        await client.post("/api/users/signout");
        setUser(null);
    };

    const signup = async (email, password) => {
        const res = await client.post("/api/users/signup", {
            email,
            password
        });
        setUser(res?.data?.currentUser);
        return res?.data;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated, setUser, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};