import AxiosInstance from "../lib/axios";

export const createBuwuhan = ({
  nameMan,
  nameWoman,
  categoryId,
  gift,
  status,
  address,
  information,
}) => {
  return AxiosInstance.post("/api/buwuhan", {
    nameMan,
    nameWoman,
    categoryId,
    gift,
    status,
    address,
    information,
  });
};

const URLSearchParams = (query) =>
  Object.fromEntries(
    Object.entries(query).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    }),
  );

export const getListBuwuhan = (query) => {
  return AxiosInstance.get("/api/buwuhan", { params: URLSearchParams(query) });
};

export const getDataBuwuhanDashboard = () => {
  return AxiosInstance.get("/api/buwuhan/dashboard");
};

export const getDetailBuwuhan = (buwuhanId) => {
  return AxiosInstance.get(`/api/buwuhan/${buwuhanId}`);
};

export const updateDataBuwuhan = (
  buwuhanId,
  { nameMan, nameWoman, categoryId, gift, status, address, information },
) => {
  return AxiosInstance.patch(`/api/buwuhan/${buwuhanId}`, {
    buwuhanId,
    nameMan,
    nameWoman,
    categoryId,
    gift,
    status,
    address,
    information,
  });
};

export const deleteBuwuhan = (buwuhanId) => {
  return AxiosInstance.delete(`/api/buwuhan/${buwuhanId}`);
};

export const exportDataBuwuhan = async () => {
  const response = await AxiosInstance.get("/api/buwuhan/export/download", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "data-buwuhan.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
