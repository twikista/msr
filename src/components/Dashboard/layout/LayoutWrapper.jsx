import DashBoardLeft from './DashBoardLeft'
import DashBoardRight from './DashBoardRight'

export default function LayoutWrapper({ children }) {
  return (
    <main className='relative flex h-screen'>
      <DashBoardLeft />
      <DashBoardRight>{children}</DashBoardRight>
    </main>
  )
}
