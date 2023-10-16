'use client';

import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body = (props: BodyProps) => {
  const { initialMessages } = props;
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((currentListMessage) => {
        if (find(currentListMessage, { id: message.id })) {
          return currentListMessage;
        }
        return [...currentListMessage, message];
      });

      bottomRef.current?.scrollIntoView();
    };

    pusherClient.bind('messages:new', messageHandler);

    const updateMessageHandler = (newMessage: FullMessageType) => {
        setMessages((currentListMessage) =>
          currentListMessage.map(message => {
            if(message.id === newMessage.id) {
              return newMessage;
            }
            return message
          }),
        );
    }

    pusherClient.bind('messages:update', updateMessageHandler);


    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('messages:update', updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto ">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
