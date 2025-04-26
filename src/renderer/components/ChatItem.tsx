import { Button } from '@fluentui/react-components';
import { IChat } from 'intellichat/types';
import useChatStore from 'stores/useChatStore';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import ChatIcon from './ChatIcon';

export default function ChatItem({
  chat,
  collapsed,
}: {
  chat: IChat;
  collapsed: boolean;
}) {
  const curChat = useChatStore((state) => state.chat);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: chat.id,
    data: { folderId: chat.folderId || null },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div key={chat.id}>
      <Button
        style={style}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        icon={
          <ChatIcon chat={chat} isActive={curChat && curChat.id === chat.id} />
        }
        appearance="subtle"
        className="w-full justify-start latin"
      >
        {collapsed ? null : (
          <div className="text-sm truncate ...">
            {chat.name?.trim() ||
              chat.summary
                ?.substring(0, 40)
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&')}
          </div>
        )}
      </Button>
    </div>
  );
}
