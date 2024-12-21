import Breadcrumb from '../../shared/Breadcrumb'
import { Header } from './Header'

export default function DashBoardRight({ children }) {
  return (
    <div className='relative flex flex-col flex-1 w-full overflow-y-scroll text-sm text-gray-600 bg-gray-200 md:text-base'>
      <Header />
      <section className='flex-1 mx-5 md:mx-8 mt-[85px] mb-16 lg:mb-5 rounded-xl'>
        <div className='h-full px-2 py-5 space-y-5 md:px-10 bg-gray-50 rounded-xl'>
          <Breadcrumb homeElement='Home' homeUrl='/' isProtectedRoute={true} />
          {children}
        </div>
      </section>
    </div>
  )
}
