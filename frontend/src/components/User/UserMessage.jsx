import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaPhoneAlt, FaUserCircle } from "react-icons/fa";

function UserMassage() {
  const [messages, setMessages] = useState([
    { text: "Hello! How are you?", sender: "other" },
    { text: "I'm good, thanks! How about you?", sender: "user" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  // Scroll to bottom when new message is added
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-100 h-screen flex flex-col relative max-w-md mx-auto">
      {/* Header */}
      <div className="relative bg-[#0dc964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-center text-xl font-semibold">ส่งข้อความ</h1>
      </div>

      {/* Driver Info + Rating + Call Button */}
      <div className="p-4 flex items-center justify-between border-b border-[#0dc964]">
        <div className="flex items-center space-x-3">
          <FaUserCircle className="text-gray-500 text-4xl" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg">สมใจ สมดีนคร</span>
            <span className="text-sm text-gray-600">5698A2001</span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
        </div>
        <button className="p-2 bg-[#0dc964] rounded-full flex items-center justify-center shadow">
          <FaPhoneAlt className="text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-4 pb-40">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
          >
            <div
              className={`px-4 py-2 text-sm max-w-[80%] rounded-2xl ${
                message.sender === "user" ? "bg-[#0dc964] text-white" : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Box (Fixed + Mobile-sized) */}
      <div className="fixed bottom-28 left-0 right-0 px-4 z-50 max-w-md mx-auto">
        <div className="bg-white shadow-md rounded-full flex items-center px-3 py-1.5">
          <input
            type="text"
            className="flex-1 outline-none text-sm p-2"
            placeholder="พิมพ์ข้อความ..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="text-white bg-[#0dc964] px-4 py-1.5 rounded-full text-sm ml-2"
          >
            ส่ง
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserMassage;
