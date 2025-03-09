import LayoutWrapper from '@/components/Dashboard/layout/LayoutWrapper'
import React, { Suspense } from 'react'

import { getArticle } from '@/lib/actions/articles'
import EditArticleForm from '@/components/Dashboard/forms/edit-article'

export default async function EditArticlePage({ params }) {
  const article = await getArticle(params)
  const plainArticleObject = JSON.parse(JSON.stringify(article))
  const initialValue = {
    ...plainArticleObject,
    pdfFile: null,
  }

  return (
    <LayoutWrapper>
      <Suspense fallback={<div>loading...</div>}>
        <EditArticleForm initialValue={initialValue} params={params} />
      </Suspense>
    </LayoutWrapper>
  )
}
