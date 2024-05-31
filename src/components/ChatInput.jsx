import React, { useState, useEffect, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  const dummy = useRef()
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [chat, setChat] = useState([]);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    if (transcript) {
      setText(transcript);
      console.log("Transcript:", transcript);
    }
  }, [transcript]);


  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  
  const submitFunction = (e) => {
    e.preventDefault();
    setText("");
    resetTranscript();
    setChat((prevChat) => [...prevChat, text]);
    const queryParam = encodeURIComponent(text);
    const url = `/api/qa?query=${queryParam}`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);
        setData(data.response);
        setChat((prevChat) => [...prevChat, data.response]);
      })
      .catch((error) => {
        console.error("Error:", error);
        setData(`Error: ${error.message}`);
        setChat((prevChat) => [...prevChat, `Error: ${error.message}`]);
      });

      dummy.current.scrollIntoView({behavior: 'smooth'});
  };
  return (
    <div className="flex flex-col h-full gap-4 w-full">
    {chat.map((d, index)=>{
      return(
      <Alert className={` drop-shadow-md border-2 rounded-2xl  ${index%2===0 ?'border-green-500 bg-green-100':'border-sky-500 bg-sky-100'}`}>
        <AlertTitle className={` flex gap-2 ${index%2===0 && 'justify-end'}`}>
        
          <img src={index%2===0 ? 'user.png':'pizza.png'} alt="sent" style={{ width: '20px' }} />
          <p>{index%2===0 ? 'User':'PizzaBot'}</p>
        </AlertTitle>
        <AlertDescription className={`flex gap-2 ${index%2===0 && 'justify-end'}`}>{d}</AlertDescription>
      </Alert>
      )
    })}
    <div ref={dummy}></div>
      <div
        className="chat-input-container border-2 p-4 border-b-2 rounded-xl flex flex-col "
        style={{
          borderBottomColor: "rgb(14 165 233)",
          borderWidth: "2px",
          borderTopColor: "current",
          borderLeftColor: "current",
          borderRightColor: "current",
        }}
      >
        <div className="input-area" >
          <input
            type="text"
            placeholder="Ask me anything..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            className="w-full"
            style={{ border: "none", outline: "none" }}
          />
        </div>
        <div className="flex justify-end">
          {listening ? (
            <Button onClick={SpeechRecognition.stopListening} variant="ghost">
              <img src="/stop.png" alt="sent" style={{ width: "20px" }} />
            </Button>
          ) : (
            <Button onClick={SpeechRecognition.startListening} variant="ghost">
              <img src="/on.png" alt="sent" style={{ width: "20px" }} />
            </Button>
          )}
          {/* <Button
            variant="ghost"
            onClick={() => {
              resetTranscript();
              setText("");
            }}
          >
            <img src="/reset.png" alt="sent" style={{ width: "20px" }} />
          </Button> */}
          <Button onClick={submitFunction} variant="ghost">
            <img src="/send.png" alt="sent" style={{ width: "20px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
