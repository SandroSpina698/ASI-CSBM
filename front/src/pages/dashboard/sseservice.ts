import {SSE_TOPIC} from "../../types/CommonConstants.ts";

let eventSource;

export function subscribeSSE(fetch2: any){
    eventSource = new EventSource(SSE_TOPIC)
    eventSource.onmessage = function (event) {
        console.log(event)
        if (event.type !== "message"){
            fetch2();
        }
    }
    eventSource.onerror = function (event) {
        console.log(event)
        console.error("Erreur sse");
    }
}