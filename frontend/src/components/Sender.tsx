import { useEffect, useState } from "react"

export function Sender(){

    const [socket,setSocket] = useState<WebSocket |null>(null);

useEffect(()=>{
    const socket = new WebSocket('ws://localhost:8080')
    //socket.onopen ====> is an event handler that is triggered when the WebSocket connection is successfully established.


    socket.onopen=()=>{
        socket.send(JSON.stringify({type:'sender'}));
    }
    setSocket(socket);
},[]);
    async function  startSendingVideo(){
        if(!socket) return;

        const pc =new RTCPeerConnection();
        const offer = await pc.createOffer();  //sdp =>session description protocol
        await pc.setLocalDescription(offer);  
        socket?.send(JSON.stringify({type:'createOffer', sdp:offer}));


        socket.onmessage = (event)=>{
            const data = JSON.parse(event.data);
             if(data.type ==="createAnswer"){
             pc.setRemoteDescription(data.sdp);
             }
        }

    }
    return <div>
        Sender
        <button onClick={startSendingVideo}>Send video</button>
    </div>
}