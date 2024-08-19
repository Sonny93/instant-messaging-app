export type CommonBase = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type User = CommonBase & {
  username: string;
  email: string;
};

export type Message = CommonBase & {
  content: string;
  targetId: number;
  senderId: number;
};
