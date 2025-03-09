import dynamic from 'next/dynamic'
import { connectDB } from '@/lib/mongoose/config'
import { Article } from '@/lib/mongoose/models'

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), {
  ssr: false,
})

const getArticle = async (slug) => {
  connectDB()
  const article = await Article.findOne({
    ref: `${slug.issue}`,
    slug: `${slug.article}`,
  })

  return article
}

async function ViewPDF({ params }) {
  const article = await getArticle(params)
  return (
    <div className='flex flex-col min-h-screen bg-neutral-600'>
      <PDFViewer filePath={article.pdfUrl} params={params} />
    </div>
  )
}

export default ViewPDF
