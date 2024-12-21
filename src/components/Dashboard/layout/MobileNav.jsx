import { auth } from '../../../../auth'
import MobileNavItems from './MobileNavItems'

export default async function MobileNav() {
  const session = await auth()
  return (
    <nav className='flex bg-[#ac3dba] fixed z-30 bottom-0 left-0 right-0 md:px-8 lg:hidden py-1 px-3 overflow-x-scroll overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden [&::-webkit-overflow-scrolling]:touch'>
      <MobileNavItems session={session} />
    </nav>
  )
}

// className={clsx('', {
//   [`flex gap-2 overflow-x-scroll overflow-y-hidden whitespace-nowrap [&::-webkit-scrollbar]:hidden [&::-webkit-overflow-scrolling]:touch border border-gray-300 bg-gray-300 mt-1 px-2 py-1 rounded-md`]:
//     !!displayedKeywords.length,
// })}
