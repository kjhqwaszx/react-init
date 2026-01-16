import { router } from '../router.tsx'
import { RouterProvider } from 'react-router-dom'

export function AppProviders() {
  return <RouterProvider router={router} />
}
