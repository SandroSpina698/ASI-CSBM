import { CSSProperties } from "react";

interface Props {
  user_id: string;
  content: string;
  isCurrentUser?: boolean;
  timestamp?: string;
}

const MessageComponent = ({
  user_id,
  content,
  isCurrentUser = false,
  timestamp,
}: Props) => {
  // Get first letter and capitalize it
  const initial = String(user_id).charAt(0).toUpperCase();

  const containerStyle = {
    display: "flex",
    width: "100%",
    marginBottom: "16px",
    justifyContent: isCurrentUser ? "flex-end" : "flex-start",
  };

  const messageGroupStyle: CSSProperties = {
    display: "flex",
    maxWidth: "60vw",
    wordBreak: "break-word",
    flexDirection: isCurrentUser ? "row-reverse" : ("row" as const),
  };

  const avatarStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: isCurrentUser ? "#6B46C1" : "#FFA500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    flexShrink: 0,
  };

  const contentContainerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    marginLeft: isCurrentUser ? "0" : "8px",
    marginRight: isCurrentUser ? "8px" : "0",
    alignItems: isCurrentUser ? "flex-end" : "flex-start",
  };

  const userIdStyle = {
    fontSize: "14px",
    color: "#666666",
    marginBottom: "4px",
  };

  const messageBubbleStyle = {
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: isCurrentUser ? "#6B46C1" : "#F3F4F6",
    color: isCurrentUser ? "white" : "#1F2937",
    borderBottomRightRadius: isCurrentUser ? "0" : "12px",
    borderBottomLeftRadius: isCurrentUser ? "12px" : "0",
  };

  const timestampStyle = {
    fontSize: "12px",
    color: "#9CA3AF",
    marginTop: "4px",
  };

  return (
    <div style={containerStyle}>
      <div style={messageGroupStyle}>
        <div style={avatarStyle}>{initial}</div>

        <div style={contentContainerStyle}>
          <span style={userIdStyle}>{user_id}</span>
          <div style={messageBubbleStyle}>
            <p style={{ margin: 0, textAlign: "left" }}>{content}</p>
          </div>
          {timestamp && <span style={timestampStyle}>{timestamp}</span>}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
