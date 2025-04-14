import React, { useState } from 'react';

function StarRating({ label, rating, setRating }) {
    return (
      <div className="flex items-center justify-between mb-4">
        <span className="w-32 font-medium">{label}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 cursor-pointer ${
                star <= rating ? 'text-green-500' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.167c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.285-3.95a1 1 0 00-.364-1.118L2.56 9.377c-.783-.57-.38-1.81.588-1.81h4.167a1 1 0 00.95-.69l1.286-3.95z" />
            </svg>
          ))}
        </div>
      </div>
    );
  }
  

function Review() {
  const [onTime, setOnTime] = useState(0);
  const [safety, setSafety] = useState(0);
  const [fairPrice, setFairPrice] = useState(0);
  const [driverAttitude, setDriverAttitude] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="p-4">
      {/* Header */}
      <div className="relative bg-[#0DC964] shadow-[0_0_10px_#969696] h-[115px] flex items-end justify-center pb-2 rounded-b-3xl z-[3000]">
        <h1 className="text-white text-xl font-bold">บัญชี</h1>
      </div>

      {/* Icons */}
      <div className="flex items-center justify-center mt-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center mr-4">
          <i className="fas fa-car text-xl text-gray-700"></i>
        </div>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
          <i className="fas fa-user text-xl text-gray-700"></i>
        </div>
      </div>

      {/* Shop Name */}
      <div className="text-center mt-2 mb-4">
        <h2 className="text-lg font-semibold">ชื่อร้านค้า</h2>
      </div>

      {/* Ratings */}
      <div>
        <h3 className="font-semibold text-lg mb-4">ให้คะแนน</h3>
        <StarRating label="ตรงต่อเวลา" rating={onTime} setRating={setOnTime} />
        <StarRating label="ปลอดภัย" rating={safety} setRating={setSafety} />
        <StarRating label="ราคาเป็นธรรม" rating={fairPrice} setRating={setFairPrice} />
        <StarRating label="บุคลิคผู้ขับ" rating={driverAttitude} setRating={setDriverAttitude} />
      </div>

      {/* Comment Section */}
      <div className="mt-6">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
          rows="4"
          placeholder="เขียนความคิดเห็นของคุณที่นี่"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}

export default Review;
