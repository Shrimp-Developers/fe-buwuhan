import { useState, useEffect } from "react";
import { getUserProfile } from "../../services/authService";
import { getDataBuwuhanDashboard } from "../../services/buwuhanService";

export default function useBuwuhanDashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dataBuwuhan, setDataBuwuhan] = useState({
    totalData: 0,
    items: { paid: 0, unpaid: 0 },
    rice: { paid: 0, unpaid: 0 },
    money: { paid: 0, unpaid: 0 },
    other: { paid: 0, unpaid: 0 }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        const body = response.data;

        if (body?.data) {
          setUserProfile(body.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getDataBuwuhanDashboard();
        const DataBuwuhanDashboard = response.data?.data;

        if (!DataBuwuhanDashboard) {
          setError("Gagal mengambil data dashboard");
          return;
        }

        setDataBuwuhan({
          totalData: DataBuwuhanDashboard.totalData || 0,
          items: {
            paid: DataBuwuhanDashboard.items?.paid || 0,
            unpaid: DataBuwuhanDashboard.items?.unpaid || 0
          },
          rice: {
            paid: DataBuwuhanDashboard.rice?.paid || 0,
            unpaid: DataBuwuhanDashboard.rice?.unpaid || 0
          },
          money: {
            paid: DataBuwuhanDashboard.money?.paid || 0,
            unpaid: DataBuwuhanDashboard.money?.unpaid || 0
          },
          other: {
            paid: DataBuwuhanDashboard.other?.paid || 0,
            unpaid: DataBuwuhanDashboard.other?.unpaid || 0
          }
        });

      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setError("Terjadi kesalahan saat mengambil data dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const categories = [
    { title: "(Barang)", data: dataBuwuhan.items, bgColor: "bg-[#F9CD19]" },
    { title: "(Beras)", data: dataBuwuhan.rice, bgColor: "bg-[#FF8BE4]" },
    { title: "(Uang)", data: dataBuwuhan.money, bgColor: "bg-[#B0CE88]" },
    { title: "(Lainnya)", data: dataBuwuhan.other, bgColor: "bg-[#FFB167]" }
  ];

  return {
    userProfile,
    loading,
    error,
    dataBuwuhan,
    categories
  };
}