"use client";

import { useMousePosition } from "@/components/hook";
import React, { Fragment, useState } from "react";
import { socket } from "../socket";
import { Stack } from "@/components/layouts/Stack/Stack";

interface Cursor {
  id: string;
  x: number;
  y: number;
}

function generateCursorWithColor(color: string) {
  const svg = `
  <svg
    width="21"
    height="23"
    viewBox="0 0 21 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.505 21L1.747 1.85 19 11.301l-8.498 2.465L5.505 21z"
      fill="${color}"
      stroke="#fff"
      stroke-width="1.2"
    />
  </svg>
  `;

  const base64Svg = btoa(svg);

  return `data:image/svg+xml;base64,${base64Svg}`;
}

export default function Canvas() {
  const [isOnCanvas, setIsOnCanvas] = React.useState(false);
  const [users, setUsers] = React.useState<
    { id: string; x: number; y: number }[]
  >([]);
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  function handleMouseEnter(e: React.MouseEvent) {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = `none`;
    }

    setIsOnCanvas(true);
  }

  function handleMouseLeave(e: React.MouseEvent) {
    if (canvasRef.current) {
      canvasRef.current.style.cursor = `default`;
    }
    setIsOnCanvas(false);
  }

  React.useEffect(() => {
    function onSocketInit(initialCursors: Cursor[]) {
      if (initialCursors) {
        console.log(initialCursors)
        setUsers(initialCursors);
      }
    }

    function onCursorMove(data: { id: string; x: number; y: number }) {
      setUsers((prev) => {
        if (prev.length === 0) {
          return [data];
        }

        return prev.map((u) => {
          if (u.id === data.id) {
            u.x = data.x;
            u.y = data.y;
          }

          return u;
        });
      });
    }

    function onConnect() {
      console.log("connected");
    }
    function onDisconnect(id: string) {
      setUsers(prev => {
        return prev.filter(u => u.id !== id);
      })
      console.log("disconnected");
    }

    function onNewUser(data: any) {
      console.log(data);
      setUsers((prev) => [...prev, data]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("user_disconnected", onDisconnect);

    socket.on("init", onSocketInit);
    socket.on("new_user", onNewUser);
    socket.on("cursor_move", onCursorMove);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("init", onSocketInit);
      socket.off("cursor_move", onCursorMove);
      socket.off("new_user", onNewUser);
      socket.off("user_disconnected", onDisconnect);
    };
  }, []);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={canvasRef}
    >
      <CursorBox
        id={socket.id}
        isOnCanvas={isOnCanvas}
        mousePosition={mousePos}
        isCurrentUser={true}
        canvasRef={canvasRef}
      />
      {users &&
        users.map((u, index) => {
          return (
            <CursorBox
              id={u.id}
              key={index}
              showPointer
              isOnCanvas={isOnCanvas}
              label={`user-${index}`}
              isCurrentUser={false}
              mousePosition={{ x: u.x, y: u.y }}
              canvasRef={canvasRef}
            />
          );
        })}
    </div>
  );
}

function CursorBox(props: {
  id?: string;
  isOnCanvas: boolean;
  label?: string;
  mousePosition: { x: number; y: number };
  showPointer?: boolean;
  isCurrentUser: boolean;
  canvasRef: any;
}) {
  const {
    isOnCanvas,
    id,
    isCurrentUser,
    mousePosition,
    label,
    canvasRef,
    showPointer = false,
  } = props;
  const boxRef = React.useRef<HTMLDivElement>(null);
  const cursorTextBoxGap = 8;
  const [cursor, setCursor] = React.useState<string>();
  const [color, setColor] = React.useState<string>("#000");

  React.useEffect(() => {
    if (!isCurrentUser) {
      const randomColor = {
        r: Math.round(Math.random() * 255),
        g: Math.round(Math.random() * 255),
        b: Math.round(Math.random() * 255),
      };
      const color = `rgb(${randomColor.r}, ${randomColor.g}, ${randomColor.b})`;
      const cursor = generateCursorWithColor(color);
      setCursor(cursor);
      setColor(color);
    } else {
      const cursor = generateCursorWithColor(color);
      setCursor(cursor);
    }

    function onMouseMove(e: MouseEvent) {
      if (isOnCanvas) {
        socket.emit("cursor_move", { x: e.x, y: e.y });
      }
    }

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
    }
  }, [isOnCanvas]);

  React.useEffect(() => {
    if (boxRef.current && mousePosition.x && mousePosition.y) {
      const box = boxRef.current;
      const canvas = canvasRef.current;

      if (boxRef && canvas) {
        const computedY = `${mousePosition.y - canvas.getBoundingClientRect().y - box.clientHeight / 2}`;
        const computedX = `${mousePosition.x - canvas.getBoundingClientRect().x - box.clientWidth / 2}`;
        boxRef.current.style.top = `${computedY}px`;
        boxRef.current.style.left = `${computedX}px`;
      }
    }
  }, [isOnCanvas, boxRef, mousePosition]);

  return (
    <Stack direction="col" className="absolute" ref={boxRef} gapy={4} key={id}>
      {cursor && (
        <img
          className="relative h-6 w-6 left-[-16px]"
          src={cursor}
          style={{
            zIndex: isCurrentUser ? 1 : 0,
          }}
        />
      )}
      <div
        className="inline-block relative capitalize whitespace-nowrap  py-2 pl-4 pr-5 text-white font-semibold text-sm rounded-[1.5rem] rounded-tl-[2px]  will-change-transform"
        style={{
          transformOrigin: "top left",
          backgroundColor: isCurrentUser ? "black" : color,
          zIndex: isCurrentUser ? 1 : 0,
        }}
      >
        {isCurrentUser ? "You" : label}
      </div>
    </Stack>
  );
}
