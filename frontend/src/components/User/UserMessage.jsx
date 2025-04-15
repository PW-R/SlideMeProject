import React, { useState, useRef, useEffect } from "react";
import { FaStar, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function UserMassage() {
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

  // Scroll to bottom when new message is added
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-100 flex flex-col relative mx-auto  ">
      {/* Header */}
      <div className="fixed w-[387px] h-[115px] shadow-[0_0_10px_#969696] bg-[#0dc964]  flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <i
          onClick={handleBack}
          className="bi bi-chevron-left mt-3 text-white text-2xl absolute left-3 bottom-4 cursor-pointer"
        ></i>
        <h1 className="text-white text-center text-xl font-semibold">
          ส่งข้อความ
        </h1>
      </div>

      {/* Driver Info + Rating + Call Button */}
      <div className="fixed top-[100px] w-[387px] z-[40] p-6 pt-2 pb-2 flex items-center justify-between border-b border-[#0dc964]">
        <div className="flex items-center space-x-3 mt-6">
          <FaUserCircle className="text-gray-500 text-5xl" />
          <div className="flex flex-col">
            <span className="font-semibold text-lg">สมใจ สมดีนคร</span>
            <span className="text-sm text-gray-600">5698A2001</span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-[#0dc964]" />
              <span className="text-sm font-medium">4.9</span>
            </div>
          </div>
        </div>
        <button
          style={{ borderRadius: "10px" }}
          className="p-2 bg-[#0dc964] flex items-center justify-center shadow"
        >
          <FaPhoneAlt className="text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="absolute w-[387px] h-[570px] top-[208px] flex-1 overflow-y-auto px-8 pb-4 pt-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}
          >
            <div
              className={`px-4 py-2 text-sm max-w-[80%] rounded-2xl ${
                message.sender === "user"
                  ? "bg-[#0dc964] text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Message Box (Fixed + Mobile-sized) */}
      <div className="fixed bottom-28 left-0 right-0 px-14 z-50 max-w-md mx-auto">
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
            style={{ borderRadius: "30px" }}
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
