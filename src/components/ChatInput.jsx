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
        <div key={index} className={`flex ${index%2===0 && 'justify-end'} w-full my-2`}>
      <Alert className={` drop-shadow-md border rounded-xl  inline-block max-w-max my-2 ${index%2===0 && 'justify-end'}`} >
        <AlertTitle className={`flex gap-2 ${index%2===0 && 'justify-end'}`}>
        



        {index%2 ===0 ? (<img src='user.png' alt="sent" style={{ width: '20px' }} />) :
        (<svg width="60" viewBox="0 0 142 31" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logoTitle">
                                  <title id="logoTitle">Belden</title>
                                  <g fill-rule="evenodd">
                                    <path d="M8.931 18.256l.632-.006c1.6-.017 3.593-.039 4.556.913.43.425.638 1.022.638 1.823 0 .697-.196 1.232-.598 1.632-1.031 1.032-3.212 1.028-4.803 1.025h-.73v-5.387h.305zM8.697 6.825c2.585 0 3.986.379 3.986 2.381 0 1.691-1.065 2.38-3.674 2.38h-.383V6.825h.07zM.477 0H0v30.467h12.298c7.095 0 11.164-3.171 11.164-8.696 0-4.287-1.955-6.873-5.508-7.712 1.796-1.252 2.728-3.166 2.728-5.91 0-5.408-3.11-8.149-9.245-8.149H.477zM41.928 0h-17.27v30.467h17.747v-7.45h-9.12v-4.136h8.65V11.43h-8.65V7.45h9.12V0zM77.021 29.213c5.818-1.658 9.89-6.71 9.955-13.952l-.001-.088C86.898 7.95 82.829 2.912 77.02 1.257c6.626 1.357 11.693 6.19 11.736 13.872v.154c-.018 7.716-5.093 12.57-11.736 13.93zm6.94-14.006c-.063-6.284-3.488-10.391-8.705-11.632 5.816.868 10.324 4.9 10.332 11.623v.019c-.008 6.722-4.544 10.727-10.36 11.594 5.218-1.24 8.67-5.319 8.733-11.604zm-10.023 8.966c4.373-1.04 7.21-3.721 7.28-8.966-.07-5.243-2.907-7.924-7.28-8.964 4.88.728 8.727 3.312 8.746 8.944v.041c-.019 5.631-3.865 8.216-8.746 8.945zM72.001 7.47c4.747.101 7.694 3.046 7.694 7.762 0 4.764-2.876 7.63-7.694 7.758V7.47zM74.734 0H63.376v30.467h11.358c8.529 0 15.467-6.834 15.467-15.234C90.201 6.834 83.263 0 74.734 0zM52.22 0h-8.15v30.467h17.825v-7.45h-9.199V0zM109.176.002H91.908V30.47h17.745v-7.453h-9.122v-4.134h8.654v-7.451h-8.654V7.453h9.122V.002zM141.386.002h-8.15v17.234C131.856 15.46 119.817.002 119.817.002h-8.38V30.47h8.626V13.198A81697.69 81697.69 0 0 0 133.48 30.47h8.384V.002h-.478z" fill="#004990">
                                    </path>
                                  </g>
                                </svg>)
        }



          
          <p className="font-bold">{index%2===0 ? 'User':'Sales Bot'}</p>
        </AlertTitle>
        <AlertDescription className={`font-semibold flex gap-2 ${index%2===0 && 'justify-end'}`}>{d}</AlertDescription>
      </Alert>
      </div>
      )
    })}
    <div ref={dummy} className="mb-24 h-1/4"></div>
      <div
        className="chat-input-container  p-4 border-b-4 rounded-xl flex flex-col bg-white fixed bottom-4 left-32 right-32"
        style={{
          borderBottomColor: "#004990",
          borderWidth: "3px",
          borderTopColor: "current",
          borderLeftColor: "current",
          borderRightColor: "current",
        }}
      >
      <div className="flex justify-between">

        <div className="input-area flex-1" >
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
        {browserSupportsSpeechRecognition && (
          listening ? (
            <Button onClick={SpeechRecognition.stopListening} variant="ghost">
              <img src="/stop.png" alt="sent" style={{ width: "20px" }} />
            </Button>
          ) : (
            <Button onClick={startListen} variant="ghost">
              <img src="/on.png" alt="sent" style={{ width: "20px" }} />
            </Button>
          )
        )
        }
          <Button onClick={submitFunction} variant="ghost">
            <img src="/sen.png" alt="sent" style={{ width: "25px" }} />
          </Button>
        </div>
      </div>

        <div className='flex gap-16 font-medium justify-between items-center'>
        <div className="flex gap-8 cursor-pointer">
        <p className='hover:text-belden hover:scale-105'>Menu</p>
        <p className='hover:text-belden hover:scale-105'>Offers</p>
        <p className='hover:text-belden hover:scale-105'>Contact us</p>
        </div>
      {!browserSupportsSpeechRecognition && <p className="text-xs text-slate-400 text-right">browser doesn't support speeech to text</p>}
      </div>
      </div>
    </div>
  );
};

export default ChatInput;
