// useBuwuhanExportData.js
import { useState } from "react";
import { exportDataBuwuhan } from "../../services/buwuhanService";

export default function useBuwuhanExportData() {
    const [isExporting, setIsExporting] = useState(false);

    const handleExportDataBuwuhan = async () => {
        if (isExporting) return; // cegah double click

        setIsExporting(true);
        try {
            await exportDataBuwuhan();
        } catch (error) {
            console.error("Gagal export:", error);
        } finally {
            setIsExporting(false);
        }
    };

    return { handleExportDataBuwuhan, isExporting };
}