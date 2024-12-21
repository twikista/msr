import Breadcrumb from './Breadcrumb'
import Aside from '../Aside'

function Main({ children, showAside = true }) {
  return (
    <div className='flex flex-col flex-1 w-full gap-5 px-3 mx-auto text-sm 2xl:px-0 text-neutral-600 md:text-base lg:flex-row '>
      <section className='flex flex-col flex-1 gap-0 pb-12 border-gray-200 lg:border-r lg:pr-10'>
        <Breadcrumb
          homeElement='Home'
          homeUrl='/'
          isProtectedRoute={false}
          separator='/'
        />
        <div className='flex flex-col gap-6'>{children}</div>
      </section>
      {showAside && <Aside />}
    </div>
  )
}

export default Main
