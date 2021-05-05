import { Button } from "react-bootstrap";
import { useVideo } from "../context/VideoContext";

const CallerNotification = () => {
  const { answerCall, call, callAccepted } = useVideo();

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <h1>{call.name} is calling:</h1>
          <Button onClick={answerCall}>Answer</Button>
        </div>
      )}
    </>
  );
};

export default CallerNotification;
