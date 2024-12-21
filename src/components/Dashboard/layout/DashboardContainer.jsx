import Top from './Top'

function DashboardContainer({ children }) {
  return (
    <div className='relative flex flex-col flex-1 w-full overflow-y-scroll text-sm text-gray-600 bg-gray-200 md:text-base'>
      <Top />
      <section className='flex-1 mx-5 md:mx-8 mt-[85px] mb-16 lg:mb-5 rounded-xl'>
        {children}
      </section>
    </div>
  )
}

export default DashboardContainer
