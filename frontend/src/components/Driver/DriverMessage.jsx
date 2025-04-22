import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

let socket;

function DriverMessage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // สร้างการเชื่อมต่อ WebSocket
    socket = new WebSocket("ws://localhost:8080");
  
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    fetch('http://localhost:3000/api/driver-message')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(setMessages)
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  
    return () => socket.close(); 
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const message = {
      text: input,
      sender: "driver",
      time,
    };

    socket.send(JSON.stringify(message));

    fetch('http://localhost:3000/api/driver-message', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        
        console.log('Message successfully sent:', data);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });

    setInput("");
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="fixed w-full max-w-[387px] shadow-[0_0_10px_#969696] bg-[#0dc964] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <Link to="/PendingOrderLocation">
          <i className="bi bi-chevron-left text-white text-2xl absolute left-3 bottom-4"></i>
        </Link>
        <h1 className="text-white text-lg font-bold">Chat</h1>
      </div>

      {/* Chat Body */}
      <div className="mt-[125px] w-full max-w-[387px] flex flex-col justify-between flex-1 bg-white rounded-md shadow-inner px-4 py-2">
        {/* Customer Info */}
        <div className="flex items-center gap-2 border-b pb-2">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
            👤
          </div>
          <div className="flex-1 text-gray-700 text-sm">คุณเจนจิรา (ลูกค้า)</div>
          <Phone className="w-5 h-5 text-green-500" />
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-2 py-4 text-sm overflow-y-auto max-h-[60vh]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.sender === "driver" ? "items-end" : "items-start"}`}>
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] ${
                  msg.sender === "driver" ? "bg-gray-200" : "bg-green-500 text-white"
                }`}
              >
                {msg.text}
              </div>
              <div className={`text-xs text-gray-500 ${msg.sender === "driver" ? "pr-1" : "pl-1"} -mt-1`}>
                {msg.time}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Message input */}
        <div className="border-t px-3 py-2 flex items-center gap-2">
          <button className="text-2xl text-gray-500">+</button>
          <input
            type="text"
            placeholder="Write your message here"
            className="flex-1 px-3 py-1 rounded-full border text-sm focus:outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="text-gray-500 text-lg" onClick={sendMessage}><i className="bi bi-send"></i></button>
        </div>
      </div>
    </div>
  );
}

export default DriverMessage;
