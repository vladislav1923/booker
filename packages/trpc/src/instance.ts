import { initTRPC } from '@trpc/server';
import { TRPCPanelMeta } from 'trpc-panel';

import { Context } from './context';

export const trpc = initTRPC.meta<TRPCPanelMeta>().context<Context>().create();
