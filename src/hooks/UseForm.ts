import { useState } from "react";

export const UseForm = (initialForm: any) => {
  const [form, setForm] = useState(initialForm);

  const handleInputChange = ({ target }: any) => {
    const { name, type, value, checked } = target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const reset = () => {
    setForm(initialForm);
  };

  return {
    form,
    setForm,
    handleInputChange,
    reset,
    ...form,
  };
};
