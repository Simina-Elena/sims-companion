import { useChallengeStore } from "@/state/challenge";
import CustomCard from "./CustomCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChallengeActions } from "./ChallengeActions";
import { useState, type ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateRule } from "@/api/challenges";
import type { Rule } from "@/types/challenge";

export default function DisplayChallenge() {
  const { challenge, updateRuleState } = useChallengeStore();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingRule, setEditingRule] = useState<Rule>();

  if (!challenge) {
    return <div>No challenge to display.</div>;
  }

  const handleEdit = (rule: Rule) => {
    setEditingIndex(rule.id);
    setEditingRule(rule);
  };

  const handleDelete = () => {
    console.log("in delete");
  };

  const handleEditRule = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    if (editingRule) {
      setEditingRule({ ...editingRule, text: newText });
    }
  };

  const handleSave = async () => {
    if (editingIndex !== null && editingRule) {
      const updatedRule = await updateRule({
        challengeId: challenge.id,
        ruleId: editingIndex,
        ruleToUpdate: editingRule,
      });
      updateRuleState(updatedRule);
    }
    setEditingIndex(null);
    setEditingRule(undefined);
  };

  return (
    <CustomCard
      cardTitle={challenge.title}
      cardDescription={challenge.description}
      className=" bg-neutral-100"
    >
      <div>
        {challenge.rules.map((rule) => (
          <div
            key={rule.id}
            className="mb-3 flex items-center justify-between gap-2"
          >
            {editingIndex === rule.id ? (
              <div className="flex items-center gap-2 w-full">
                <Input
                  value={editingRule?.text}
                  onChange={handleEditRule}
                  className="flex-1"
                />
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-teal-600 has-[[aria-checked=true]]:bg-teal-50 dark:has-[[aria-checked=true]]:border-teal-900 dark:has-[[aria-checked=true]]:bg-teal-950">
                  <Checkbox
                    id={rule.id.toString()}
                    className="data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 data-[state=checked]:text-white dark:data-[state=checked]:border-teal-700 dark:data-[state=checked]:bg-teal-700"
                  />
                  <p className="text-sm leading-none font-medium">
                    {rule.text}
                  </p>
                </Label>
                <ChallengeActions
                  onEdit={() => handleEdit(rule)}
                  onDelete={() => handleDelete()}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </CustomCard>
  );
}
