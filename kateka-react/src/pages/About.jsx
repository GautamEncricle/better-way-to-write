'use client';

import { useState } from 'react';
import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function About() {
  const { data, loading, error } = useFetchData('/aboutPage');
  const [activeInfo, setActiveInfo] = useState(null);

  const toggleInfo = index => {
    setActiveInfo(activeInfo === index ? null : index);
  };

  if (!data) return null;

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
          <div className="container-fluid relative">
            <div className="title-olive text-center pb-60 sticky top-180 max-1023:top-120">
              <h2 className="h2">{data.banner.title}</h2>
            </div>
            <div className="img relative">
              <img
                src={data.banner.image || '/placeholder.svg'}
                className="img-ratio rounded-10"
                width="1280"
                height="620"
                alt={data.banner.alt}
              />
            </div>
          </div>
        </section>

        <section className="common-content py-210 max-1023:py-50">
          <div className="container-fluid">
            <div className="max-w-993 mx-auto">
              <div className="title-olive">
                <h2 className="h2">{data.commonContent.title}</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="meet-team-wrapper pb-100 max-1023:pb-50">
          <div className="container-fluid text-center">
            <div className="text-center title-olive mb-38 last:mb-0">
              <h2 className="h2">{data.meetTeam.title}</h2>
            </div>
            <div className="content max-w-530 mx-auto mb-40 last:mb-0">
              <p>{data.meetTeam.description}</p>
            </div>
          </div>
          <div className="group/section relative flex max-h-[100lvh] flex-col items-center justify-center overflow-hidden mt-38">
            <div
              data-target="moving-portraits.scene"
              className="moving-teams flex w-[190%] shrink-0 flex-col justify-center group-data-[active]/section:opacity-0 lg:w-[110%]"
            >
              {[...Array(2)].map((_, rowIndex) => (
                <div
                  key={rowIndex}
                  data-target={`moving-portraits.row-${rowIndex % 2 === 0 ? 'odd' : 'even'}`}
                  className={`moving-teams-row ${rowIndex % 2 === 0 ? '-mr-[100%]' : ''} grid w-[300%] shrink-0 grid-cols-[repeat(3,1fr)]`}
                >
                  <div className="grid h-fit grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(4,1fr)] will-change-transform">
                    {data.meetTeam.teamMembers.map((member, index) => (
                      <div
                        key={index}
                        className="h-fit w-full px-[2.75vw] py-[3.5vw] lg:px-[.8625vw] lg:py-[.8625vw] block"
                      >
                        <div
                          data-target="moving-portraits.portrait"
                          className="team relative aspect-[352/200] size-full rounded-10 overflow-hidden"
                        >
                          <img
                            src={member.image || '/placeholder.svg'}
                            className="rounded-16 aspect-[352/200] size-full object-cover object-center group-data-[active]/active-scene:rounded-24"
                            width="430"
                            height="240"
                            alt={member.alt}
                          />
                          <button
                            type="button"
                            className="info-icon absolute top-18 left-18"
                            onClick={() => toggleInfo(index)}
                          >
                            <img
                              src="./src/assets/images/info.svg"
                              width="24"
                              height="24"
                              alt="Info"
                            />
                          </button>
                          {activeInfo === index && (
                            <div className="info-content flex-wrap gap-10 bg-gray rounded-10 py-8 px-10 w-fit absolute top-18 left-18">
                              <div className="close" onClick={() => toggleInfo(null)}>
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
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </AsyncWrapper>
  );
}
