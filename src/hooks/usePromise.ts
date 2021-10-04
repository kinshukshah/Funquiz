import React, { useState } from "react";

export const usePromise = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  
  return {
    loading,
    setLoading,
    error,
  };
};
