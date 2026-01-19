import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/app/layout/appLayout.tsx'
import MainPage from '@/pages/main/page.tsx'
import Page1 from '@/pages/page1/page.tsx'
import SecondLayout from '@/app/layout/secondLayout.tsx'
import Path2 from '@/pages/path2/page.tsx'
import Page2 from '@/pages/page2-1/page.tsx'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <MainPage /> },
      { path: '/page1', element: <Page1 /> },
      {
        path: '/path2',
        element: <SecondLayout />,
        children: [
          { path: '', element: <Path2 /> },
          { path: 'page2-1', element: <Page2 /> },
        ],
      },
    ],
  },
])
