import React, { useState, useEffect } from "react";
import AC, { AgoraChat } from "agora-chat"; // Assuming AC is imported correctly

const AgoraChatComponent = () => {
  const appKey = "611137238#1322245";
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [peerId, setPeerId] = useState("");
  const [peerMessage, setPeerMessage] = useState("");
  const [log, setLog] = useState([]);
  const [conn, setConn] = useState(null);

  useEffect(() => {
    if (appKey && !conn) {
      const connection = new AC.connection({
        appKey: appKey,
      });

      connection.addEventHandler("connection&message", {
        onConnected: () => {
          setLog((log) => [...log, "Connect success !"]);
        },
        onDisconnected: () => {
          setLog((log) => [...log, "Logout success !"]);
        },
        onTextMessage: (message) => {
          console.log(message);
          setLog((log) => [
            ...log,
            `Message from: ${message.from} Message: ${message.msg}`,
          ]);
        },
        onTokenWillExpire: (params) => {
          setLog((log) => [...log, "Token is about to expire"]);
        },
        onTokenExpired: (params) => {
          setLog((log) => [...log, "The token has expired"]);
        },
        onError: (error) => {
          console.log("on error", error);
        },
      });

      setConn(connection);
    }
  }, [appKey, conn]);

  const handleLogin = () => {
    if (conn) {
      setLog((log) => [...log, "Logging in..."]);
      conn.open({
        user: userId,
        agoraToken: token,
      });
    }
  };

  const handleLogout = () => {
    if (conn) {
      conn.close();
      setLog((log) => [...log, "Logout"]);
    }
  };

  const handleSendPeerMessage = () => {
    if (conn) {
      const option = {
        chatType: "singleChat",
        type: "txt",
        to: peerId,
        msg: peerMessage,
      };
      const msg = AC.message.create(option);
      conn
        .send(msg)
        .then(() => {
          console.log("send private text success");
          setLog((log) => [
            ...log,
            `Message send to: ${peerId} Message: ${peerMessage}`,
          ]);
        })
        .catch(() => {
          console.log("send private text fail");
        });
    }
  };

  return (
    <div>
      <h2>Agora Chat Examples</h2>
      <div>
        <label>User ID</label>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label>Token</label>
        <input
          type="text"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div>
        <label>Peer user ID</label>
        <input
          type="text"
          placeholder="Peer user ID"
          value={peerId}
          onChange={(e) => setPeerId(e.target.value)}
        />
      </div>
      <div>
        <label>Peer Message</label>
        <input
          type="text"
          placeholder="Peer message"
          value={peerMessage}
          onChange={(e) => setPeerMessage(e.target.value)}
        />
        <button type="button" onClick={handleSendPeerMessage}>
          send
        </button>
      </div>
      <hr />
      <div id="log">
        {log.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default AgoraChatComponent;
