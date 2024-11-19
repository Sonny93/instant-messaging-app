export type CommonBase = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type User = CommonBase & {
  username: string;
  avatar: string;
};

export type Message = CommonBase & {
  content: string;
  targetId: number;
  senderId: number;
};
