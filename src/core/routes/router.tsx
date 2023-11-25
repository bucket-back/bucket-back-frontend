import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import {
  FeedCreate,
  FeedDetail,
  FeedHome,
  MemberHome,
  Home,
  ItemList,
  ItemCreate,
  ItemReview,
  ItemDetail,
  VoteHome,
  VoteCreate,
  VoteDetail,
  BucketCreate,
  Login,
  Signup,
  MemberEdit,
  MemberPassword,
  ItemReviewEdit,
  InventoryHome,
  InventoryDetail,
  InventoryCreate,
  SearchMain,
  SearchHome,
  FeedUpdate,
  BucketHome,
  BucketDetail,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: '',
            element: <FeedHome />,
          },
          {
            path: 'feed',
            element: <FeedHome />,
          },
          {
            path: 'vote',
            element: <VoteHome />,
          },
        ],
      },
      {
        path: 'feed/create',
        element: <FeedCreate />,
      },
      {
        path: 'feed/:feedId',
        element: <FeedDetail />,
      },
      {
        path: 'feed/:feedId/edit',
        element: <FeedUpdate />,
      },
      {
        path: 'vote/create',
        element: <VoteCreate />,
      },
      {
        path: 'vote/:voteId',
        element: <VoteDetail />,
      },
      {
        path: 'search',
        element: <SearchHome />,
        children: [
          { path: '', element: <SearchMain /> },
          { path: 'result', element: <div>result</div> },
        ],
      },
      {
        path: 'item',
        element: <ItemList />,
      },
      {
        path: 'item/create',
        element: <ItemCreate />,
      },
      {
        path: 'item/:itemId',
        element: <ItemDetail />,
      },
      {
        path: 'item/:itemId/review/create',
        element: <ItemReview />,
      },
      {
        path: ':itemId/review/:reviewId/edit',
        element: <ItemReviewEdit />,
      },
      {
        path: 'member/edit',
        element: <MemberEdit />,
      },
      {
        path: 'member/edit/password',
        element: <MemberPassword />,
      },
      {
        path: 'member/:nickname',
        element: <MemberHome />,
      },
      {
        path: 'member/:nickname/inventory',
        element: <InventoryHome />,
      },
      {
        path: 'member/:nickname/inventory/:inventoryId',
        element: <InventoryDetail />,
      },
      {
        path: 'inventory/create',
        element: <InventoryCreate />,
      },
      {
        path: 'member/:nickname/bucket',
        element: <BucketHome />,
      },
      {
        path: 'member/:nickname/bucket/:bucketId',
        element: <BucketDetail />,
      },
      {
        path: 'bucket/create',
        element: <BucketCreate />,
      },
      {
        path: 'member/:nickname/feed',
        element: <div>member nickname feed</div>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
]);
