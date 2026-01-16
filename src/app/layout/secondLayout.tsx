import { Outlet } from 'react-router-dom'
import '../../App.css'

export default function SecondLayout() {
  return (
    <>
      <div>Header2!!</div>
      <Outlet />
    </>
  )
}
