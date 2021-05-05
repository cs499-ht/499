import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useVideo } from "../context/VideoContext";
import CallerNotification from "./CallerNotification";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CallOptions = ({ children }) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useVideo();
  const nameRef = useRef();
  const idToCallRef = useRef();

  return (
    <div className="video-options">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Call Options</h2>
          <h3>My ID: {me}</h3>
          <Form>
            <Form.Group
              id="name"
              onChange={(e) => setName(nameRef.current.value)}
            >
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
              <CopyToClipboard text={me}>
                <Button>Copy my ID</Button>
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
      <CallerNotification />
    </div>
  );
};

export default CallOptions;
