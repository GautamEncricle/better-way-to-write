'use client';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Conservation() {
  const { data, loading, error } = useFetchData('/conservation');
  const banner = data?.banner || {};
  const commonContent = data?.commonContent || {};
  const approachSection = data?.approachSection || {};
  const impactSection = data?.impactSection || {};
  const projects = data?.projects || [];

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
          <div className="container-fluid relative">
            <div className="title-olive text-center pb-60 sticky top-180 max-1023:top-120">
              <h1 className="h1">{banner.title || 'CONSERVATION'}</h1>
            </div>
            <div className="img relative">
              <img
                src={banner.image || '/placeholder.svg'}
                className="img-ratio rounded-10"
                width="1280"
                height="620"
                alt="Conservation Banner"
              />
            </div>
          </div>
        </section>

        {/* Common Content Section */}
        <section className="common-content py-100 pt-210 max-1023:py-30">
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

        {/* Approach Section */}
        {approachSection.title && (
          <section className="text-wtih-video py-100 max-1023:py-30 relative">
            <div className="bg-tree-img absolute top-0 left-0 w-full h-screen">
              <img
                src={approachSection.backgroundImage || '/placeholder.svg'}
                width="100%"
                height="1235"
                alt=""
              />
            </div>
            <div className="px-177 max-1365:px-50 max-1023:px-20 relative z-9">
              <div className="flex flex-wrap -mx-18 max-1023:mx-0 max-1023:gap-y-20">
                <div className="lg:w-7/12 w-full px-9 max-1023:px-0">
                  <div className="img h-451 max-767:h-auto max-767:pt-[75.42%] relative">
                    <img
                      src={approachSection.image || '/placeholder.svg'}
                      className="img-ratio rounded-10"
                      width="598"
                      height="451"
                      alt={approachSection.title}
                    />
                  </div>
                </div>
                <div className="lg:w-5/12 w-full px-9 max-1023:px-0">
                  <div className="bg-olive h-451 max-767:h-auto rounded-10 p-80 max-1365:p-40 max-1023:p-20 flex flex-col justify-center">
                    <div className="title-gray">
                      <h2 className="h2 flex">
                        {approachSection.title.split(' ').map((word, index) => (
                          <span key={index}>{word}</span>
                        ))}
                      </h2>
                    </div>
                    <div className="content white pt-35 max-1023:pt-15">
                      <p>{approachSection.content}</p>
                    </div>
                    <div className="mt-35">
                      <a
                        href={approachSection.link || '#'}
                        className="btn btn-link btn-link-white"
                        role="link"
                        aria-label="DISCOVER"
                      >
                        <span>
                          <img
                            src="./src/assets/images/link-arrow.svg"
                            className="transition-all duration-300"
                            width="16"
                            height="14"
                            alt="Arrow"
                          />
                        </span>
                        {approachSection.buttonText || 'DISCOVER'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Our Impact Section */}
        {impactSection.title && (
          <section className="icon-grid relative z-9 py-100 max-1023:py-30">
            <div className="container-fluid">
              <div className="text-center title-olive pb-50">
                <h2 className="h2 flex flex-wrap justify-center gap-x-10">
                  {impactSection.title.split(' ').map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
                </h2>
              </div>
              <div className="flex flex-wrap justify-center gap-x-80 gap-y-20">
                {impactSection.items?.map(item => (
                  <div key={item.id} className="icon-grid-bx">
                    <div className="icon">
                      <img
                        src={item.icon || '/placeholder.svg'}
                        width="98"
                        height="75"
                        alt={item.title}
                      />
                    </div>
                    <h6>{item.title}</h6>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="img-listing py-100 max-1023:py-30 relative z-9">
            <div className="container-fluid-lg">
              <div className="grid gap-y-25">
                {projects.map(project => (
                  <div key={project.id} className="img-listing-grid flex flex-wrap items-center">
                    <div className="lg:w-4/12 w-full">
                      <div className="img relative">
                        <img
                          src={project.image || '/placeholder.svg'}
                          className="w-full h-full object-cover rounded-10 block"
                          width="266"
                          height="266"
                          alt={project.title}
                        />
                      </div>
                    </div>
                    <div className="lg:w-8/12 w-full max-1023:pt-30">
                      <div className="right-content pl-45 max-1023:pl-0">
                        <div className="title-olive">
                          <h2 className="h2 flex flex-wrap gap-x-10">
                            {project.title.split(' ').map((word, index) => (
                              <span key={index}>{word}</span>
                            ))}
                          </h2>
                        </div>
                        <div className="content pt-45 max-1023:pt-20">
                          <p>{project.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </AsyncWrapper>
  );
}
