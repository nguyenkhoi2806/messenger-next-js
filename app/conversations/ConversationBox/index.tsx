"use client";

import { Conversation, Message, User } from "@prisma/client";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import { FullConversationType } from "@/app/types";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox = (props: ConversationBoxProps) => {
  const { data, selected } = props;
  return <div>index</div>;
};

export default ConversationBox;
