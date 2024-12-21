import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
export default function PublicRoutesLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex flex-grow w-full min-h-full mx-auto sm:px-4 max-w-7xl'>
        {children}
      </main>
      <Footer />
    </div>
  )
}

//className='flex flex-grow w-full h-full mx-auto bg-red-400 sm:px-4 max-w-7xl'
