import DashBoardLeft from '../../../../components/Dashboard/layout/DashBoardLeft'
import DashBoardRight from '../../../../components/Dashboard/layout/DashBoardRight'
import { Header } from '../../../../components/Dashboard/layout/Header'
import Breadcrumb from '../../../../components/shared/Breadcrumb'

export default function DashboardLayout({ children }) {
  // const segments = useSelectedLayoutSegments()
  return (
    <main className='relative flex h-screen'>
      <DashBoardLeft />
      <DashBoardRight>{children}</DashBoardRight>

      {/* {!segments.includes('blabla') ? (
        <>
          <DashBoardLeft />
          <DashBoardRight>{children}</DashBoardRight>
        </>
      ) : (
        children
      )} */}
      {/* <>
        <div className='relative flex flex-col flex-1 w-full overflow-y-scroll text-sm text-gray-600 bg-gray-200 md:text-base'>
          <Header />
          <section className='flex-1 mx-5 md:mx-8 mt-[85px] mb-16 lg:mb-5 rounded-xl'>
            <div className='h-full px-2 py-5 space-y-5 md:px-10 bg-gray-50 rounded-xl'>
              <Breadcrumb
                homeElement='Home'
                homeUrl='/'
                isProtectedRoute={true}
              />
              {children}
            </div>
          </section>
        </div>
      </> */}
    </main>
  )
}
