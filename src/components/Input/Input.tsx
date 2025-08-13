// Input.tsx
import React from 'react';

interface InputProps<T extends string | number> {
  setInput: React.Dispatch<React.SetStateAction<T>>;
  placeholder: string;
  type?: 'text' | 'number'; // optional, defaults to text
}

function Input<T extends string | number>({ setInput,placeholder,type = 'text',}: InputProps<T>) {


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: T;

    if (type === 'number') {
      value = Number(e.target.value) as T;
    } else {
      value = e.target.value as T;
    }

    setInput(value);
  };

  
  return (
    <div className="pt-2 w-full relative">
      <input
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        className="w-full border-2 border-gray-300 rounded-md p-3 pt-4 pb-2 
                   focus:outline-none peer"
        required
      />
      <label
        className="
          absolute left-2.5 top-0 bg-white px-1 text-sm text-gray-500
          peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
          peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500
          transition-all duration-200
        "
      >
        {placeholder}
      </label>
    </div>
  );
}

export default Input;
