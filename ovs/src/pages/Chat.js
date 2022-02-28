import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { useState } from "react";
import LoginForm from "../components/chat/LoginForm";
import { useCookies } from "react-cookie";

const projectID = "05cf186b-8339-4cd8-888e-b85674b2260a";

const DmChat = () => {
  const [Cookies] = useCookies(["username", "chat"]);
  const [username, setUsername] = useState("");

  if (!Cookies.chat) return <LoginForm />;
  function createDmChat(creds) {
    getOrCreateChat(
      creds,
      { is_sirect_chat: true, username: Cookies.username },
      () => setUsername("")
    );
  }

  function renderchatForm(creds) {
    return (
      <div className="flex p-1 rounded-full bg-white my-2 justify-center">
        <button onClick={() => createDmChat(creds)}>New chat</button>
      </div>
    );
  }

  return (
    <ChatEngine
      offset={1}
      height="85vh"
      userName={Cookies.username}
      userSecret={Cookies.chat}
      projectID={projectID}
      renderNewChatForm={(creds) => renderchatForm(creds)}
    />
  );
};

export default DmChat;
