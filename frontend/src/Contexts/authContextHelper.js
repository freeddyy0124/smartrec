import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
    authenticated: false,
    signup: () => {},
    setUser: () => {}
});