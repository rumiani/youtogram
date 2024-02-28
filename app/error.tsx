"use client"
import React from 'react'

export default function Error({error, reset}) {
    console.log(error);
    
  return (
    <div>
        Something went wrong.
        <p>{error.message}</p>
        <button onClick={reset}>Try again</button>

    </div>
  )
}
