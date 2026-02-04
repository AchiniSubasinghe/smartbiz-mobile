 
 import API from "./api";

export const signIn = (email: string, password: string) => {
    return API.post("/signIn", {
        email,
        password,
    });
};

export const signUp = (data: {
    username: string;
    fullName: string;
    email: string;
    password: string;
}) => {
    return API.post("/signUp", data);
};