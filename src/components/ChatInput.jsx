import React, { useState, useEffect, useRef } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from "@/components/ui/button";

const ChatInput = () => {
  const dummy = useRef()
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [chat, setChat] = useState([]);

  const startListen =()=> SpeechRecognition.startListening({ continuous: true });
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
      // console.log("Transcript:", transcript);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitFunction(e);
    }
  };
  return (
    <div className="flex flex-col justify-between h-full gap-4 w-full min-h-fit relative">
    {chat.map((d, index)=>{
      return(
      <Alert key={index} className={` drop-shadow-md border-2 rounded-xl  ${index%2===0 ?'border-amber-500 bg-green-100':'border-amber-500 bg-amber-500'}`} style={{backgroundColor: index%2===0 && '#141f49', color: index%2===0 && 'white'}}>
        <AlertTitle className={`flex gap-2 ${index%2===0 && 'justify-end'}`}>
        
          <img src={index%2===0 ? 'user.png':'pizza.png'} alt="sent" style={{ width: '20px' }} />
          <p className="font-bold">{index%2===0 ? 'User':'PizzaBot'}</p>
        </AlertTitle>
        <AlertDescription className={`font-semibold flex gap-2 ${index%2===0 && 'justify-end'}`}>{d}</AlertDescription>
      </Alert>
      )
    })}
    <div ref={dummy} className="mb-28 h-1/4"></div>
      <div
        className="chat-input-container  p-4 border-b-4 rounded-xl flex flex-col bg-white fixed bottom-10 left-32 right-32"
        style={{
          borderBottomColor: "#fd8c29",
          borderWidth: "4px",
          borderTopColor: "current",
          borderLeftColor: "current",
          borderRightColor: "current",
        }}
      >
        <div className="input-area" >
          <input
            type="text"
            placeholder="I can help you with your order..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
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
            <Button onClick={startListen} variant="ghost">
              <img src="/on.png" alt="sent" style={{ width: "20px" }} />
            </Button>
          )}
          <Button onClick={submitFunction} variant="ghost">
            <img src="/sen.png" alt="sent" style={{ width: "25px" }} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
