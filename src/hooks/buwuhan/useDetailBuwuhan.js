import { useState, useEffect } from "react";
import { getDetailBuwuhan } from "../../services/buwuhanService";

export const useDetailBuwuhan = (buwuhanId, isOpen) => {
  const [isLoading, setIsLoading] = useState(false);
  const [buwuhanData, setBuwuhanData] = useState(null);

  useEffect(() => {
    if (!buwuhanId || !isOpen) return;

    const fetchDetailBuwuhan = async () => {
      setIsLoading(true);

      try {
        const response = await getDetailBuwuhan(buwuhanId);
        const data = response.data;

        setBuwuhanData({
          nameMan: data.data.nameMan,
          nameWoman: data.data.nameWoman,
          category: data.data.categoryId,
          gift: data.data.gift,
          address: data.data.address,
          information: data.data.information || "-",
          status: data.data.status,
        });
      } catch (error) {
        console.error("Error fetching buwuhan detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailBuwuhan();
  }, [buwuhanId, isOpen]);

  return { buwuhanData, isLoading };
};
