import axiosInstance from "../api";

export const userSignup = async (formData) => {
    try {
        const response = await axiosInstance.post("/signup", formData);
        return response;
    } catch (error) {}
};
export const resendOtp = async (id) => {
    try {
        const response = await axiosInstance.post("/otp/resend", { id: id });

        return response;
    } catch (error) {
        console.log(error.message)
    }
};
export const submitOtp = async (id,otp) => {
    try {
        
        const response = await axiosInstance.post("/otp/submit", { id: id,otp:otp });

        return response;
    } catch (error) {
        console.log(error.message)
    }
};
export const loginUser = async (formData) => {
    try {
         
    const response = await axiosInstance.post("/login",formData)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const logoutUser = async () => {
    try {
         
    const response = await axiosInstance.get("/logout")
    return response
    } catch (error) {
        console.log(error.message)
    }
};


export const getProfile = async () => {
    try {
         
    const response = await axiosInstance.get("/profile")
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const updateUserProfile = async (formData) => {
    try {
         
    const response = await axiosInstance.patch("/profile",formData)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const updateInterests = async (article) => {
    try {
         
    const response = await axiosInstance.patch("/interests",article)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const changeUserPassword = async (passwordData) => {
    try {
         
    const response = await axiosInstance.patch("/password",passwordData)
    return response
    } catch (error) {
        console.log(error.message)
    }
};

export const uploadUserArticle = async (formData) => {
    try {
         
    const response = await axiosInstance.post("/article",formData)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const getArticles = async () => {
    try {
         
    const response = await axiosInstance.get("/article")
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const deleteUserArticle = async (articleId) => {
    try {
         console.log(articleId)
    const response = await axiosInstance.delete(`/article?articleId=${articleId}`)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const getAllArticles = async (articleId) => {
    try {
     
    const response = await axiosInstance.get(`/articles`)
    return response
    } catch (error) {
        console.log(error.message)
    }
};

export const like = async (articleId) => {
    try {
     
    const response = await axiosInstance.get(`/article/like?id=${articleId}`)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const unlike = async (articleId) => {
    try {
     
    const response = await axiosInstance.get(`/article/unlike?id=${articleId}`)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
export const blockUserArticle = async (articleId) => {
    try {
     
    const response = await axiosInstance.get(`/article/block?id=${articleId}`)
    return response
    } catch (error) {
        console.log(error.message)
    }
};
