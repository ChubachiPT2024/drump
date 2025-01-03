import { z } from "zod";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userCreate } from "@/presentation/hooks/api/userCreate";

import { Button } from "@/presentation/shadcnUI/components/ui/button";
import { Input } from "@/presentation/shadcnUI/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/shadcnUI/components/ui/form";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
});

export const CreateUserForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await userCreate(data.username);
      toast.success("User created successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex flex-col items-center w-[40vw] lg:w-[30vw]"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="User name"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="success"
            type="submit"
            className="col-span-12 lg:col-span-2 w-full"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
