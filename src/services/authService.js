import AxiosInstance from "../lib/axios";

export const userLogin = ({ email, password }) => {
    return AxiosInstance.post(
        "/api/auth/login", 
        { email, password }
    );
};

export const userRegister = ({ fullName, email, password }) => {
    return AxiosInstance.post(
        "/api/auth/register", 
        { fullName, email, password }
    );
};

export const activateAccount = (code) => {
  return AxiosInstance.get("/api/auth/activation", {
    params: { code },
  });
};

export const loginWithGoogle = () => {
    window.location.href = `${AxiosInstance.defaults.baseURL}/api/auth/google/login`;
};

export const getUserProfile = () => {
    return AxiosInstance.get(
        "/api/auth/profile"
    );
};

export const updateUserProfile = ({ fullName, avatar }) => {
    const formData = new FormData();

    formData.append("fullName", fullName);

    if (avatar) {
        formData.append("avatar", avatar);
    }
    return AxiosInstance.patch(
        "/api/auth/profile", 
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};

export const updatePassword = ({ oldPassword, newPassword }) => {
    return AxiosInstance.patch(
        "/api/auth/password", 
        { oldPassword, newPassword }
    );
}

export const deleteUserProfileAvatar = () => {
    return AxiosInstance.delete(
        "/api/auth/profile/avatar"
    );
}

export const forgotPassword = ({ email }) => {
    return AxiosInstance.post(
        "/api/auth/forgot-password",
        { email }
    );
};

export const resetPassword = ({ token, newPassword }) => {
  return AxiosInstance.post(
    "/api/auth/reset-password",
    { newPassword },
    {
      params: { token }
    }
  );
};