// import { useVideo } from "../context/VideoContext";
import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { Form, Button, Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const socket = io("https://video-sockets.herokuapp.com/");
// const socket = io("http://localhost:5001");

const Video = () => {
  const [self, setSelf] = useState("");
  const [name, setName] = useState("");
  const [stream, setStream] = useState();

  // CALLER INFO
  const [callerID, setCallerID] = useState("");
  const [callerName, setCallerName] = useState("");
  const [callerSignal, setCallerSignal] = useState();

  //CALL STATUS
  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  //VIDEO REFS
  const myVideo = useRef();
  const callerVideo = useRef();
  const connectionRef = useRef();
  const idToCallRef = useRef();
  const nameRef = useRef();

  // RUNS WHEN COMPONENT MOUNTS
  useEffect(() => {
    // GET MEDIA STREAM FROM LOCAL COMPUTER
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        // POPULATE MY VIDEO
        myVideo.current.srcObject = stream;
      })
      .catch((err) => console.log(err));

    // GET SOCKET ID FROM SIGNALING SERVER
    socket.on("self", (id) => {
      setSelf(id);
    });

    // LISTEN FOR WHEN REMOTE PEER IS CALLING ME
    socket.on("callUser", ({ from, name, signal }) => {
      setReceivingCall(true);
      setCallerID(from);
      setCallerName(name);
      setCallerSignal(signal);
    });

    // hacky way to remove warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CALL ANOTHER USER
  const callUser = (userToCall) => {
    // CREATE WEBRTC P2P CONNECTION
    // THIS IS SELF
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    // FIRES RIGHT AWAY SINCE INITIATOR == TRUE
    peer.on("signal", (data) => {
      // TELL SIGNALING SERVER WHO TO CALL
      socket.emit("callUser", {
        userToCall: userToCall,
        signalData: data,
        from: self,
        name: name,
      });
    });

    // LISTEN FOR CALL ACCEPTED EVENT FROM SIGNALING SERVER
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      // CALLED WHENEVER REMOTE PEER EMITS peer.on('signal') EVENT
      // CONNECT TO REMOTE PEER
      peer.signal(signal);
    });

    // GET STREAM FROM REMOTE PEER
    peer.on("stream", (stream) => {
      // SET CALLER VIDEO STREAM
      callerVideo.current.srcObject = stream;
    });

    // ERROR HANDLING
    peer.on("error", (err) => {
      console.log("Error!", err);
    });

    // USED TO END P2P CONNECTION WHEN HANGING UP
    connectionRef.current = peer;
  };

  // ANSWER REMOTE CALL
  const answerCall = () => {
    setCallAccepted(true);

    // CREATE WEBRTC P2P CONNECTION
    // THIS IS SELF
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    // FIRES WHEN REMOTE OFFER IS RECEIVED
    peer.on("signal", (data) => {
      // SERVER WILL PASS MY DATA ONTO REMOTE PEER
      socket.emit("answerCall", { signal: data, to: callerID });
    });

    // GET STREAM FROM REMOTE PEER
    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });

    // CALLED WHENEVER REMOTE PEER EMITS peer.on('signal') EVENT
    // CONNECT TO REMOTE PEER
    peer.signal(callerSignal);

    // ERROR HANDLING
    peer.on("error", (err) => {
      console.log("Error!", err);
    });

    // USED TO END P2P CONNECTION WHEN HANGING UP
    connectionRef.current = peer;
  };

  // CLEAN UP AFTER CALL
  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    // ACTUAL VIDEOS
    <div className="video-player">
      <div className="my-video">
        <h2>{name || "name"}</h2>
        {stream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "500px" }}
          />
        )}
      </div>
      <div className="peer-video">
        {callAccepted && !callEnded ? (
          <>
            <h2>{callerName}</h2>
            <video
              playsInline
              ref={callerVideo}
              autoPlay
              style={{ width: "500px" }}
            />{" "}
          </>
        ) : null}
      </div>

      {/* VIDEO INFO */}
      <div className="video-options">
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Call Options</h2>
            {self ? (
              <h3 style={{ color: "green" }}>Status: Online</h3>
            ) : (
              <h3 style={{ color: "red" }}>Status: Offline</h3>
            )}
            <Form>
              <Form.Group
                id="name"
                onChange={(e) => setName(nameRef.current.value)}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required />
                <CopyToClipboard text={self}>
                  <Button>Copy my Call ID</Button>
                </CopyToClipboard>
              </Form.Group>
            </Form>
          </Card.Body>

          <Card.Body>
            <Form>
              <Form.Group id="callee-id">
                <Form.Label>ID to call</Form.Label>
                <Form.Control type="text" ref={idToCallRef} required />
                {callAccepted && !callEnded ? (
                  <Button onClick={leaveCall}>Hang Up</Button>
                ) : (
                  <Button
                    onClick={() => {
                      callUser(idToCallRef.current.value);
                    }}
                  >
                    Call
                  </Button>
                )}
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>

      {/* ANSWER BUTTON */}
      {receivingCall && !callAccepted ? (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{callerName} is calling:</h1>
          <Button onClick={answerCall}>Answer</Button>
        </div>
      ) : null}
    </div>
  );
};

export default Video;
