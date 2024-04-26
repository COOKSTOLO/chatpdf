import ChatComponent from "@/components/ChatComponent";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

// Define the Props type
type Props = {
  params: {
    chatId: string;
  };
};

// Create the ChatPage component
const ChatPage = async ({ params: { chatId } }: Props) => {
  // Authenticate the user
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }

  
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect("/");
  }

  
  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));
  const isPro = await checkSubscription();

  return (
    <div className="flex h-screen w-full">
      <div className="flex w-full h-full">
        {/* Chat sidebar */}
        <div className="w-1/4 h-full overflow-auto border-l-4 border-l-slate-200">
          <ChatSideBar chats={_chats} chatId={parseInt(chatId)} isPro={isPro} />
        </div>
        {/* PDF viewer */}
        <div className="w-1/2 h-full overflow-auto p-4">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        {/* Chat component */}
        <div className="w-1/4 h-full overflow-auto border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
