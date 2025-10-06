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
import { createChallenge } from "../api/challenges";
import { useJobStore } from "../state/job";

export default function CreateChallenge() {
  const setJobId = useJobStore((state) => state.setJobId);

  const form = useForm<CreateChallenge>({
    resolver: zodResolver(challengeSchema),
  });

  const onSubmit = async (data) => {
    console.log("✅ Valid Data:", data);
    const { theme, packs } = data;
    const packsArray = packs.split(",").map((pack: string) => pack.trim());
    const job = await createChallenge({ theme, packs: packsArray });
    setJobId(job.job_id);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormControl>
                <Input placeholder="Enter challenge theme" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="packs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packs</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the packs you want separated by comma"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.errors && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {Object.values(form.formState.errors).map((error) =>
              console.log(error)
            )}
          </div>
        )}
        <Button type="submit">Create Challenge</Button>
      </form>
    </Form>
  );
}
