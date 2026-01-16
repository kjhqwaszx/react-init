import { Outlet } from 'react-router-dom'
import Header from '@/shared/ui/Header.tsx'
import '../../App.css'

export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
