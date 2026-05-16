import axiosClient from "../axsiosClient";

interface getUserData {
    userName: string;
    email: string;
    country: string;
    groups: [number];
    pageSize: number;
    pageNumber: number;

}
interface createUserData {
    userName: string;
    email: string;
    country: string;
    pageNumber: number;
    profileImage: File | null;
    password : string;
    confirmPassword : string;

}
interface UserId {
    id: number;
}

export const getUsers = (userData: getUserData) => {
    return axiosClient.get("/Users", {
        params: {
            userName: userData.userName,
            pageNumber: userData.pageNumber,
            pageSize: userData.pageSize,
        },
    });
};
export const getUsersById = (id: UserId) => {
    return axiosClient.get(`/Users/${id}`);
};

export const createUsers = (data: createUserData) => {
    return axiosClient.post("/Users", data);
};

export const getCurrentUser = () => {
    return axiosClient.get("/Users/currentUser");
}