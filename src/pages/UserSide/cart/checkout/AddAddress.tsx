import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Checkbox } from "@mui/material";
// Define Zod schema for address form validation
const formSchema = z.object({
  country: z.string().nonempty({ message: "Country/Region is required." }),
  name: z.string().nonempty({ message: "Name is required." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  street: z
    .string()
    .nonempty({ message: "Street address is required." }),
  apartment: z.string().optional(),
  state: z.string().nonempty({ message: "State is required." }),
  city: z.string().nonempty({ message: "City is required." }),
  pinCode: z.string().nonempty({ message: "Postal code is required." }),
});

interface FormData {
  country: string;
  name: string;
  phone: string;
  street: string;
  apartment?: string;
  state: string;
  city: string;
  pinCode: string;
  isDefault: boolean;
}

type Props = {
  addAddress: boolean;
};

function AddressForm({ addAddress }: Props) {
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      name: "",
      phone: "",
      street: "",
      apartment: "",
      state: "",
      city: "",
      pinCode: "",
      isDefault: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log(data);
    
    // Perform form submission logic here
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between  h-full"
      >
        {/* ======= */}

        <div className="space-y-3">
          {addAddress && <span className=" text-xl">Add Address</span>}
          <p className="text-gray-500">
            {" "}
            <LockOutlinedIcon
              sx={{
                fontSize: "1rem",
              }}
              fontSize="small"
            />{" "}
            Your personal information is encrypted and will only be used for
            delivery purposes.
          </p>
          {/* ========== */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Country/Region</FormLabel> */}
                <FormControl>
                  <input
                    type="text"
                    placeholder="Country/Region"
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  {/* <FormLabel>First name and Last name</FormLabel> */}
                  <FormControl>
                    <input
                      type="text"
                      placeholder="First name and Last name"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  {/* <FormLabel>Phone number</FormLabel> */}
                  <FormControl>
                    <input
                      type="number"
                      placeholder="Phone number"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Street address</FormLabel> */}
                <FormControl>
                  <input
                    type="text"
                    placeholder="Street address"
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="apartment"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Apartment, suit, unit, building, floor</FormLabel> */}
                <FormControl>
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, building, floor"
                    {...field}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex md:flex-row flex-col gap-3">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="md:w-1/3">
                  {/* <FormLabel>State</FormLabel> */}
                  <FormControl>
                    <input
                      type="text"
                      placeholder="State"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="md:w-1/3">
                  {/* <FormLabel>City</FormLabel> */}
                  <FormControl>
                    <input
                      type="text"
                      placeholder="City"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem className="md:w-1/3">
                  {/* <FormLabel>Postal code</FormLabel> */}
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Postal code"
                      {...field}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* === */}
           
          </div>
           <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="">
                  {/* <FormLabel>Set as default shipping address</FormLabel> */}
                  <FormControl>
                    <Checkbox
                      {...field}
                      className=" border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </FormControl>
                  <FormLabel className="sm:text-sm text-xs">Set as default shipping address</FormLabel>

                  <FormMessage />
                </FormItem>
              )}
            />
        </div>

        <div className="">
          {addAddress ? (
            <div className="h-full w-full flex justify-end gap-4">
              <Button
                type="submit"
                disabled={loading}
                variant={"outline"}
                className="md:w-[150px] w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                variant={"b2bStyle"}
                className="md:w-[200px] w-full"
              >
                {loading ? "Submitting..." : "Save Address"}
              </Button>
            </div>
          ) : (
            <Button type="submit" disabled={loading} className="">
              {loading ? "Submitting..." : "Save Address"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default AddressForm;
