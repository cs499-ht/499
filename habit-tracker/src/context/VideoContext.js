import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useContext,
} from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

export const VideoContext = createContext();

// useVideo hook to access VideoContext instead of rewriting it in every component
export function useVideo() {
  return useContext(VideoContext);
}

// const socket = io("http://localhost:5000");
const socket = io("https://warm-wildwood-81069.herokuapp.com");

export const VideoProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        console.log("Getting initial video stream");
        console.log(myVideo.current.srcObject);
      })
      .catch((err) => console.log("Error getting media devices: " + err));

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    console.log("Answering call!");
    const peer = new Peer({ initiator: false, trickle: false, stream });
    console.log("Creating new Peer");
    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
      console.log("Answering call from: " + call.from);
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
      console.log("Getting other user's video");
      console.log(userVideo.current.srcObject);
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
    console.log("Peer after setting connectionRef" + peer);
    console.log(
      "connectionRef after setting connectionRef" + connectionRef.current
    );

    peer.on("error", (err) => {
      console.log(err);
    });
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;

    peer.on("error", (err) => {
      console.log(err);
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };

  // data/functions to export
  const value = {
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
};
