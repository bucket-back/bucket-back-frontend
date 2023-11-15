import { createBrowserRouter } from 'react-router-dom';
import Login from '@/pages/Login';
import App from '@/App';
import { FeedCreate, FeedDetail, FeedHome, Home } from '@/pages';
import ItemCreate from '@/pages/Item/Create';
import ItemList from '@/pages/Item/List';
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
        element: <div>item itemId review create</div>,
      },
      {
        path: 'review/:reviewId/edit',
        element: <div>review reviewId edit</div>,
      },
      {
        path: 'user/edit',
        element: <div>user edit</div>,
      },
      {
        path: 'user/edit/password',
        element: <div>user edit password</div>,
      },
      {
        path: 'user/:userId',
        element: <div>user userId</div>,
      },
      {
        path: 'user/:userId/inventory',
        element: <div>user userId inventory</div>,
      },
      {
        path: 'user/:userId/inventory/:inventoryId',
        element: <div>user userId inventory inventoryId</div>,
      },
      {
        path: 'inventory/create',
        element: <div>inventory create</div>,
      },
      {
        path: 'user/:userId/bucket',
        element: <div>user userId bucket</div>,
      },
      {
        path: 'user/:userId/bucket/:bucketId',
        element: <div>user userId bucket bucketId</div>,
      },
      {
        path: 'bucket/create',
        element: <div>bucket create</div>,
      },
      {
        path: 'user/:userId/feed',
        element: <div>user userId feed</div>,
      },
      {
        path: 'login',
        element: <Login />,
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
