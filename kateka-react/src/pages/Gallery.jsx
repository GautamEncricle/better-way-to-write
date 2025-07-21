'use client';

import { useState } from 'react';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Gallery() {
  const { data, loading, error } = useFetchData('/gallery');
  const banner = data?.banner || {};
  const galleryItems = data?.galleryItems || [];
  const categories = data?.categories || [];
  const commonContent = data?.commonContent || {};
  const teamData = data?.teamData || {};
  const teamMembers = data?.teamMembers || [];

  const [activeFilter, setActiveFilter] = useState('all');
  const [mediaFilter, setMediaFilter] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const filteredGalleryItems = galleryItems.filter(item => {
    const categoryMatch = activeFilter === 'all' || item.category === activeFilter;
    const mediaMatch =
      mediaFilter === 'All' ||
      (mediaFilter === 'Images' && item.type === 'image') ||
      (mediaFilter === 'Videos' && item.type === 'video');
    return categoryMatch && mediaMatch;
  });

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
          <div className="container-fluid relative">
            <div className="title-olive text-center pb-60 sticky top-180 max-1023:top-120">
              <h2 className="h2">{banner.title || 'GALLERY'}</h2>
            </div>
            <div className="img relative">
              <img
                src={banner.image || './src/assets/images/stay-single-banner.webp'}
                className="img-ratio rounded-10"
                width="1280"
                height="620"
                alt="Gallery"
              />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-wrapper pt-125 max-1023:pt-50">
          <div className="container-fluid">
            <div className="flex flex-wrap items-center justify-between w-full m-0 p-0 mb-38 last:mb-0">
              <div className="w-full lg:w-1/2">
                <ul className="flex flex-wrap items-center justify-start max-1023:gap-20 gap-38">
                  <li>
                    <button
                      type="button"
                      className={`filter-btn-link ${activeFilter === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveFilter('all')}
                    >
                      All
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        type="button"
                        className={`filter-btn-link ${activeFilter === category.value ? 'active' : ''}`}
                        onClick={() => setActiveFilter(category.value)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="relative inline-flex lg:justify-end w-full">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-20 px-20 py-11 border border-olive rounded-10 text-olive font-body font-normal text-body-4 tracking-01"
                  >
                    <span>
                      Media: <span>{mediaFilter}</span>
                    </span>
                    <svg
                      className="w-24 h-24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute z-10 mt-48 w-fit min-w-200 bg-white border border-olive rounded-10 shadow-md overflow-hidden">
                      {['All', 'Images', 'Videos'].map(option => (
                        <li
                          key={option}
                          className="px-10 py-5 hover:bg-olive/30 cursor-pointer text-olive font-body font-normal text-body-4 tracking-01"
                          onClick={() => {
                            setMediaFilter(option);
                            setDropdownOpen(false);
                          }}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <div className="gallery-grid">
              {filteredGalleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`gallery-item item${index + 1}`}
                  data-category={item.category}
                >
                  <a href={item.src} data-lity>
                    {item.type === 'video' ? (
                      <video
                        className="w-full h-full block object-cover"
                        src={item.src}
                        autoPlay
                        muted
                      />
                    ) : (
                      <img
                        src={item.src || '/placeholder.svg'}
                        width="430"
                        height="240"
                        alt={item.alt || 'Gallery'}
                      />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Content Section */}
        <section className="common-content py-210 max-1023:py-50">
          <div className="container-fluid">
            <div className="max-w-993 mx-auto">
              <div className="title-olive">
                <h2 className="h2">
                  {commonContent.title ||
                    'Lorem ipsum dolor sit amet, consecteturd do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'}
                </h2>
              </div>
            </div>
          </div>
        </section>

        {/* Meet The Team Section */}
        <section className="meet-team-wrapper pb-100 max-1023:pb-50">
          <div className="container-fluid text-center">
            <div className="text-center title-olive mb-38 last:mb-0">
              <h2 className="h2">{teamData.title || 'Meet The Team'}</h2>
            </div>
            <div className="content max-w-530 mx-auto mb-40 last:mb-0">
              <p>
                {teamData.description ||
                  'Lorem ipsum dolor sit amet, consecteturd do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.'}
              </p>
            </div>
          </div>

          <div className="group/section relative flex max-h-[100lvh] flex-col items-center justify-center overflow-hidden mt-38">
            <div className="moving-teams flex w-[190%] shrink-0 flex-col justify-center group-data-[active]/section:opacity-0 lg:w-[110%]">
              {/* First Row */}
              <div className="moving-teams-row -mr-[100%] grid w-[300%] shrink-0 grid-cols-[repeat(3,1fr)]">
                <div className="grid h-fit grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(4,1fr)] will-change-transform">
                  {teamMembers.slice(0, 4).map(member => (
                    <div
                      key={member.id}
                      className="h-fit w-full px-[2.75vw] py-[3.5vw] lg:px-[.8625vw] lg:py-[.8625vw] block"
                    >
                      <div className="team relative aspect-[352/200] size-full rounded-10 overflow-hidden">
                        <img
                          src={member.image || '/placeholder.svg'}
                          className="rounded-16 aspect-[352/200] size-full object-cover object-center group-data-[active]/active-scene:rounded-24"
                          width="430"
                          height="240"
                          alt="Meet Team"
                        />
                        <button
                          type="button"
                          className="info-icon absolute top-18 left-18"
                          onClick={() => handleTooltipToggle(member.id)}
                        >
                          <img
                            src="./src/assets/images/info.svg"
                            width="24"
                            height="24"
                            alt="Info"
                          />
                        </button>
                        <div
                          className={`info-content ${
                            activeTooltip === member.id ? 'flex' : 'hidden'
                          } flex-wrap gap-10 bg-gray rounded-10 py-8 px-10 w-fit absolute top-18 left-18`}
                        >
                          <div className="close" onClick={() => setActiveTooltip(null)}>
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 9 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="11.6838"
                                height="0.906947"
                                transform="matrix(-0.716639 -0.697444 -0.345254 0.938509 8.6875 8.14868)"
                                fill="#302D2B"
                              />
                              <rect
                                width="11.6838"
                                height="0.906947"
                                transform="matrix(0.716639 -0.697444 0.345254 0.938509 0 8.14868)"
                                fill="#302D2B"
                              />
                            </svg>
                          </div>
                          <div className="ctm-content flex flex-col w-fit max-w-[calc(100%_-_9px)]">
                            <h6 className="font-extralight !text-body-4 !leading-18 inline-block !font-body">
                              {member.name}
                            </h6>
                            <span className="uppercase font-normal text-body-5 tracking-05">
                              {member.jobTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Second Row */}
              <div className="moving-teams-row grid w-[300%] shrink-0 grid-cols-[repeat(3,1fr)]">
                <div className="grid h-fit grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(4,1fr)] will-change-transform">
                  {teamMembers.slice(4, 8).map(member => (
                    <div
                      key={member.id}
                      className="h-fit w-full px-[2.75vw] py-[3.5vw] lg:px-[.8625vw] lg:py-[.8625vw] block"
                    >
                      <div className="team relative aspect-[352/200] size-full rounded-10 overflow-hidden">
                        <img
                          src={member.image || '/placeholder.svg'}
                          className="rounded-16 aspect-[352/200] size-full object-cover object-center group-data-[active]/active-scene:rounded-24"
                          width="430"
                          height="240"
                          alt="Meet Team"
                        />
                        <button
                          type="button"
                          className="info-icon absolute top-18 left-18"
                          onClick={() => handleTooltipToggle(member.id)}
                        >
                          <img
                            src="./src/assets/images/info.svg"
                            width="24"
                            height="24"
                            alt="Info"
                          />
                        </button>
                        <div
                          className={`info-content ${
                            activeTooltip === member.id ? 'flex' : 'hidden'
                          } flex-wrap gap-10 bg-gray rounded-10 py-8 px-10 w-fit absolute top-18 left-18`}
                        >
                          <div className="close" onClick={() => setActiveTooltip(null)}>
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 9 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="11.6838"
                                height="0.906947"
                                transform="matrix(-0.716639 -0.697444 -0.345254 0.938509 8.6875 8.14868)"
                                fill="#302D2B"
                              />
                              <rect
                                width="11.6838"
                                height="0.906947"
                                transform="matrix(0.716639 -0.697444 0.345254 0.938509 0 8.14868)"
                                fill="#302D2B"
                              />
                            </svg>
                          </div>
                          <div className="ctm-content flex flex-col w-fit max-w-[calc(100%_-_9px)]">
                            <h6 className="font-extralight !text-body-4 !leading-18 inline-block !font-body">
                              {member.name}
                            </h6>
                            <span className="uppercase font-normal text-body-5 tracking-05">
                              {member.jobTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Third Row */}
              <div className="moving-teams-row -mr-[100%] grid w-[300%] shrink-0 grid-cols-[repeat(3,1fr)]">
                <div className="grid h-fit grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(4,1fr)] will-change-transform">
                  {teamMembers.slice(8, 12).map(member => (
                    <div
                      key={member.id}
                      className="h-fit w-full px-[2.75vw] py-[3.5vw] lg:px-[.8625vw] lg:py-[1.125vw] block"
                    >
                      <div className="team relative aspect-[352/200] size-full rounded-10 overflow-hidden">
                        <img
                          src={member.image || '/placeholder.svg'}
                          className="rounded-16 aspect-[352/200] size-full object-cover object-center group-data-[active]/active-scene:rounded-24"
                          width="430"
                          height="240"
                          alt="Meet Team"
                        />
                        <button
                          type="button"
                          className="info-icon absolute top-18 left-18"
                          onClick={() => handleTooltipToggle(member.id)}
                        >
                          <img
                            src="./src/assets/images/info.svg"
                            width="24"
                            height="24"
                            alt="Info"
                          />
                        </button>
                        <div
                          className={`info-content ${
                            activeTooltip === member.id ? 'flex' : 'hidden'
                          } flex-wrap gap-10 bg-gray rounded-10 py-8 px-10 w-fit absolute top-18 left-18`}
                        >
                          <div className="close" onClick={() => setActiveTooltip(null)}>
                            <svg
                              width="9"
                              height="9"
                              viewBox="0 0 9 9"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width="11.6838"
                                height="0.906947"
                                transform="matrix(-0.716639 -0.697444 -0.345254 0.938509 8.6875 8.14868)"
                                fill="#302D2B"
                              />
                              <rect
                                width="11.6838"
                                height="0.906947"
                                transform="matrix(0.716639 -0.697444 0.345254 0.938509 0 8.14868)"
                                fill="#302D2B"
                              />
                            </svg>
                          </div>
                          <div className="ctm-content flex flex-col w-fit max-w-[calc(100%_-_9px)]">
                            <h6 className="font-extralight !text-body-4 !leading-18 inline-block !font-body">
                              {member.name}
                            </h6>
                            <span className="uppercase font-normal text-body-5 tracking-05">
                              {member.jobTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AsyncWrapper>
  );
}
