import LayoutWrapper from '@/components/Dashboard/layout/LayoutWrapper'
import React from 'react'
import { auth } from '../../../../../../../../auth'
import { deleteArticle, getArticle } from '@/lib/actions/articles'
import Authors from '@/components/Dashboard/Authors'
import Link from 'next/link'
import { ImFilePdf } from 'react-icons/im'
import EditButton from '@/components/Dashboard/buttons/EditButton'
import DeleteButton from '@/components/Dashboard/buttons/DeleteButton'
import Image from 'next/image'
import ArticleInfo from '@/components/Dashboard/articles/ArticleInfo'
import { joinKeywords } from '@/lib/helper'
import ccLogo from '@/../public/by.png'

export default async function ArticlePage({ params }) {
  const { user } = await auth()
  const article = await getArticle(params)
  console.log(article)
  console.log(params)
  return (
    <LayoutWrapper>
      <div>
        <h2 className='mb-2 text-base font-bold sm:text-2xl'>
          {article.title}
        </h2>
        <ArticleInfo article={article} />
        <section className='flex flex-col py-2 space-y-2 border-t border-b sm:space-y-0 border-neutral-300'>
          <Authors authors={article.authors} withAffliation={true} />
        </section>
        <div className='py-2'>
          <p>
            <span className='font-semibold'>Keywords:</span>
            <span className='capitalize'>{` ${joinKeywords(
              article.keywords
            )}`}</span>
          </p>
        </div>
        <section className='mt-5 space-y-10'>
          <div className='space-y-3'>
            <h4 className='font-bold'>Abstract</h4>
            <p className='text-justify'>{article.abstract}</p>
          </div>
          <div>
            <div className='h-[1px] bg-neutral-300 mt-2' />
            <div className='flex flex-col items-center gap-2 mt-3 md:flex-row md:justify-center'>
              <Link
                href={`/dashboard/issues/${params.issue}/${params.article}/view`}
                className=' btn gap-2 font-medium text-center text-white transition-colors border hover:bg-[#ac3dba] hover:border-[#ac3dba] bg-secondary'
              >
                <span>View PDF</span>
                <ImFilePdf className='size-5 text-' />
              </Link>
              {user.role === 'admin' && !article.published ? (
                <EditButton
                  href={`/dashboard/issues/${params.issue}/${params.article}/edit`}
                  label='edit Article'
                />
              ) : null}
              {user.role === 'admin' && !article.published ? (
                <DeleteButton
                  variant='primary'
                  id={String(article._id)}
                  action={deleteArticle}
                  label='Delete Article'
                  className=''
                />
              ) : null}
            </div>
          </div>
          <div>
            <a
              href='https://creativecommons.org/licenses/by/4.0/'
              target='_blank'
            >
              <Image
                src={ccLogo}
                alt='creative commons logo'
                width={500}
                height={500}
                className='w-20 sm:w-[100px]'
              />
            </a>
            <div className=''>
              This work is licensed under a &nbsp;
              <a
                href='https://creativecommons.org/licenses/by/4.0/'
                target='_blank'
                className='text-blue-500 underline hover:text-blue-600'
              >
                Creative Commons Attribution 4.0 International License.
              </a>
            </div>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}
