import { requestMagicLink } from "@/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginType } from "@/types/loginSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CustomCard from "../CustomCard";

export default function LoginForm() {
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: LoginType) => {
    try {
      await requestMagicLink(data.email);
    } catch (err: any) {
      setError("email", { type: "server", message: err });
    }
  };

  return (
    <div style={{ justifyContent: "center", display: "flex" }}>
      <CustomCard cardTitle="Login" className="w-full max-w-sm bg-neutral-100">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem style={{ marginBottom: "1rem" }}>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Login with your email" {...field} />
                  </FormControl>
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email.message}</p>
                  )}
                </FormItem>
              )}
            />
            {errors.root && (
              <div style={{ color: "red", marginBottom: "1rem" }}>
                {Object.values(errors.root).map((error) => error.toString())}
              </div>
            )}
            <Button
              type="submit"
              className="bg-teal-700 text-white hover:bg-teal-950"
            >
              Login
            </Button>
          </form>
        </Form>
      </CustomCard>
    </div>
  );
}
