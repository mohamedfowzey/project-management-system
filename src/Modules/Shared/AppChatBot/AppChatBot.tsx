import ChatBot from "react-chatbotify";

export default function AppChatBot() {
  return (
    <ChatBot
      settings={{
        general: {
          primaryColor: "#0f766e",
          secondaryColor: "#f59e0b",
          fontFamily: "Inter",
        },

        chatHistory: {
          storageKey: "dashboard-chatbot",
        },

        botBubble: {
          showAvatar: true,
        },
      }}
      flow={{
        start: {
          message: "Hello 👋 Welcome to PMS Dashboard",
          path: "help",
        },

        help: {
          message:
            "I can help you with Projects, Tasks and Users Management 🚀",

          options: ["Projects", "Tasks", "Users"],

          path: async ({ userInput }: any) => {
            if (userInput === "Projects") return "projects";

            if (userInput === "Tasks") return "tasks";

            return "users";
          },
        },

        projects: {
          message:
            "You can add, edit, delete and manage all projects from the Projects page.",

          path: "end",
        },

        tasks: {
          message:
            "You can manage tasks, update status and assign employees from Tasks page.",

          path: "end",
        },

        users: {
          message:
            "You can activate, deactivate and manage users from Users page.",

          path: "end",
        },

        end: {
          message: "Anything else I can help with? 😊",

          options: ["Projects", "Tasks", "Users"],

          path: "help",
        },
      }}
    />
  );
}
