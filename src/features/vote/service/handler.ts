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

    const response = await axiosClient.get<GetVotesResponse>(
      `${BASE_URL}/?hobby=${hobby}&status=${status}${sortQueryString}`,
      {
        params,
      }
    );

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
    return await axiosClient.post<null>(`${BASE_URL}/${voteId}/participation`, {
      itemId,
    });
  },
  getVoteDetail: async (voteId: number) => {
    const response = await axiosClient.get<GetVoteDetailResponse>(`${BASE_URL}/${voteId}`);

    return response.data;
  },
  deleteVote: async (voteId: number) => {
    return await axiosClient.delete<null>(`${BASE_URL}/${voteId}`);
  },
  deleteVoteCancel: async (voteId: number) => {
    return await axiosClient.delete<null>(`${BASE_URL}/${voteId}/cancel`);
  },
};

export default voteApi;
