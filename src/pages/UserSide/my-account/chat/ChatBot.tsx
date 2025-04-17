import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MdSend } from "react-icons/md"; // For the send icon
import { FaRegSmile } from "react-icons/fa"; // Emoji icon
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { InputBase } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";

// import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
// import "emoji-picker-element";

// import "emoji-mart/css/emoji-mart.css";
interface Emoji {
  native: string;
  // Add other properties from the emoji object if needed
}

export default function ChatBot() {
  const [message, setMessage] = useState<string>("");
  // const onlyWidth = useWindowWidth();
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [chats, setChats] = useState<
    { type: "user" | "self"; content: string; time: string }[]
  >([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chats]);

  const addEmoji = (emoji: Emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  // const handleEmojiSelect = (emoji: string) => {
  //   setMessage((prev) => prev + emoji);
  //   setShowEmojiPicker(false); // Close the picker after selection
  // };
  const handleSendMessage = () => {
    if (message.trim()) {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      // Add the message to the chat dynamically
      setChats((prevChats) => [
        ...prevChats,
        { type: "self", content: message, time: currentTime },
      ]);
      setShowEmojiPicker(false);
      setMessage(""); // Clear input after sending
    }
  };
  return (
    <div
      ref={chatContainerRef}
      className="  h-[70vh]  overflow-y-auto   sm:px-4 justify-between flex flex-col gap-5"
    >
      <div className="space-y-4 w-full flex flex-col">
        {/* message  Date */}
        <span className="mx-auto">24/11/2024</span>

        {/* Enquiry Box */}
        <div className="border rounded-xl p-2 flex items-center justify-between">
          <p>Product Enquiry</p>
          <div className="flex gap-3 items-center max-w-sm">
            <p className="">
              Oversized 100% Cotton 190GSM 240GSM Plain White T Shirt Name
            </p>
            <img
              src="/img/products/image 78.png"
              className="w-12 text-xs"
              alt="chat enquiry box"
            />
          </div>
        </div>

        {/* chat area ==== */}
        <div className="flex justify-between">
          {/* User Chat */}
          <div className="flex items-start gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://via.placeholder.com/40" alt="User" />
              <AvatarFallback>J</AvatarFallback>
            </Avatar>
            {/* chat starts */}
            <div className="rounded-b-lg rounded-tr-lg p-3 text-sm max-w-xs bg-[#F2F2F7] flex flex-col">
              {/* Chat Header starts */}
              <div className="flex gap-2 items-center">
                <span className="text-black capitalize">Jav</span>
                <span className="text-xs">Engineering</span>
              </div>
              {/* Chat Header Ends */}

              {/* Chat body starts */}
              <span className="text-sm text-black">I’m down! Any ideas??</span>
              {/* Chat body Ends */}

              {/* chat footer Starts */}
              <div className="flex justify-end">
                <span className="text-xs">11:46 AM</span>
              </div>
              {/* chat footer Ends */}
            </div>
            {/* chat Ends */}
          </div>
        </div>

        {/* our Chat */}
        {/* <div className="flex justify-end">
          <div className="rounded-t-lg rounded-bl-lg p-3 text-sm max-w-xs bg-bgPrimaryVariant text-white">
            ddsdfasdadasda
          </div>
        </div> */}
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`flex  ${chat.type === "self" ? "justify-end" : "items-start gap-3"}`}
          >
            {chat.type === "user" && (
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://via.placeholder.com/40" alt="User" />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`flex p-3 gap-2  ${
                chat.type === "self"
                  ? "bg-bgPrimaryVariant text-white rounded-t-lg rounded-bl-lg"
                  : "bg-[#F2F2F7] text-black rounded-b-lg rounded-tr-lg"
              }`}
            >
              <div className={`text-sm max-w-xs flex `}>{chat.content}</div>
              <div className="flex justify-end items-end w-fit flex-grow">
                <span className="text-xs text-white">{chat.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat input */}
      <div className="flex items-center justify-between gap-5 sticky bottom-0 bg-white">
        {/* Emoji picker starts ========= */}
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 z-10 ">
            <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
            <button
              className="-top-2 -right-2 absolute h-5 w-5 bg-white rounded-full"
              onClick={() => setShowEmojiPicker(false)}
            >
              <Icon
                icon="solar:close-circle-bold"
                className="m-auto cursor-pointer"
              />
            </button>
          </div>
        )}
        {/* <MyEmojiPicker  onSelect={handleEmojiSelect}/> */}
         {/* {showEmojiPicker && (
        <div
          className="absolute bottom-10 left-0 z-50"
          style={{
            width: "100%", // Responsive width
            maxWidth: "300px",
          }}
        >
          <EmojiPicker onEmojiClick={addEmoji} />
        </div>
      )} */}

        <button
          className="text-gray-500 hover:text-gray-800"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          <FaRegSmile size={24} />
        </button>
        {/* <Box
          component="form"
          sx={{
            "& .MuiTextField-root": {
              m: 1,
              width:
                onlyWidth > 1440
                  ? "70ch"
                  : onlyWidth >= 1020
                    ? "60ch"
                    : onlyWidth >= 768
                      ? "40ch"
                      : onlyWidth >= 425
                        ? "30ch"
                        : onlyWidth >= 375
                          ? "27ch"
                          : onlyWidth >= 300
                            ? "20ch"
                            : onlyWidth >= 200
                              ? "18ch"
                              : "10ch",
            },
          }}
          noValidate
          autoComplete="off"
          className="" // Ensure this takes full width
        >
          <TextField
            id="standard-multiline-static"
            label=""
            fullWidth
            multiline
            variant="standard"
            placeholder="Start Typing ..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full" // Ensure full width
          />
        </Box> */}

        <InputBase
          placeholder="Type Your Message"
          multiline
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-b max-h-[60px] overflow-auto text-sm"
        />

        <Button
          variant={"b2bStyle"}
          className="rounded-full h-10 w-10"
          onClick={handleSendMessage}
        >
          <MdSend size={28} />
        </Button>
      </div>
      {/* ==================== */}
    </div>
  );
}
