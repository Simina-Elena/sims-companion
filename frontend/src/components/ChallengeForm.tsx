import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  challengeSchema,
  type CreateChallenge,
} from "../types/challengeSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type ChallengeFormProps = {
  onSubmit: (data: CreateChallenge) => Promise<void>;
};

export default function ChallengeForm({ onSubmit }: ChallengeFormProps) {
  const form = useForm<CreateChallenge>({
    resolver: zodResolver(challengeSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem style={{ marginBottom: "1rem" }}>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Input placeholder="Enter challenge theme" {...field} />
              </FormControl>
              {form.formState.errors.theme && (
                <p style={{ color: "red" }}>
                  {form.formState.errors.theme.message}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="packs"
          render={({ field }) => (
            <FormItem style={{ marginBottom: "1rem" }}>
              <FormLabel>Packs</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the packs you want separated by comma"
                  {...field}
                />
              </FormControl>
              {form.formState.errors.packs && (
                <p style={{ color: "red" }}>
                  {form.formState.errors.packs.message}
                </p>
              )}
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {Object.values(form.formState.errors.root).map((error) =>
              error.toString()
            )}
          </div>
        )}
        <Button
          type="submit"
          className="bg-teal-700 text-white hover:bg-teal-950"
        >
          Create Challenge
        </Button>
      </form>
    </Form>
  );
}
