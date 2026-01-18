import { Pencil, Trash2 } from "lucide-react";
import { Dialog } from "./Dialog";

type ChallengeActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};
export function ChallengeActions({ onEdit, onDelete }: ChallengeActionsProps) {
  return (
    <div className="flex items-center gap-4">
      <Pencil
        size={16}
        className="text-blue-500 hover:text-blue-600 transition-transform duration-200 hover:scale-125 cursor-pointer"
        onClick={onEdit}
      />
      <Dialog onDelete={onDelete}>
        <Trash2
          size={16}
          className="text-red-500 hover:text-red-600 transition-transform duration-200 hover:scale-125 cursor-pointer"
        />
      </Dialog>
    </div>
  );
}
