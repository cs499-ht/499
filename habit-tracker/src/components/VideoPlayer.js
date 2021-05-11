// import { useVideo } from "../context/VideoContext";
import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { Form, Button, Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const socket = io("https://video-sockets.herokuapp.com/");
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

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        console.log(myVideo.current.srcObject);
      })
      .catch((err) => console.log(err));

    console.log("getting socket id!");
    socket.on("self", (id) => {
      setSelf(id);
      console.log(id);
    });

    socket.on("callUser", ({ from, name, signal }) => {
      setReceivingCall(true);
      setCallerID(from);
      setCallerName(name);
      setCallerSignal(signal);
      console.log(name + " IS CALLING YOU WITH ID: " + from);
    });
  }, []);

  const callUser = (userToCall) => {
    console.log("From: " + self + " Calling: " + userToCall);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: userToCall,
        signalData: data,
        from: self,
        name: name,
      });
    });
    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });
    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: callerID });
    });
    peer.on("stream", (stream) => {
      callerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

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
