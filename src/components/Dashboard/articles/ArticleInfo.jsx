import { dateHelperFunction } from '@/lib/helper'

function ArticleInfo({ article }) {
  return (
    <div className='flex flex-col gap-[2px] text-sm md:items-center sm:flex-row md:text-base text-primary'>
      <span className=''>{`Published: ${dateHelperFunction(
        article?.publishDate,
        'long'
      )}`}</span>
      <span className='hidden sm:block'>&#124;</span>
      <span className=''>
        {`Vol ${article.volume} No. ${article.issue} (${new Date(
          article.publishDate
        ).getFullYear()}) pp. ${article.slug}`}
      </span>
    </div>
  )
}

export default ArticleInfo
