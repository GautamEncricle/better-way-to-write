'use client';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Offers() {
  const { data, loading, error } = useFetchData('/offers');

  const banner = data?.banner || {};
  const commonContent = data?.commonContent || {};
  const offers = data?.offersList || [];

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner transparent-banner h-[calc(100vh_-_300px)] max-1023:h-[calc(100vh_-_400px)] py-100">
          <div className="container-fluid relative text-center h-full flex items-center justify-center">
            <div className="title-olive">
              <h1>{banner.title || 'OFFERS'}</h1>
            </div>
          </div>
        </section>

        {/* Common Content Section */}
        <section className="common-content pb-100 max-1023:pb-30">
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

        {/* Offers Section */}
        <section id="offerWrapper" className="offer-wrapper py-100 max-1023:py-50">
          <div className="container-fluid">
            <div className="flex flex-wrap items-start relative">
              <div className="lg:w-6/12 w-full">
                <div className="offer-grid">
                  {offers.length > 0 ? (
                    offers.map((offer, index) => (
                      <div key={offer.id || index} className="offer-grid-content">
                        <h5>{offer.title}</h5>
                        <div className="og-content">
                          <div className="content pt-20">
                            <p>{offer.description}</p>
                          </div>
                          <div className="mt-30">
                            <a
                              href={offer.link || '#'}
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
                              {offer.buttonText || 'ENQUIRE NOW'}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-50">
                      <p className="text-lg text-gray-600">No offers available</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:w-6/12 w-full pl-60 max-1023:hidden">
                <div className="offer-right h-full">
                  {offers.length > 0 &&
                    offers.map((offer, index) => (
                      <div key={`img-${offer.id || index}`} className="offer-grid-img">
                        <img
                          src={offer.image || './src/assets/images/offer-img1.webp'}
                          className="rounded-10 w-598 h-451 block object-cover"
                          width="598"
                          height="451"
                          alt={offer.title || 'Offer'}
                        />
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
