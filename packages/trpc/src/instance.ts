import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { TRPCPanelMeta } from 'trpc-panel';

export const trpc = initTRPC.meta<TRPCPanelMeta>().context<Context>().create();
