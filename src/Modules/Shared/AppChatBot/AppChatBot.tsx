import ChatBot from "react-chatbotify";

export default function AppChatBot() {
  const handleRouting = (userInput: string) => {
    const input = userInput.trim().toLowerCase();

    if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("سلام") ||
      input.includes("أهلا") ||
      input.includes("مرحبا")
    ) {
      return "greeting";
    }

    if (
      input.includes("شكر") ||
      input.includes("تسلم") ||
      input.includes("حبيب") ||
      input.includes("thank") ||
      input.includes("thx") ||
      input.includes("thank you")
    ) {
      return "thx";
    }

    if (
      input.includes("nadia") ||
      input.includes("نادية") ||
      input.includes("ناديا")
    ) {
      return "nadia";
    }
    if (
      input.includes("project") ||
      input.includes("مشروع") ||
      input.includes("مشاريع")
    ) {
      return "projects";
    }
    if (
      input.includes("task") ||
      input.includes("مهمة") ||
      input.includes("مهام")
    ) {
      return "tasks";
    }
    if (
      input.includes("developer") ||
      input.includes("مطور") ||
      input.includes("مبرمج")
    ) {
      return "developers";
    }
    if (
      input.includes("upskilling") ||
      input.includes("تطوير") ||
      input.includes("تعلم")
    ) {
      return "upSkilling";
    }
    if (input.includes("user") || input.includes("مستخدم")) {
      return "users";
    }

    return "unknown";
  };

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
            "I can help you with Projects, Tasks and Users Management 🚀. How can I assist you today?",
          options: [
            "Projects",
            "Tasks",
            "Users",
            "Developers",
            "UpSkilling",
            "Eng.Nadia",
          ],
          path: async ({ userInput }: any) => handleRouting(userInput),
        },

        greeting: {
          message:
            "Welcome back! 😊 How can I help you in the dashboard today?",
          options: ["Projects", "Tasks", "Users"],
          path: async ({ userInput }: any) => handleRouting(userInput),
        },

        thx: {
          message:
            "You are most welcome! Always here to help. 🤍 Do you need anything else?",
          options: ["Yes, please", "No, thanks"],
          path: async ({ userInput }: any) => {
            const input = userInput.trim().toLowerCase();
            if (input.includes("no") || input.includes("لا")) return "end";
            return "help";
          },
        },

        unknown: {
          message:
            "Sorry, I didn't quite catch that. 😅 Could you please choose one of these options or clarify your request?",
          options: [
            "Projects",
            "Tasks",
            "Users",
            "Developers",
            "UpSkilling",
            "Eng.Nadia",
          ],
          path: async ({ userInput }: any) => handleRouting(userInput),
        },

        projects: {
          message:
            "📊 Projects Section: You can add, edit, delete, and monitor all your team projects directly from the Projects page.",
          path: "end",
        },

        tasks: {
          message:
            "📝 Tasks Section: Here you can assign tasks to employees, update execution statuses, and track deadlines.",
          path: "end",
        },

        users: {
          message:
            "👥 Users Section: This page allows you to manage system users, activate or deactivate accounts, and update permissions.",
          path: "end",
        },

        developers: {
          message:
            "💻 Development Team: Eng. Mohamed Fawzy, Eng. Abdelrahman Mohamed, Eng. Antonios Farhood, Eng. Ahmed Adel. Keep up the great work, heroes! 🚀",
          path: "end",
        },

        upSkilling: {
          message:
            "🎯 UpSkilling: One of the best practical tracks to master software development! The core focus is on real-world practical experience and building strong portfolio projects for the job market. 💻",
          path: "end",
        },

        nadia: {
          message:
            "🌟 Ms. Nadia: An exceptional instructor! Her explanation is very clear, structured, and easy to grasp. She is incredibly supportive, patient, and dedicated to helping every student reach a professional standard. 🤍",
          path: "end",
        },

        end: {
          message: "Is there anything else I can assist you with? 😊",
          options: ["Projects", "Tasks", "Users", "Developers"],
          path: async ({ userInput }: any) => handleRouting(userInput),
        },
      }}
    />
  );
}
