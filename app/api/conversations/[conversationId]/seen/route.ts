import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

import prisma from '@/app/libs/prismadb';
import { pusherSever } from '@/app/libs/pusher';

interface IParams {
  conversationId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse('Unthorized', { status: 401 });
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid Id', { status: 400 });
    }

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    const updateMessage = await prisma?.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    pusherSever.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updateMessage],
    });

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation);
    }

    await pusherSever.trigger(
      conversationId!,
      'messages:update',
      updateMessage,
    );

    return NextResponse.json(updateMessage);
  } catch (error: any) {
    return new NextResponse(error, { status: 500 });
  }
}
