import React from "react";

function ReplyCard({ message }) {
  const date = new Date(message.messageDate);
  return (
    <div className="mb-3 p-2 rounded" style={{ backgroundColor: "#F0F2F5" }}>
      <div className="fw-bold text-muted">
        <span className="me-4">{message.sender}</span>
        <span className="me-4">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span>{date.toLocaleTimeString("en-US")}</span>
      </div>
      <div>{message.messages}</div>
    </div>
  );
}

export default ReplyCard;
