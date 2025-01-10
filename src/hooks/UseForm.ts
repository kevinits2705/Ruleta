import { useState } from "react";

export const UseForm = (initialForm: any) => {
  const [form, setForm] = useState(initialForm);
  const handleInputChange = ({ target }: any) => {
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
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
  };
};
