import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useSearch() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [searchValue, setSearchValue] = useState(
        searchParams.get("search") || ""
    );

    useEffect(() => {
        setSearchValue(searchParams.get("search") || "");
    }, [searchParams]);

    const handleSearch = (e) => {
        if (e.key === "Enter") {

            const query = searchValue.trim();

            if (query) {
                navigate(`/buwuhan/list?search=${encodeURIComponent(query)}`);
            } else {
                navigate("/buwuhan/list");
            }
        }
    };

    return {
        searchValue,
        setSearchValue,
        handleSearch
    };
}