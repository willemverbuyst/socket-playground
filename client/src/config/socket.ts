import { io } from "socket.io-client";

export const nodeSocket1 = io("http://localhost:8080", { autoConnect: false });
export const nodeSocket2 = io("http://localhost:8081");
export const pythonSocket = io("http://localhost:8082");
export const denoSocket = io("http://localhost:8083");
