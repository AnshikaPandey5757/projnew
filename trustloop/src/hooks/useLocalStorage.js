import {
  useState,
  useEffect,
} from "react";

const useLocalStorage = (
  key,
  initialValue
) => {
  const readValue = () => {
    try {
      const stored =
        window.localStorage.getItem(key);

      return stored
        ? JSON.parse(stored)
        : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [value, setValue] =
    useState(readValue);

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;