import { useEffect } from "react";

export default function useDropdownOutside(ref, setState) {

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (ref.current && !ref.current.contains(event.target)) {
        setState(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, [ref]);

}