import React, { useEffect, useState } from "react";

const useDebounce = (value, delay = 100) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const de = setTimeout(() => {
      setDebounceValue(value);

      return () => {
        clearTimeout(de);
      };
    }, delay);
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
