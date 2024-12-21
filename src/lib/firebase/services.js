import { articleFileName } from '../helper'
import { storage } from './firebase-config'
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

export const uploadPdfToStorage = async (formData) => {
  const fileName = articleFileName(formData)
  const articlesRef = ref(storage, `articles/${fileName}`)
  const data = await uploadBytes(articlesRef, formData.pdfFile[0], {
    contentDisposition: `attachment; filename=${fileName}`,
  })
  const url = await getDownloadURL(data.ref)
  return url
}

export const removePdfFromStorage = async (fileUrl) => {
  try {
    const articleRef = ref(storage, fileUrl)

    const exisitingFile = await getDownloadURL(articleRef)
    if (exisitingFile) {
      const del = await deleteObject(articleRef)
      const deletedFile = await getDownloadURL(articleRef)
      return
    }
  } catch (error) {}
}
