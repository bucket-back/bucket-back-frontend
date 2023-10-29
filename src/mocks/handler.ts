import { http, HttpResponse } from 'msw';

// interface UserInfo {
//   email: string;
//   password: number;
//   nickname: string;
// }

const baseMemberUrl = '/api/members';

export const handler = [
  http.post(`${baseMemberUrl}/signup`, async ({ request }) => {
    // 제대로 들어왔는지 확인
    const userInfo = await request.json();
    console.log(userInfo);
    return new HttpResponse(null, 200);
  }),
];
