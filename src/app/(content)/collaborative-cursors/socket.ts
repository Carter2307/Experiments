"use client"

import { io } from "socket.io-client";

//const serverUrl = "http://localhost:4000"
const serverUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""
export const socket = io(serverUrl);
