import ChatBot from "react-chatbotify";
import caticon from '../../../assets/Images/favicon copy.png'
import { askAI } from "../../../api/askAI";



export default function AppChatBot() {
  const handleRouting = async(userInput: string) => {

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

    //  await askAI(userInput);
    // setAiResponse(ai);
    return "askAI";
  };
  const options = [
    "Projects",
    "Tasks",
    "Users",
    "Developers",
    "UpSkilling",
    "Eng.Nadia",
  ];
  return (
    <ChatBot
      settings={{
        general: {
          primaryColor: "#ef9b28",
          secondaryColor: "#315951",
          fontFamily: "Inter",
          showHeader: true,
        },
        
        chatHistory: {
          storageKey: "dashboard-chatbot",
        },
        botBubble: {
          showAvatar: true,
          avatar: caticon,
        },
        header:{
          title:"Ziko - Your Assistant",
          showAvatar:true,
          avatar:caticon,


        }
      }}
      flow={{
        start: {
          message: "Hello 👋 Welcome to PMS Dashboard",
          path: "help",
        },

        help: {
          message:
            "I can help you with Projects, Tasks and Users Management 🚀. How can I assist you today?",
          options,
          path: async ({ userInput }: { userInput: string }) => handleRouting(userInput),
        },

        greeting: {
          message:
            "Welcome back! 😊 How can I help you in the dashboard today?",
          options,
          path: async ({ userInput }: { userInput: string }) => handleRouting(userInput),
        },

        thx: {
          message:
            "You are most welcome! Always here to help. 🤍 Do you need anything else?",
          options: ["Yes, please", "No, thanks"],
          path: async ({ userInput }: { userInput: string }) => {
            const input = userInput.trim().toLowerCase();
            if (input.includes("no") || input.includes("لا")) return "end";
            return "help";
          },
        },

        askAI:{
          message:  ({ userInput }) =>  askAI(userInput),
          // async () => await askAI(input),
         path: async ({ userInput }: { userInput: string }) => handleRouting(userInput),
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
          options,
          path: async ({ userInput }: { userInput: string }) => handleRouting(userInput),
        },
      }}
      
    />
  );
}
