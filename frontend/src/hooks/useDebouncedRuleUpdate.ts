import { updateRule } from "@/api/challenges";
import { debounce } from "@/components/utils/debounce";
import type { RuleData } from "@/types/challenge";
import { useRef } from "react";

export function useDebouncedRuleUpdate(delay = 4000) {
  const debouncedMap = useRef<Map<number, ReturnType<typeof debounce>>>(
    new Map()
  );

  const getDobounced = (ruleId: number) => {
    if (!debouncedMap.current.has(ruleId)) {
      const debounceFn = debounce((payload: RuleData) => {
        updateRule(payload);
      }, delay);

      debouncedMap.current.set(ruleId, debounceFn);
    }

    return debouncedMap.current.get(ruleId)!;
  };

  return getDobounced;
}
