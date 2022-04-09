import React from 'react';

console.log('Phone-Auth loaded');

function PhoneAuthNotice() {
  return (
    <p className="mb-2 space-x-2 rounded-sm bg-orange-100 py-2 px-2 shadow-md">
      <span className="font-bold text-blue-600">주의!</span>
      <span className="text-red-400 underline">대한민국</span> 전화번호만 가능합니다.
    </p>
  );
}

export default PhoneAuthNotice;
