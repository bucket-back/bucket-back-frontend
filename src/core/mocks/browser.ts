import { setupWorker } from 'msw/browser';
import { handler as feedHandler } from './handler/feed';
import { handler as itemHandler } from './handler/item';
import { handler as voteHandler } from './handler/vote';

export const worker = setupWorker(...voteHandler, ...feedHandler, ...itemHandler);
