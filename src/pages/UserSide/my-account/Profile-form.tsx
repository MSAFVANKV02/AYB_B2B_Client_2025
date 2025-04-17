import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hook";

// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  shopName: z.string().nonempty("Shop name is required."),
  email: z.string().email("Enter a valid email address."),
  mobileNumber: z
    .string()
    .length(10, "Mobile number must be 10 digits.")
    .regex(/^\d+$/, "Mobile number must contain only numbers."),
});

type FormData = z.infer<typeof formSchema>;

const PersonalInformationForm: React.FC = () => {

  const {user} = useAppSelector((state)=> state.auth);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shopName: "",
      email: "",
      mobileNumber: "",
    },
  });

  const [updatePersonalData, setUpPersonalData] = useState(false);

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        shopName: user.shopName || "",
        email: user.email || "", // Make sure your user object has email
        mobileNumber: user.mobile || "",
      });
    }
  }, [user, form]);

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full md:max-w-md "
      >
        {/* <h2 className="text-lg font-medium">Personal information</h2> */}

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <FormControl>
                <input
                  type="text"
                  placeholder="Name"
                  {...field}
                  readOnly={!updatePersonalData}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm
                   active:right-0 active:outline-none  focus:ring-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Shop Name Field */}
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <label className="block mb-1 text-sm font-medium">
                Shop name
              </label>
              <FormControl>
                <input
                  type="text"
                  placeholder="Shop name"
                  {...field}
                  readOnly={!updatePersonalData}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm
                   active:right-0 active:outline-none  focus:ring-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <FormControl>
                <input
                  type="email"
                  placeholder="Email"
                  {...field}
                  readOnly={!updatePersonalData}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm
                   active:right-0 active:outline-none  focus:ring-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number Field */}
        <FormField
          control={form.control}
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <label className="block mb-1 text-sm font-medium">
                Mobile number
              </label>
              <FormControl>
                <input
                  type="text"
                  placeholder="Mobile number"
                  {...field}
                  readOnly={!updatePersonalData}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-sm
                   active:right-0 active:outline-none  focus:ring-1"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex">
          {!updatePersonalData ? (
            <span
              className="underline cursor-pointer ml-auto text-sm"
              onClick={() => setUpPersonalData(true)}
            >
              Update personal details
            </span>
          ) : (
            <div className="flex gap-3 ml-auto">
              <Button
                type="button"
                className=""
                variant={"outline"}
                onClick={() => {
                  // form.reset();
                  setUpPersonalData(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" className=" ml-auto" variant={"b2bStyle"}>
                Update
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default PersonalInformationForm;
