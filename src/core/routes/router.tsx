import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import { FeedCreate, FeedDetail, FeedHome, Home, MemberHome } from '@/pages';
import BucketCreate from '@/pages/Bucket/BucketCreate';
import ItemCreate from '@/pages/Item/Create';
import ItemList from '@/pages/Item/List';
import ItemReview from '@/pages/Item/Review';
import VoteCreate from '@/pages/Vote/VoteCreate';
import VoteDetail from '@/pages/Vote/VoteDetail';
import VoteHome from '@/pages/Vote/VoteHome';

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
        element: <div>feed feedId edit</div>,
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
        element: <div>search</div>,
      },
      {
        path: 'search/result',
        element: <div>search result</div>,
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
        element: <div>item itemId</div>,
      },
      {
        path: 'item/:itemId/review/create',
        element: <ItemReview />,
      },
      {
        path: 'review/:reviewId/edit',
        element: <div>review reviewId edit</div>,
      },
      {
        path: 'member/edit',
        element: <div>member edit</div>,
      },
      {
        path: 'member/edit/password',
        element: <div>member edit password</div>,
      },
      {
        path: 'member/:memberId',
        element: <MemberHome />,
      },
      {
        path: 'member/:memberId/inventory',
        element: <div>member memberId inventory</div>,
      },
      {
        path: 'member/:memberId/inventory/:inventoryId',
        element: <div>member memberId inventory inventoryId</div>,
      },
      {
        path: 'inventory/create',
        element: <div>inventory create</div>,
      },
      {
        path: 'member/:memberId/bucket',
        element: <div>member memberId bucket</div>,
      },
      {
        path: 'member/:memberId/bucket/:bucketId',
        element: <div>member memberId bucket bucketId</div>,
      },
      {
        path: 'bucket/create',
        element: <BucketCreate />,
      },
      {
        path: 'member/:memberId/feed',
        element: <div>member memberId feed</div>,
      },
      {
        path: 'login',
        element: <div>login</div>,
      },
      {
        path: 'signup',
        element: <div>signup</div>,
      },
      {
        path: '*',
        element: <div>404</div>,
      },
    ],
  },
]);
