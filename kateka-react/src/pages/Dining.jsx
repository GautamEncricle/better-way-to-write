'use client';

import { useState } from 'react';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Dining() {
  const { data, loading, error } = useFetchData('/dining');
  const banner = data?.banner || {};
  const commonContent = data?.commonContent || {};
  const gallerySlider = data?.gallerySlider || {};
  const menuSection = data?.menuSection || {};
  const diningOptions = data?.diningOptions || [];
  const discover = data?.discover || {};

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (gallerySlider.images) {
      setCurrentSlide(prev => (prev + 1) % gallerySlider.images.length);
    }
  };

  const prevSlide = () => {
    if (gallerySlider.images) {
      setCurrentSlide(
        prev => (prev - 1 + gallerySlider.images.length) % gallerySlider.images.length
      );
    }
  };

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
          <div className="container-fluid relative">
            <div className="title-olive text-center pb-60 sticky top-180 max-1023:top-120">
              <h1 className="h1">{banner.title || 'Dining'}</h1>
            </div>
            <div className="img relative">
              <img
                src={banner.image || './src/assets/images/dining-banner.webp'}
                className="img-ratio rounded-10"
                width="1280"
                height="620"
                alt="Dining"
              />
            </div>
          </div>
        </section>

        {/* Common Content Section */}
        <section className="common-content py-100 pt-210 max-1023:py-30 relative">
          <div className="bg-tree-img addshadow absolute top-0 left-0 w-full h-screen">
            <img
              src={commonContent.backgroundImage || './src/assets/images/tree-bg4.svg'}
              width="100%"
              height="1235"
              alt=""
            />
          </div>
          <div className="container-fluid relative z-9">
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

        {/* Gallery Slider Section */}
        <section className="gallery-slider-wrapper py-100 max-1023:py-30 relative z-9">
          <div className="container-fluid">
            <div className="gallery-slider rounded-10 mb-30 relative">
              {gallerySlider.images && gallerySlider.images.length > 0 && (
                <div className="img relative">
                  <img
                    src={gallerySlider.images[currentSlide] || '/placeholder.svg'}
                    className="img-ratio rounded-10"
                    width="1280"
                    height="565"
                    alt="Gallery"
                  />
                </div>
              )}
            </div>
            {gallerySlider.images && gallerySlider.images.length > 1 && (
              <div className="gallery-thumb-slider flex gap-4 justify-center">
                {gallerySlider.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${index === currentSlide ? 'opacity-100' : 'opacity-60'}`}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <div className="img relative w-20 h-20">
                      <img
                        src={image || '/placeholder.svg'}
                        className="img-ratio rounded-10 w-full h-full object-cover"
                        width="80"
                        height="80"
                        alt="Gallery Thumbnail"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Menu Section */}
        {menuSection.title && (
          <section className="stay-listing py-100 max-1023:py-30">
            <div className="container-fluid grid gap-y-225 max-1023:gap-y-50">
              <div className="stay-listing-group thirdimg imgFadeup">
                <div className="flex flex-wrap items-start">
                  <div className="lg:w-6/12 w-full relative order-2 pl-50 max-1023:pl-0">
                    <div className="listing-info justify-end">
                      <div className="left-content">
                        <div className="title-olive max-w-370">
                          <h2 className="h2">{menuSection.title}</h2>
                        </div>
                        <div className="content-listing pt-35">
                          <ul>
                            {menuSection.keyFacts?.map((fact, index) => (
                              <li key={index}>{fact}</li>
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
                          <p>{menuSection.description}</p>
                        </div>
                        <div className="pt-35 flex flex-wrap gap-4">
                          <a href="#" className="btn btn-link" role="link" aria-label="ENQUIRE NOW">
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
                          <a
                            href={menuSection.menuDownloadLink || '#'}
                            className="btn btn-olive"
                            role="link"
                            aria-label="DOWNLOAD MENU"
                          >
                            {menuSection.menuButtonText || 'DOWNLOAD MENU'}
                            <span>
                              <img
                                src="./src/assets/images/download-ico.svg"
                                className="transition-all duration-300"
                                width="9"
                                height="9"
                                alt="Download"
                              />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="img imgAnim w-329 max-1365:w-300 max-1023:w-full hidden max-1023:block max-992:mt-20 max-992:pt-[56.86%] max-767:pt-[40.00%] relative rounded-10 overflow-hidden">
                        <img
                          src={
                            menuSection.secondaryImage || './src/assets/images/private-villa2.webp'
                          }
                          className="w-full h-full object-cover block"
                          width="329"
                          height="219"
                          alt={menuSection.title}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-6/12 w-full max-1023:mt-30 order-1 max-1023:order-2">
                    <div className="img imgAnim relative img-503-286">
                      <img
                        src={menuSection.primaryImage || './src/assets/images/dining-menu1.webp'}
                        className="img-ratio rounded-10"
                        width="503"
                        height="286"
                        alt={menuSection.title}
                      />
                    </div>
                  </div>
                </div>
                <div className="lg:w-6/12 w-full flex justify-start pl-50 lg:mt-30 xl:-mt-80 max-1023:hidden ml-auto">
                  <div className="img imgAnim w-329 h-219 max-1365:w-300 max-1199:w-210">
                    <img
                      src={menuSection.tertiaryImage || './src/assets/images/1-164.webp'}
                      className="w-full h-full object-cover block rounded-10"
                      width="329"
                      height="219"
                      alt={menuSection.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Dining Options Section */}
        {diningOptions.length > 0 && (
          <section className="stay-listing py-100 max-1023:py-30">
            <div className="container-fluid grid gap-y-225 max-1023:gap-y-50">
              {diningOptions.map((option, index) => (
                <div key={option.id} className="stay-listing-group firstimg imgFadeup">
                  <div className="flex flex-wrap items-end">
                    <div className="lg:w-8/12 w-full relative pr-50 max-1023:pr-0">
                      <div className="listing-info w-full">
                        <div className="left-content">
                          <div className="title-olive max-w-370">
                            <h2 className="h2">{option.title}</h2>
                          </div>
                          <div className="content-listing pt-35">
                            <ul>
                              {option.keyFacts?.map((fact, factIndex) => (
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
                            <p>{option.description}</p>
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
                        <div className="img imgAnim -mt-120 max-1023:mt-0 w-329 h-219 max-1365:w-300 max-992:w-full max-992:mt-20 max-992:pt-[56.86%] max-767:pt-[40.00%] relative">
                          <img
                            src={option.secondaryImage || '/placeholder.svg'}
                            className="w-full h-full object-cover block rounded-10"
                            width="329"
                            height="219"
                            alt={option.title}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-4/12 w-full max-1023:mt-30">
                      <div className="img imgAnim relative img-503-286">
                        <img
                          src={option.primaryImage || '/placeholder.svg'}
                          className="img-ratio rounded-10"
                          width="503"
                          height="286"
                          alt={option.title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

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
