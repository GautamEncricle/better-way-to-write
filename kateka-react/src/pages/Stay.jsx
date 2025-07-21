'use client';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Stay() {
  const { data, loading, error } = useFetchData('/stay');

  const banner = data?.banner || {};
  const accommodations = data?.accommodations || [];
  const discover = data?.discover || {};

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner transparent-banner h-[calc(100vh_-_300px)] max-1023:h-[calc(100vh_-_400px)] py-100">
          <div className="container-fluid relative text-center h-full flex items-center justify-center">
            <div className="title-olive">
              <h1>{banner.title || 'Stay'}</h1>
            </div>
          </div>
        </section>

        {/* Stay Listing Section */}
        <section className="stay-listing py-100 max-1023:py-50">
          <div className="container-fluid grid gap-y-225 max-1023:gap-y-50">
            {accommodations.length > 0 ? (
              accommodations.map((accommodation, index) => (
                <div
                  key={accommodation.id}
                  className={`stay-listing-group ${
                    index === 0 ? 'firstimg' : index === 1 ? 'secondimg' : 'thirdimg'
                  } imgFadeup`}
                >
                  <div className="flex flex-wrap items-end">
                    <div
                      className={`${index === 0 ? 'lg:w-8/12' : 'lg:w-6/12'} w-full relative ${
                        index === 0
                          ? 'pr-50 max-1023:pr-0'
                          : index === 1
                            ? 'pl-50 max-1023:pl-0'
                            : ''
                      }`}
                    >
                      <div className="listing-info w-full">
                        <div className="left-content">
                          <div className="title-olive max-w-370">
                            <h2 className="h2">{accommodation.title}</h2>
                          </div>
                          <div className="content-listing pt-35">
                            <ul>
                              {accommodation.keyFacts?.map((fact, factIndex) => (
                                <li key={factIndex}>{fact}</li>
                              )) || (
                                <>
                                  <li>Key Fact</li>
                                  <li>Sleeping x</li>
                                  <li>x Bathrooms</li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="content max-w-448 pt-15">
                            <p>{accommodation.description}</p>
                          </div>
                          <div className="pt-35">
                            <a
                              href="#"
                              className="btn btn-link"
                              role="link"
                              aria-label="ENQUIRE NOW"
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
                              ENQUIRE NOW
                            </a>
                          </div>
                        </div>
                        {accommodation.images && accommodation.images[1] && (
                          <div
                            className={`img imgAnim ${
                              index === 0
                                ? '-mt-120 max-1023:mt-0'
                                : index === 1
                                  ? 'hidden max-1023:block'
                                  : 'hidden max-1023:block'
                            } w-329 h-219 max-1365:w-300 max-992:w-full max-992:mt-20 max-767:pt-[40.00%] relative`}
                          >
                            <img
                              src={accommodation.images[1] || '/placeholder.svg'}
                              className="w-full h-full object-cover block rounded-10"
                              width="329"
                              height="219"
                              alt={accommodation.title}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      className={`${index === 0 ? 'lg:w-4/12' : 'lg:w-6/12'} w-full max-1023:mt-30`}
                    >
                      <div className="img imgAnim relative img-503-286">
                        <img
                          src={accommodation.images?.[0] || '/placeholder.svg'}
                          className="img-ratio rounded-10"
                          width="503"
                          height="286"
                          alt={accommodation.title}
                        />
                      </div>
                    </div>
                  </div>
                  {index === 1 && accommodation.images && accommodation.images[1] && (
                    <div className="flex justify-center mt-50 max-1023:hidden">
                      <div className="img imgAnim w-329 h-219 max-1365:w-300 max-1199:w-210">
                        <img
                          src={accommodation.images[1] || '/placeholder.svg'}
                          className="w-full h-full object-cover block rounded-10"
                          width="226"
                          height="219"
                          alt={accommodation.title}
                        />
                      </div>
                    </div>
                  )}
                  {index === 2 && accommodation.images && accommodation.images[1] && (
                    <div className="lg:w-6/12 w-full flex justify-end pr-50 -mt-30 max-1023:hidden">
                      <div className="img imgAnim w-329 h-219 max-1365:w-300 max-1199:w-210">
                        <img
                          src={accommodation.images[1] || '/placeholder.svg'}
                          className="w-full h-full object-cover block rounded-10"
                          width="329"
                          height="219"
                          alt={accommodation.title}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-50">
                <p className="text-lg text-gray-600">No accommodations available</p>
              </div>
            )}
          </div>
        </section>

        {/* Discover Section */}
        {discover.title && (
          <section className="discover-text-overlay py-100 max-1023:py-50">
            <div className="container-fluid">
              <div className="text-center title-olive">
                <h2 className="h2">{discover.title}</h2>
              </div>
              <div className="discover-grid py-80 max-1023:pt-30 max-1023:pb-0 overflow-hidden">
                <div className="flex flex-col gap-y-20">
                  {discover.sections?.map((section, index) => (
                    <a
                      key={index}
                      href={section.link || '#'}
                      className="w-ull text-center relative discover-item"
                    >
                      <div className="discover-item-row">
                        <div className="discover-bx">
                          <h2>{section.title}</h2>
                        </div>
                        <div className="discover-img max-1023:hidden">
                          <img
                            src={section.image || '/placeholder.svg'}
                            className="hidden-img rounded-10"
                            width="264"
                            height="267"
                            alt={section.title}
                          />
                        </div>
                      </div>
                    </a>
                  )) || (
                    <>
                      <a href="#" className="w-ull text-center relative discover-item">
                        <div className="discover-item-row">
                          <div className="discover-bx">
                            <h2>Wellness</h2>
                          </div>
                          <div className="discover-img max-1023:hidden">
                            <img
                              src="./src/assets/images/wellness.webp"
                              className="hidden-img rounded-10"
                              width="264"
                              height="267"
                              alt="Wellness"
                            />
                          </div>
                        </div>
                      </a>
                      <a href="#" className="w-ull text-center relative discover-item">
                        <div className="discover-item-row">
                          <div className="discover-bx">
                            <h2>safari</h2>
                          </div>
                          <div className="discover-img max-1023:hidden">
                            <img
                              src="./src/assets/images/safari.webp"
                              className="hidden-img rounded-10"
                              width="264"
                              height="267"
                              alt="Safari"
                            />
                          </div>
                        </div>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </AsyncWrapper>
  );
}
