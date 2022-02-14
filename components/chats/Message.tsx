import React from 'react';
import { cls } from '../../libs/client/util';

interface IMessage {
  reversed?: boolean;
  message: string;
  avatarUrl?: string;
}

function Message({ reversed, message, avatarUrl }: IMessage) {
  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        reversed ? 'flex-row-reverse space-x-reverse' : ''
      )}
    >
      <div className="h-8 w-8 rounded-full bg-slate-400" />
      <div className="w-1/2 rounded-md border border-gray-300 p-2 text-sm text-gray-700">
        {message}
      </div>
    </div>
  );
}

export default Message;
