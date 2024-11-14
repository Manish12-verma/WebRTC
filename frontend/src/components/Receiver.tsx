import { useEffect } from "react";

export function Receiver(){

    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')
        //socket.onopen is an event handler that is triggered when the WebSocket connection is successfully established.

        socket.onopen=()=>{
            socket.send(JSON.stringify({type:'receiver'}));
        }
        
    socket.onmessage= async (event)=>{ // when message is received from sender
        const message = JSON.parse(event.data);
    if(message.type==='createOffer'){
      
        //create answer 
        const pc = new RTCPeerConnection();
        pc.setRemoteDescription(message.sdp);
        const answer =  await pc.createAnswer();
        await pc.setLocalDescription(answer)
        socket?.send(JSON.stringify({type:'createOffer',sdp: pc.localDescription}));

    }

    }
    },[]);

    
    return <div>
        Receiver
    </div>
}