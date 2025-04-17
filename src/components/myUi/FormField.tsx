import { ErrorMessage, Field } from "formik";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type FormFieldGenalProps = {
  // children: React.ReactNode;
  className?: string;
  value: string | number | boolean | undefined;
  title?: string; // Label for the field
  id: string;
  name: string;
  placeholder?: string;
  fieldAs?: React.ElementType;
  fieldClassName?: string;
  type?: string;
  classnamewrapper?: string; // Additional class for the field
  readonly?: boolean;
};

export function FormField({
  className,
  value,
  title,
  id,
  name,
  placeholder,
  fieldAs,
  fieldClassName,
  type = "text", // default type is text
  classnamewrapper,
  readonly,
}: FormFieldGenalProps) {
  return (
    <div
      className={cn(
        "flex lg:flex-row flex-col gap-2 lg:items-center justify-between",
        className
      )}
    >
      {title && (
        <Label htmlFor={name} className="text-textGray">
          {title}
        </Label>
      )}

      <div
        className={cn(`flex flex-col gap-2 w-full lg:w-3/4`, classnamewrapper)}
      >
        <Field
          id={id}
          name={name}
           min="0"
          placeholder={placeholder}
          className={cn(
            `w-full p-6 ${
              readonly && "bg-gray-100 border-none outline-none focus:ring-0"
            }`,
            fieldClassName
          )}
          type={type}
          as={fieldAs}
          value={value} // Bind field value to Formik
          readOnly={readonly} // Make the field read-only if specified
        />
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-500 text-xs"
        />
      </div>
    </div>
  );
}
