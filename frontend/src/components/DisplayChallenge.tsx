import type { Challenge } from "@/types/challenge";
import CustomCard from "./CustomCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type ChallengeProps = {
  challenge: Challenge;
};

export default function DisplayChallenge({ challenge }: ChallengeProps) {
  return (
    <CustomCard
      cardTitle={challenge.title}
      cardDescription={challenge.description}
      className=" bg-neutral-100"
    >
      <div>
        {challenge.rules.map((rule, index) => {
          return (
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-teal-600 has-[[aria-checked=true]]:bg-teal-50 dark:has-[[aria-checked=true]]:border-teal-900 dark:has-[[aria-checked=true]]:bg-teal-950">
              <Checkbox
                id={index.toString()}
                className="data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 data-[state=checked]:text-white dark:data-[state=checked]:border-teal-700 dark:data-[state=checked]:bg-teal-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">{rule}</p>
                <p className="text-muted-foreground text-sm">
                  You can enable or disable notifications at any time.
                </p>
              </div>
            </Label>
          );
        })}
      </div>
    </CustomCard>
  );
}
