import React from "react";
interface Props{
  title:string
}
export default function CustomHeader({title}:Props) {
  return (
    <h1 className="auth-title">{title}</h1>
  );
}
