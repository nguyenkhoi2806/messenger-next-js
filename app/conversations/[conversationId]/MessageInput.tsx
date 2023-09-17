"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  register: UseFormRegister<FieldValues>;
  id: string;
  required?: boolean;
  placholder?: string;
  type?: string;
  errors: FieldErrors;
}

const MessageInput = (props: MessageInputProps) => {
  const { register, id, required, placholder, type, errors } = props;
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placholder}
        className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
        {...register(id, { required })}
      />
    </div>
  );
};

export default MessageInput;
