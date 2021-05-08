import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
// import { useLocation } from "react-router-dom";

export const VideoContext = createContext();

// useVideo hook to access VideoContext instead of rewriting it in every component
export function useVideo() {
  return useContext(VideoContext);
}

// const socket = io("http://localhost:5000");
const socket = io("https://video-sockets.herokuapp.com/");

export const VideoProvider = ({ children }) => {
  // MY INFO
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

  // BAD HACKY WAY: force refresh with router.useLocation
  // const location = useLocation();

  // first load anywhere besides /video will TypeError: Cannot set property 'srcObject' of undefined
  // console log error
  // BAD HACKY WAY: force refresh with router.useLocation
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
        console.log(myVideo.current.srcObject);
      })
      .catch((err) => console.log(err));

    socket.on("self", (id) => {
      setSelf(id);
      console.log(id);
    });

    socket.on("callUser", ({ from, name, signal }) => {
      setReceivingCall(true);
      setCallerID(from);
      setCallerName(name);
      setCallerSignal(signal);
      console.log(callerName + " IS CALLING YOU WITH ID: " + from);
    });
  }, []); //BAD HACKY WAY: refresh on location change to set new media stream

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

  // data/functions to export
  const value = {
    callAccepted,
    myVideo,
    callerVideo,
    stream,
    name,
    setName,
    callEnded,
    receivingCall,
    self,
    callUser,
    leaveCall,
    answerCall,
    callerID,
    callerName,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};
