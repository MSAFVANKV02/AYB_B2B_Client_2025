"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  { useState } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "@/components/ui/textarea";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
  type?: "text" | "email" | "password" | "number" | "hidden" | "file";
  inputType: "select" | "input" | "textarea" | "otp" | "hidden" | "file";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  value?: string;
  showError?: boolean;
  setValue?: any;

  watch?: any;

  control?: Control<any>;
  accept?: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
};

const FormGenerator = ({
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  type,
  lines,
  setValue,
  watch,
  value,
  showError = true,
  accept,
}: Props) => {
  // console.log(value, "value");
  const [file, setFile] = useState<File | null>(null);

  const { onChange, onBlur, ref } = register(name);

  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-2 text-[#595858]"
          htmlFor={`input-${label}`}
        >
          {!errors[name]
            ? label
            : showError && (
                <ErrorMessage
                  errors={errors}
                  name={name}
                  render={({ message }) => (
                    <p className="text-red-400 text-xs">
                      {message !== "Required" ? message : ""}
                    </p>
                  )}
                />
              )}

          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className="rounded-md bg-gray-100 focus:outline-none border-themeGray text-themeTextGray p-5 "
            {...register(name)}
          />
          {/* {showError && <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 text-xs">
                {message === "Required" ? "" : message}
              </p>
            )}
          />} */}
        </Label>
      );
    case "select":
      return (
        <Label
          htmlFor={`select-${label}`}
          className="flex flex-col gap-2 text-[#595858] "
        >
          {label && label}
          <select
            // defaultValue={options.?[0]}
            id={`select-${label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            // {...register(name)}
            {...register(name, { required: "Role is required" })}
          >
            <option value="" disabled>
              Select your role
            </option>
            {options?.length &&
              options.map((option) => (
                <option
                  value={option.value}
                  key={option.id}
                  className="dark:bg-muted"
                >
                  {option.label}
                </option>
              ))}
          </select>
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );

    case "textarea":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`input-${label}`}>
          {label && label}
          <Textarea
            className="bg-transparent border-themeGray text-themeTextGray"
            id={`input-${label}`}
            placeholder={placeholder}
            rows={lines}
            {...register(name)}
          />
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );

    case "otp":
      return (
        <Label className="flex flex-col gap-2" htmlFor={`otp-${label}`}>
          {label && label}

          <InputOTP
            maxLength={6}
            // type={type}
            id={`input-${label}`}
            value={watch(name)} // Reflect the current value of the OTP field
            onChange={(value) => {
              if (!/^\d*$/.test(value)) return;
              setValue(name, value); // Update the form state
              onChange({ target: { value } }); // Trigger react-hook-form's onChange
            }}
            onBlur={onBlur}
            ref={ref}
          >
            <InputOTPGroup className="space-x-2">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="border text-center text-xl rounded-xl bg-white border-gray-300"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );
    case "hidden":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9D9D9D]"
          htmlFor={`input-${label}`}
        >
          {/* {label && label} */}
          {/* {value&&value} */}
          <Input
            id={`input-${label}`}
            value={value} // Ensure controlled input
            type="hidden"
            {...register(name)}
          />
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" ? "" : message}
                </p>
              )}
            />
          )}
        </Label>
      );
    case "file":
      return (
        <Label
          htmlFor={`input-${label}`}
          className="h-[35px] rounded-lg text-xs cursor-pointer text-gray-400 items-center justify-center flex flex-col w-full border border-dashed bg-gray-50"
        >
          {file ? (
            <div className="text-sm text-gray-400">{file.name}</div>
          ) : (
            <div className="text-sm text-gray-400">{label && label}</div>
          )}

          <input
            id={`input-${label}`}
            accept={accept}
            type="file"
            className="hidden"
            // {...register(name)}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                // console.log(e.target.files,'e.target.files');
                setFile(e.target.files[0]); // Set file state

                setValue(name, e.target.files[0]); // Manually set file
              }
            }}
          />
          {showError && (
            <ErrorMessage
              errors={errors}
              name={name}
              render={({ message }) => (
                <p className="text-red-400 mt-2">
                  {message === "Required" && "File is required"}
                </p>
              )}
            />
          )}
        </Label>
      );

    default:
      break;
  }
};

export default FormGenerator;
