"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Home } from "lucide-react"; // Added the Home icon
import { cn } from "@/lib/utils";
import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [loading, isLoading] = React.useState(false);

  return (
    <div className="w-full h-full overflow-auto p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-4 w- h-4" />
          Nuevo Chat
        </Button>
      </Link>

      <div className="h-full overflow-y-auto pb- flex flex-col gap-4 mt-4">
        <div className="absolute bottom-2 left-2">
          <div className="rounded-lg p-3 text-slate-100 flex items-center">
            <Link href="/">
              <Home className="mr-8 w-7 h-5" /> {/* Added the Home icon */}
              
            </Link>
          </div>
        </div>
        <div className="absolute bottom-2 right-2">
          <SubscriptionButton isPro={isPro} />
        </div>
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-100 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-" />
              <p className="w-full text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
