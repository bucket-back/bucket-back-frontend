import { setupWorker } from 'msw/browser';
import { handler as voteHandler } from './handler/vote';
import { handler as feedHandler } from './handler/feed';

export const worker = setupWorker(...voteHandler, ...feedHandler);
