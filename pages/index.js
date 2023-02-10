import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [messageInput, setMessageInput] = useState("");
  const [result, setResult] = useState();

  // Itna part del krna
  const [messages, setMessages] = useState([
    // { id: 1, text: '', sender: '' },
    { id: 2, text: "Hi! I am Alice your AI friend.", sender: 'Alice' },
  ]);
  // Itna part del krna

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageInput }),
    });

    // Itna part del krna
    // setMessages([...messages, { id: Date.now(), text: messageInput, sender: 'me' }]);
    // Itna part del krna

    const data = await response.json();
    setResult(data.result);

    // Itna part del krna
    setMessages([...messages, { id: Date.now(), text: messageInput, sender: 'You' }, { id: Date.now(), text: data.result, sender: 'Alice' }]);
    // Itna part del krna

    setMessageInput("");
  }

  return (
    <div>

      <Head>
        <title>Virtual Vixen</title>
      </Head>

      <main className={styles.main}>
        <h1>Virtual Vixen</h1>
        <div id="chat-window" style={{ "boxShadow": "0 0 7px #ccc", "width": "500px", "height": "400px", "marginBottom": "1.5rem", "overflowX": "hidden", "overflowY": "auto" }}>
          {messages.map(message => (
            <div key={message.id} className={`message ${message.sender}`}>
              <span style={{ "fontWeight": "bold", "textAlign": "left", "marginLeft": "5px", "color": "#10a37f", "fontSize": "larger" }}>{message.sender} </span>
              <p style={{ "marginLeft": "5px" }}>{message.text}</p>
            </div>
          ))}
        </div>
        <form id="chat-form" onSubmit={onSubmit}>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Enter your message"
          />
          <input type="submit" value="Send" />
        </form>
      </main>

    </div>
  );
}

