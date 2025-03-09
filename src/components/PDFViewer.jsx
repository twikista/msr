'use client'
import { useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Document, Page, pdfjs } from 'react-pdf'

import { FiMinus, FiPlus } from 'react-icons/fi'
import { LiaArrowLeftSolid } from 'react-icons/lia'
import { BsDownload } from 'react-icons/bs'
import { Tooltip } from 'react-tooltip'
import Spinner from './shared/Spinner'
// import 'pdfjs-dist/build/pdf.worker.min.mjs'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

function PDFViewer({ filePath, params }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(null)
  const [pageWidth, setPageWidth] = useState(0)
  const [scale, setScale] = useState(1)
  const [pdfloaded, setPdfLoaded] = useState(false)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth > 900 ? 900 : pageNumber)
    // setLoading(false)
    setPdfLoaded(true)
  }

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages))
  }

  const decreaseScale = () => {
    setScale((prevPageNumber) => Math.max(prevPageNumber - 0.1, 0.7))
  }

  const increseScale = () => {
    setScale((prevPageNumber) => Math.min(prevPageNumber + 0.1, 2))
  }

  const renderLoadingindicator = () => (
    <div className='flex flex-row-reverse gap-2 mt-52'>
      <p className='text-gray-50'>Getting PDF Ready...</p>
      <Spinner basic={true} />
    </div>
  )

  return (
    <div className='flex flex-col items-center bg-neutral-600 relative mt-[100px] mb-30'>
      {pdfloaded && (
        <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between shadow-lg bg-[#353839] border-b border-neutral-600 h-[58px] px-3'>
          <Link
            href={
              searchParams.get('ref') === 'current'
                ? `/current/${params.issue}/${params.article}`
                : pathname.includes('archive')
                ? `/archive/${params.issue}/${params.article}`
                : `/dashboard/issues/${params.issue}/${params.article}`
            }
            data-tooltip-id='back'
            data-tooltip-content='Back'
            data-tooltip-place='top'
            className='px-2 py-1 text-gray-200 hover:bg-neutral-600'
          >
            <LiaArrowLeftSolid className='size-5' />
            <Tooltip id='back' />
          </Link>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              onClick={decreaseScale}
              className='p-1 text-gray-200 hover:bg-neutral-600'
              data-tooltip-id='zoomout'
              data-tooltip-content='Zoom Out'
              data-tooltip-place='left-start'
            >
              <Tooltip id='zoomout' />
              <FiMinus className='size-4 sm:size-5' />
            </button>
            <button
              type='button'
              onClick={increseScale}
              className='p-1 text-gray-200 hover:bg-neutral-600'
              data-tooltip-id='zoomin'
              data-tooltip-content='Zoom In'
              data-tooltip-place='top'
            >
              <FiPlus className='size-4 sm:size-5' />
              <Tooltip id='zoomin' />
            </button>
            <p className='px-1 sm:px-2 py-[1px] sm:py-[2px] text-gray-200 bg-neutral-600'>{`${(
              scale * 100
            ).toFixed(0)}%`}</p>
          </div>

          <div>
            <div>
              <a
                href={filePath}
                download
                target='_blank'
                rel='noreferrer'
                className='flex w-[60pxpx] items-center justify-center text-gray-200 px-2 py-1 border border-gray-200 sm:w-[140px] hover:bg-gray-200 hover:text-neutral-700 transition-colors  text-center gap-2'
              >
                <BsDownload className='w-4' />

                <span className='hidden sm:block'>Download</span>
              </a>
            </div>
          </div>
        </div>
      )}
      <div className='flex min-h-screen w-fit'>
        <Document
          file={filePath}
          pageMode='useThumbs'
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode='canvas'
          // onLoadError={(error) =>
          //   console.error(
          //     'Error occurred while loading document:',
          //     error.message
          //   )
          // }
          loading={renderLoadingindicator()}
        >
          {Array.from({ length: numPages }, (_, i) => i + 1).map((i, index) => (
            <div key={i} className='flex flex-col'>
              <Page
                pageNumber={i}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                key={i}
                onLoadSuccess={onPageLoadSuccess}
                width={Math.max(pageWidth * 0.8, 340)}
                scale={scale}
                loading=''
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  )
}

export default PDFViewer
