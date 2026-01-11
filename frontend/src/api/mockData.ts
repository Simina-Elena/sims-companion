import type { Challenge } from "@/types/challenge";

export const mockChallenge: Challenge = {
  title: "Build a Todo App",
  description:
    "Create a fully functional todo application with add, edit, delete, and mark complete features using React and TypeScript.",
  rules: [
    {
      id: 1,
      text: "Create a component to display the list of todos",
    },
    {
      id: 2,
      text: "Implement add todo functionality with form validation",
    },
    {
      id: 3,
      text: "Add edit and delete buttons for each todo item",
    },
    {
      id: 4,
      text: "Implement mark as complete/incomplete toggle",
    },
    {
      id: 5,
      text: "Use React hooks (useState, useEffect) for state management",
    },
    {
      id: 6,
      text: "Add TypeScript types for all components and state",
    },
  ],
};
