import {
  GetVoteDetailResponse,
  GetVotesRequest,
  GetVotesResponse,
  PostVoteParticipationRequest,
  PostVotesRequest,
  PostVotesResponse,
} from './types';
import { axiosClient } from '@/core/service/axios';

const BASE_URL = 'votes';

const voteApi = {
  getVotes: async ({ hobby, sort, status, cursorId, size }: GetVotesRequest) => {
    const sortQueryString = sort ? `&sort=${sort}` : '';
    const params = cursorId ? { cursorId, size } : { size };
    const url = `${BASE_URL}?hobby=${hobby}&status=${status}${sortQueryString}`;

    const response = await axiosClient.get<GetVotesResponse>(url, {
      params,
    });

    return response.data;
  },
  postVotes: async ({ hobby, content, item1Id, item2Id }: PostVotesRequest) => {
    const response = await axiosClient.post<PostVotesResponse>(BASE_URL, {
      hobby,
      content,
      item1Id,
      item2Id,
    });

    return response.data;
  },
  postVoteParticipation: async ({ voteId, itemId }: PostVoteParticipationRequest) => {
    const url = `${BASE_URL}/${voteId}/participation`;

    return await axiosClient.post<null>(url, {
      itemId,
    });
  },
  getVoteDetail: async (voteId: number) => {
    const url = `${BASE_URL}/${voteId}`;

    const response = await axiosClient.get<GetVoteDetailResponse>(url);

    return response.data;
  },
  deleteVote: async (voteId: number) => {
    const url = `${BASE_URL}/${voteId}`;

    return await axiosClient.delete<null>(url);
  },
  deleteVoteCancel: async (voteId: number) => {
    const url = `${BASE_URL}/${voteId}/cancel`;

    return await axiosClient.delete<null>(url);
  },
};

export default voteApi;
