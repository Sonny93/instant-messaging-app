import type { HttpContext } from '@adonisjs/core/http';
import transmit from '@adonisjs/transmit/services/main';

transmit.authorizeChannel<{ senderId: string; targetId: string }>(
  'chat/:senderId/:targetId',
  (ctx: HttpContext, { senderId, targetId }) => {
    return ctx.auth.user?.id === +senderId || ctx.auth.user?.id === +targetId;
  }
);
