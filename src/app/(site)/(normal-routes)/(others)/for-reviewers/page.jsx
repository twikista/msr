import React from 'react'
import Main from '../../../../../components/shared/Main'
import { H1, H2, H3 } from '../../../../../components/shared/headings'
import { TextBlock } from '../../../../../components/shared/TextBlock'

export default function ForReviewers() {
  return (
    <Main>
      <H1>Reviewers Guide</H1>
      <p>
        This guide outlines the steps, expectations, and best practices for MSR
        reviewers. It is designed to ensure a thorough, constructive, and
        effecive review process.
      </p>
      <div>
        <H2>Accepting Review Invitations</H2>
        <p>
          Before accepting an invitation to review a manuscript, please consider
          the following:
        </p>
        <ul className='flex flex-col gap-1 pl-5 list-disc'>
          <li>
            Assess whether the manuscript aligns with your specific area of
            expertise and research interests.
          </li>
          <li>
            Ensure you have adequate time to conduct a detailed review within
            the specified deadline.
          </li>
          <li>
            Identify any potential conflicts of interest. If a conflict exists,
            it is essential to decline the review invitation.
          </li>
        </ul>
      </div>
      <div>
        <H2>Conducting the Review</H2>
        <p>
          Once you accept a review invitation, follow these steps to conduct a
          thorough evaluation:
        </p>
        <div className='flex flex-col gap-1'>
          <ol className='flex flex-col gap-2 ml-4 list-decimal'>
            <li>
              <H3>Research the Journal</H3>
              <ul className='flex flex-col gap-1 pl-5 list-disc'>
                <li>
                  Read through the contents of previously published articles of
                  the MSR to get a sense of it’s published content and house
                  style to decide whether the manuscript being reviewed is
                  suitable for the journal or not.
                </li>
                <li>
                  Refer to the MSR&#39;s submission guidelines to ensure the
                  manuscript meets the submission criteria of the journal (e.g.
                  length, scope, and style of presentation).
                </li>
              </ul>
            </li>
            <li>
              <H3>Evaluate the Manuscript</H3>
              <p>Assess the manuscript using the following criteria:</p>
              <ul className='flex flex-col gap-1 pl-5 list-disc'>
                <li>
                  <TextBlock
                    headingText='Scope of the Journal'
                    text='Determine if the manuscript&#39;s content fit within the scope of the MSR?'
                    className='p-0'
                  />
                </li>
                <li>
                  <TextBlock
                    headingText='Originality'
                    text='Evaluate whether the manuscript presents novel findings that contribute significantly to existing knowledge in the subject area.'
                    className='p-0'
                  />
                </li>
                <li>
                  <div>
                    <H3>Structure</H3>
                    <ul className='flex flex-col gap-1 list-[square] pl-5'>
                      <li>
                        <p>
                          <span className=''>Title: </span>
                          Check if the manuscript&#39;s title is descriptive and
                          suitable.
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Abstract: </span>
                          Ensure it accurately reflects the content and includes
                          relevant keywords.
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Introduction: </span>
                          Determine if it clearly defines the research aims and
                          context and provides a logical progression from prior
                          research to the present study
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Method: </span>
                          Verify that the research methods are well-described
                          and appropriate. Ascertain that there is sufficient
                          information (including the procedures followd and how
                          the prodedures are ordered) to aid replication. New
                          methods should be adequately explained.
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Results: </span>
                          Confirm that findings are presented logically and
                          clearly, and appropriate statistical analysis has been
                          conducted.
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Discussion: </span>
                          Evaluate wheter findings are interpreted clearly and
                          contextualized within existing literature.
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Conclusion: </span>
                          Ensure conclusions are supported by data and indicate
                          advancements in scientific knowledge.
                        </p>
                        Check for relevance, sufficiency, and adherence to
                        citation style (e.g., APA).
                      </li>
                      <li>
                        <p>
                          <span className=''>References: </span>
                          Check references for relevance, sufficiency, and
                          adherence to MSR&#39;s citation style (APA 7th
                          edition).
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className=''>Figures and Tables: </span>
                          Assess whether they are clear, informative, necessary,
                          accurate, easy to interpret, and accurately represent
                          the data.
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <TextBlock
                    headingText='Language'
                    text='Ensure the manuscript is written in clear and grammatically correct English that aid understanding of the reader. Note any significant grammatical issues but do not correct them; instead, inform the editor if necessary.'
                    className='p-0'
                  />
                </li>
              </ul>
            </li>
            <li>
              <div>
                <H3>Provide Detailed Comment</H3>
                <p>
                  Your comments should aim to clarify and enhance the
                  manuscript. Ensure feedback is:
                </p>
                <ul className='flex flex-col gap-1 pl-5 list-disc'>
                  <li>
                    <p>
                      <span className='font-medium'>Constructive: </span>
                      Focus on enhancing clarity, quality, and presentation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium'>Curteous: </span>
                      Avoid personal remarks. Address the manuscript, not the
                      author.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium'>Specific: </span>
                      Highlight strengths and areas for improvement, providing
                      actionable suggestions.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium'>Evidence-based: </span>
                      Support critiques with examples or data.
                    </p>
                  </li>
                </ul>
                <div className='flex flex-col p-2 mt-1 bg-gray-100 rounded-lg w-fit'>
                  <H3>Note:</H3>
                  <p>
                    Keep comments anonymous and organized under headings (e.g.,
                    Major Comments, Minor Comments).
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <H3>Make a Recommendation</H3>
                <p>
                  After evaluating the manuscript, provide a recommendation to
                  the editor from one of the following options:
                </p>
                <ul className='flex flex-col gap-1 pl-5 list-disc'>
                  <li>
                    <p>
                      <span className='font-medium'>Accept Submission: </span>
                      The manuscript is ready for publication with minimal
                      changes; no further peer review needed.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium'>Minor Revision: </span>
                      Small, specific improvements are needed (e.g., fixing
                      typos, clarifying points); list specific revisions.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium'>Major Revision: </span>
                      Substantial changes are required (e.g., additional data
                      analysis, rewriting sections). The manuscript may undergo
                      another round of peer review.
                    </p>
                  </li>
                  <li>
                    <p>
                      <span className='font-medium'>Reject: </span>
                      The manuscript is unsuitable for publication, either due
                      to fundamental revisions, lack of originality, major
                      methodological flaws, or misalignment with journal scope.
                    </p>
                  </li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div>
        <H2>Additional Considerations</H2>
        <ul className='flex flex-col gap-1 pl-5 list-disc'>
          <li>
            <TextBlock
              className='p-0'
              headingText='Confidentiality'
              text='All submissions must remain confidential throughout the review process. Do not discuss any details with third parties without explicit permission from the editor.'
            />
          </li>
          <li>
            <TextBlock
              className='p-0'
              headingText='Communication'
              text='Do not contact authors directly regarding their submissions; all communication should go through the editor.'
            />
          </li>

          <li>
            <TextBlock
              className='p-0'
              headingText=' Integrity of Recommendations'
              text='Your feedback will significantly influence editorial decisions; ensure it is constructive and well-supported by evidence.'
            />
          </li>
          <li>
            <TextBlock
              className='p-0'
              headingText=' Reporting Misconduct'
              text='If you suspect plagiarism or unethical practices (e.g., falsified results), notify the editor immediately with detailed evidence.'
            />
          </li>
        </ul>
      </div>
    </Main>
  )
}
