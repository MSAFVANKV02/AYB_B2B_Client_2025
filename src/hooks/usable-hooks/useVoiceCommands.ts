// import { useEffect } from "react";

// export const useVoiceCommands = () => {
//   useEffect(() => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event: any) => {
//       const last = event.results.length - 1;
//       const command = event.results[last][0].transcript.toLowerCase();
//       console.log("Voice Command:", command);

//       if (command.includes("open order")) {
//         window.location.href = "/my-account/my-orders";
//       } else if (
//         command.includes("scroll to footer") ||
//         command.includes("scroll to foot") ||
//         command.includes("scroll")
//       ) {
//         document
//           .getElementById("footer")
//           ?.scrollIntoView({ behavior: "smooth" });
//       }
//     };

//     recognition.start();

//     return () => recognition.stop();
//   }, []);
// };
// ==========
// import { IFinalProductTypes } from "@/types/final-product-types";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const useVoiceCommands = (products?: IFinalProductTypes[]) => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Speech recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event: any) => {
//       const last = event.results.length - 1;
//       const command = event.results[last][0].transcript.toLowerCase();
//       console.log("Voice Command:", command);

//       // Basic commands
//       if (command.includes("open order")) {
//         navigate("/my-account/my-orders");
//       } else if (command.includes("home")||command.includes("go to home")) {
//         navigate("/");
//       } else if (
//         command.includes("scroll to footer") ||
//         command.includes("scroll to foot") ||
//         command.includes("scroll")
//       ) {
//         document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
//       }

//       // Match product name
//       if(products){
//          for (const product of products) {
//         const productName = product.product.product_name.toLowerCase();
//         if (command.includes(productName) || productName.includes(command)) {
//           console.log("Matched Product:", productName);
//           // For example, redirect to product page (assumes slug/ID exists)
//           navigate(`/product/${product.product.slug || product._id}`);
//           break;
//         }
//       }
//       }
     
//     };

//     recognition.start();

//     return () => recognition.stop();
//   }, [products, navigate]);
// };
// =====
import Commands from "@/components/voice-ai/commands";
import { IFinalProductTypes } from "@/types/final-product-types";
import { makeToastWarning } from "@/utils/toaster";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useVoiceCommands = (products?: IFinalProductTypes[]) => {
  const navigate = useNavigate();
  const {commands} = Commands();

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      makeToastWarning("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    // Define commands with keywords and actions
    // const commands: { keywords: string[]; action: () => void }[] = [
    //   {
    //     keywords: ["open order"],
    //     action: () => navigate("/my-account/my-orders"),
    //   },
    //   {
    //     keywords: ["home", "go to home"],
    //     action: () => navigate("/"),
    //   },
    //   {
    //     keywords: ["scroll to footer", "scroll to foot", "scroll"],
    //     action: () =>
    //       document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }),
    //   },
    //   // Add more static commands here if needed
    // ];

    recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.toLowerCase();
      // console.log("Voice Command:", command);

      // First check static commands
      for (const cmd of commands) {
        if (cmd.keywords.some((keyword) => command.includes(keyword))) {
          cmd.action();
          return; // stop after first match
        }
      }

      // Then check dynamic product name commands
      if (products) {
        for (const product of products) {
          const productName = product.product.product_name.toLowerCase();
          if (command.includes(productName) || productName.includes(command)) {
            console.log("Matched Product:", productName);
            navigate(`/product/${product.product.slug || product._id}`);
            break;
          }
        }
      }
    };

    recognition.start();

    return () => recognition.stop();
  }, [products, navigate]);
};
