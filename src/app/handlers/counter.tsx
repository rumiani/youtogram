'use client'
import React, { useState } from "react";

export default function Counter() {
  console.log("counter");
  const [count, setCount] = useState(0);
  return (
    <div>
      Counter: {count}
      <br />
      <button onClick={() => setCount(count + 1)}>count</button>
    </div>
  );
}
