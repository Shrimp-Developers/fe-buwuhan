import { useLocation } from "react-router-dom";

export default function usePageTitle() {

    const location = useLocation();
    const path = location.pathname.replace(/\/+$/, "");

    if (path === "/dashboard") 
        return "Ringkasan";

    if (path === "/dashboard/create" || path.startsWith("/dashboard/create/"))
        return "Tambah Data";

    if (path === "/dashboard/list" || path.startsWith("/dashboard/list/"))
        return "Lihat Semua Data";

    if (path === "/dashboard/settings" || path.startsWith("/dashboard/settings/"))
        return "Pengaturan";

    if (path === "/dashboard/edit" || path.startsWith("/dashboard/edit/"))
        return "Edit Data";

    return null;
}