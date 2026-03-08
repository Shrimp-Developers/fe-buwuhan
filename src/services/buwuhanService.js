import AxiosInstance from "../lib/axios";

export const createBuwuhan = ({ nameMan, nameWoman, categoryId, gift, status, address, information }) => {
    return AxiosInstance.post(
        "/api/buwuhan",
        { nameMan, nameWoman, categoryId, gift, status, address, information }
    );
};

export const getListBuwuhan = ({ name, category, status, total, page, limit, size }) => {
    return AxiosInstance.get(
        "/api/buwuhan",
        { params: { name, category, status, total, page, limit, size } }
    );
};

export const getDataBuwuhanDashboard = () => {
    return AxiosInstance.get(
        "/api/buwuhan/dashboard"
    );
};

export const getDetailBuwuhan = (buwuhanId) => {
    return AxiosInstance.get(
        `/api/buwuhan/${buwuhanId}`
    );
};

export const updateDataBuwuhan = ({ buwuhanId, nameMan, nameWoman, categoryId, gift, status, address, information }) => {
    return AxiosInstance.patch(
        "/api/buwuhan",
        { buwuhanId, nameMan, nameWoman, categoryId, gift, status, address, information },
        { params: { buwuhanId } }
    );
};

export const deleteBuwuhan = (buwuhanId) => {
  return AxiosInstance.delete(`/api/buwuhan/${buwuhanId}`);
};