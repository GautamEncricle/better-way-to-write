'use client';

import { useState } from 'react';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function FAQ() {
  const { data, loading, error } = useFetchData('/faq');
  const banner = data?.banner || { title: 'FAQ' };
  const faqSections = data?.faqSections || [];
  const experience = data?.experience || {};

  const [activeAccordions, setActiveAccordions] = useState({});

  const handleAccordionToggle = (sectionIndex, itemIndex) => {
    const key = `${sectionIndex}-${itemIndex}`;
    setActiveAccordions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner h-[calc(100vh_-_500px)] max-1023:h-[calc(100vh_-_400px)] py-100 pb-0">
          <div className="container-fluid relative text-center h-full flex items-center justify-center">
            <div className="title-olive">
              <h1>{banner.title || 'FAQ'}</h1>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="accordion-wrapper pt-130 max-1023:pt-50 pb-50">
          <div className="max-w-1008 mx-auto max-1023:px-20 grid gap-y-100">
            {faqSections.length > 0 ? (
              faqSections.map((section, sectionIndex) => (
                <div key={section.id} className="accordion-row">
                  <div className="accordion-container">
                    <div className="title-olive text-center pb-50">
                      <h2 className="h2 flex flex-wrap justify-center gap-x-10">
                        {section.title.split(' ').map((word, index) => (
                          <span key={index}>{word}</span>
                        ))}
                      </h2>
                    </div>
                    {section.questions?.map((item, itemIndex) => (
                      <div key={item.id} className="accordion-grid">
                        <div
                          className="acc-head relative py-20 card p-3 rounded-0 cursor-pointer"
                          onClick={() => handleAccordionToggle(sectionIndex, itemIndex)}
                        >
                          <h5 className="font-heading tracking-01">{item.question}</h5>
                        </div>
                        <div
                          className={`acc-body content global-list rounded-0 pl-5 transition-all duration-300 ${
                            activeAccordions[`${sectionIndex}-${itemIndex}`] ? 'block' : 'hidden'
                          }`}
                        >
                          {item.answerType === 'list' ? (
                            <ul>
                              {item.answer.map((listItem, listIndex) => (
                                <li key={listIndex}>{listItem}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>{item.answer}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-50">
                <p className="text-lg text-gray-600">No FAQ sections available</p>
              </div>
            )}
          </div>
        </section>

        {/* Experience Section */}
        {experience.title && (
          <section className="img-grid-slider py-100 max-1023:py-50">
            <div className="container-fluid relative">
              <div className="grid grid-cols-3 max-639:flex max-639:flex-col gap-20">
                {experience.images &&
                  experience.images.map((item, idx) => (
                    <div key={idx} className="card relative max-639:order-2">
                      {item.includes('.mp4') ? (
                        <>
                          <video
                            className="img-ratio w-full h-full block object-cover rounded-10"
                            src={item}
                            autoPlay
                            muted
                          />
                          <div className="vol absolute top-20 right-20 cursor-pointer">
                            <svg
                              width="14"
                              height="18"
                              viewBox="0 0 14 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13 17V7M7 17V1M1 17V11"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <img
                          src={item || '/placeholder.svg'}
                          className="w-full h-full block object-cover rounded-10"
                          width="414"
                          height="509"
                          alt="experience Kateka"
                        />
                      )}
                    </div>
                  ))}
                <div className="row-start-2 pt-30 max-639:pt-0 max-639:order-1">
                  <div className="img-info max-w-321 max-1023:relative bottom-0">
                    <div className="title-olive">
                      <h2 className="h2">{experience.title}</h2>
                    </div>
                    <div className="mt-40 max-1023:mt-20">
                      <a href="#" className="btn btn-link" role="link" aria-label="EXPLORE">
                        <span>
                          <img
                            src="./src/assets/images/link-arrow.svg"
                            className="transition-all duration-300"
                            width="16"
                            height="14"
                            alt="Arrow"
                          />
                        </span>
                        {experience.buttonText || 'EXPLORE'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </AsyncWrapper>
  );
}
