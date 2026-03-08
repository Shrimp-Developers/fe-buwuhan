import { useLocation } from "react-router-dom";

export default function usePageTitle() {

    const location = useLocation();
    const path = location.pathname.replace(/\/+$/, "");

    if (path === "/dashboard") return "Dashboard";

    if (path === "/dashboard/create" || path.startsWith("/dashboard/create/"))
        return "Tambah Data";

    if (path === "/dashboard/list" || path.startsWith("/dashboard/list/"))
        return "Lihat Semua Data";

    if (path === "/dashboard/settings" || path.startsWith("/dashboard/settings/"))
        return "Pengaturan";

    return null;
}