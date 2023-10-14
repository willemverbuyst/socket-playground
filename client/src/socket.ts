import { io } from "socket.io-client";

const URL1 = "http://localhost:8080";

export const socket1 = io(URL1, { autoConnect: false });

const URL2 = "http://localhost:8081";

export const socket2 = io(URL2);

const URL3 = "http://localhost:8082";

export const socket3 = io(URL3);

const URL4 = "http://localhost:8083";

export const socket4 = io(URL4);
