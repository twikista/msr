import Link from 'next/link'
import React from 'react'

const info = [
  { name: 'For readers', href: '/for-readers' },
  { name: 'For Authors', href: '/for-authors' },
  { name: 'For Librarians', href: '/for-librarians' },
]
export default function Information() {
  return (
    <div>
      <h3>Information</h3>
      <nav>
        <ul>
          {info.map((item) => (
            <li key={item.name}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
