import {
  GetVoteDetailResponse,
  GetVotesRequest,
  GetVotesResponse,
  PostVoteParticipationRequest,
  PostVotesRequest,
  PostVotesResponse,
} from './types';

import httpClient from '@/core/service/httpClient';

const BASE_URL = 'votes';

const voteApi = {
  getVotes: async ({ hobby, sort, status, cursorId, size = 10 }: GetVotesRequest) => {
    const sortQueryString = sort ? `&sort=${sort}` : '';
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}?hobby=${hobby}&status=${status}${sortQueryString}`;

    return await httpClient.get<GetVotesResponse>(url, {
      params,
    });
  },

  postVotes: async ({ hobby, content, item1Id, item2Id }: PostVotesRequest) => {
    const body = { hobby, content, item1Id, item2Id };

    return await httpClient.post<PostVotesResponse, typeof body>(BASE_URL, body);
  },

  postVoteParticipation: async ({ voteId, itemId }: PostVoteParticipationRequest) => {
    const url = `${BASE_URL}/${voteId}/participation`;
    const body = { itemId };

    return await httpClient.post<null, typeof body>(url, body);
  },

  getVoteDetail: async (voteId: number) => {
    const url = `${BASE_URL}/${voteId}`;

    return await httpClient.get<GetVoteDetailResponse>(url);
  },

  deleteVote: async (voteId: number) => {
    const url = `${BASE_URL}/${voteId}`;

    return await httpClient.delete<null>(url);
  },

  deleteVoteCancel: async (voteId: number) => {
    const url = `${BASE_URL}/${voteId}/cancel`;

    return await httpClient.delete<null>(url);
  },
};

export default voteApi;
