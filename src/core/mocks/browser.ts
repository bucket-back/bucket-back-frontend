import { setupWorker } from 'msw/browser';
import { handler as voteHandler } from './handler/vote';

export const worker = setupWorker(...voteHandler);
