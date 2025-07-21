'use client';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function CampaignLP() {
  const { data, loading, error } = useFetchData('/campaign');
  const banner = data?.banner || {};
  const usps = data?.usps || [];
  const generalContent = data?.generalContent || {};
  const features = data?.features || [];
  const sliderSection = data?.sliderSection || {};
  const conservationSection = data?.conservationSection || {};
  const guidingTeamSection = data?.guidingTeamSection || {};
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const nextSlide = () => {
    if (sliderSection.slides) {
      setCurrentSlide(prev => (prev + 1) % sliderSection.slides.length);
    }
  };

  const prevSlide = () => {
    if (sliderSection.slides) {
      setCurrentSlide(
        prev => (prev - 1 + sliderSection.slides.length) % sliderSection.slides.length
      );
    }
  };

  const handleTooltipToggle = memberId => {
    setActiveTooltip(activeTooltip === memberId ? null : memberId);
  };

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
          <div className="container-fluid relative">
            <div className="sticky top-180 max-1023:top-120 text-center pb-60">
              {banner.preheading && (
                <div className="preheading">
                  <span>{banner.preheading}</span>
                </div>
              )}
              <div className="title-olive">
                <h1 className="h1 flex flex-wrap justify-center gap-x-10">
                  {banner.title ? (
                    banner.title.split(' ').map((word, index) => <span key={index}>{word}</span>)
                  ) : (
                    <>
                      <span>LOREM</span>
                      <span>IPSUM</span>
                      <span>DOLOR</span>
                    </>
                  )}
                </h1>
              </div>
              {banner.location && (
                <div className="content">
                  <p>{banner.location}</p>
                </div>
              )}
            </div>
            <div className="img relative">
              <img
                src={banner.image || '/placeholder.svg'}
                className="img-ratio rounded-10"
                width="1280"
                height="620"
                alt="Campaign Banner"
              />
            </div>
          </div>
        </section>

        {/* USPs Section */}
        {usps.length > 0 && (
          <section className="icon-grid relative z-9 py-100 max-1023:py-30">
            <div className="container-fluid">
              <div className="flex flex-wrap justify-center gap-x-80 gap-y-20">
                {usps.map(usp => (
                  <div key={usp.id} className="icon-grid-bx">
                    <div className="icon">
                      <img
                        src={usp.icon || '/placeholder.svg'}
                        width="98"
                        height="75"
                        alt={usp.title}
                      />
                    </div>
                    <h6>{usp.title}</h6>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* General Content Section */}
        {generalContent.title && (
          <section className="general-content py-50">
            <div className="container-fluid">
              <div className="max-w-760 mx-auto text-center">
                <div className="title-olive">
                  <h2 className="h2">
                    {generalContent.title.split(' ').map((word, index) => (
                      <span key={index}>{word}</span>
                    ))}
                  </h2>
                </div>
                <div className="content pt-35">
                  {generalContent.description && <p>{generalContent.description}</p>}
                  {generalContent.validity && <p>{generalContent.validity}</p>}
                  {generalContent.price && <p>{generalContent.price}</p>}
                </div>
                <div className="flex flex-wrap justify-center gap-x-25 pt-35">
                  {generalContent.enquireLink && (
                    <a
                      href={generalContent.enquireLink}
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
                  )}
                  {generalContent.bookNowLink && (
                    <a
                      href={generalContent.bookNowLink}
                      className="btn btn-olive"
                      role="link"
                      aria-label="Book Now"
                    >
                      Book Now
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* More About This Offer Section (Features) */}
        {features.length > 0 && (
          <section className="about-img-grid py-150 max-1023:py-30">
            <div className="container-fluid-md">
              <div className="text-center title-olive">
                <h2 className="h2 flex flex-wrap justify-center gap-x-10">
                  <span>MORE</span>
                  <span>ABOUT</span>
                  <span>THIS</span>
                  <span>OFFER</span>
                </h2>
              </div>
              <div className="grid gap-y-50 pt-50">
                {features.map(feature => (
                  <div key={feature.id} className="img-grid">
                    <div className="flex flex-wrap items-center">
                      <div className="lg:w-4/12 w-full">
                        <div className="img relative">
                          <img
                            src={feature.image || '/placeholder.svg'}
                            className="rounded-10"
                            width="376"
                            height="214"
                            alt={feature.title}
                          />
                        </div>
                      </div>
                      <div className="lg:w-8/12 w-full">
                        <div className="about-content">
                          <div className="text-center title-olive">
                            <h2 className="h2 flex flex-wrap gap-x-10">
                              {feature.title.split(' ').map((word, index) => (
                                <span key={index}>{word}</span>
                              ))}
                            </h2>
                          </div>
                          <div className="content pt-10">
                            <p>{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Slider with Content Section */}
        {sliderSection.slides && sliderSection.slides.length > 0 && (
          <section className="slider-with-content bg-olive py-120 max-1023:py-50 mb-100 max-1023:mb-0">
            <div className="pl-125 max-1365:pl-40 max-639:px-20">
              <div className="flex flex-wrap">
                <div className="lg:w-4/12 w-full relative">
                  {sliderSection.slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`slider-left-content ${index === currentSlide ? 'block' : 'hidden'}`}
                      data-slide={index}
                    >
                      <div className="title-white">
                        <h2 className="h2 flex flex-wrap gap-x-10">
                          {slide.title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex}>{word}</span>
                          ))}
                        </h2>
                      </div>
                      <div className="content gray pt-35 max-1023:pt-15 max-w-399">
                        <p>{slide.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="swiper-pagination max-1023:!relative !text-left flex flex-wrap !gap-x-30 max-767:!gap-x-20 max-1023:mt-20"></div>
                </div>
                <div className="lg:w-8/12 w-full pl-60 max-1023:pl-0">
                  <div className="relative">
                    <div className="safari-slider relative">
                      {sliderSection.slides[currentSlide] && (
                        <div className="swiper-slide">
                          <div className="img relative">
                            <img
                              src={sliderSection.slides[currentSlide].image || '/placeholder.svg'}
                              className="rounded-10 w-full h-453 object-cover block"
                              width="592"
                              height="453"
                              alt="Safari Experience"
                            />
                          </div>
                          <div
                            className={`content ${
                              sliderSection.slides[currentSlide].textColor === 'white'
                                ? 'white'
                                : 'gray'
                            } pt-20`}
                          >
                            <p>{sliderSection.slides[currentSlide].content}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="swiper-custom-arrow w-68 flex min-767:flex-col gap-y-10 justify-end absolute top-1/2 min-767:-translate-1/2 right-30 z-999 max-767:gap-x-20 max-767:flex-row-reverse max-767:w-auto max-767:right-20 max-767:-top-70">
                      <button className="swiper-button-next swiper-arrow" onClick={nextSlide}>
                        <img
                          src="./src/assets/images/arrow-next.svg"
                          width="15"
                          height="14"
                          alt="Arrow Next"
                        />
                      </button>
                      <button className="swiper-button-prev swiper-arrow" onClick={prevSlide}>
                        <img
                          src="./src/assets/images/arrow-prev.svg"
                          width="15"
                          height="14"
                          alt="Arrow Prev"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Conservation Section */}
        {conservationSection.title && (
          <section className="text-video pt-100 pb-250 max-1023:py-50 relative">
            <div className="bg-tree-img absolute top-0 left-0 w-full h-screen">
              <img
                src={conservationSection.backgroundImage || '/placeholder.svg'}
                width="100%"
                height="1235"
                alt=""
              />
            </div>
            <div className="max-w-826 mx-auto px-20 relative z-9">
              <div className="flex flex-wrap items-end">
                <div className="lg:w-8/12 w-full">
                  <div className="max-w-507">
                    <div className="title-olive">
                      <h2 className="h2">{conservationSection.title}</h2>
                    </div>
                    <div className="content max-w-479 pt-35 max-1023:pt-15">
                      <p>{conservationSection.content}</p>
                    </div>
                    <div className="mt-30">
                      <a
                        href={conservationSection.link || '#'}
                        className="btn btn-link"
                        role="link"
                        aria-label="LEARN MORE"
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
                        {conservationSection.buttonText || 'LEARN MORE'}
                      </a>
                    </div>
                  </div>
                </div>
                {conservationSection.video && (
                  <div className="lg:w-4/12 w-full -mb-50 max-1023:mt-30">
                    <div className="video relative img-266-266 rounded-10 overflow-hidden">
                      <video className="img-ratio" controls autoPlay muted>
                        <source src={conservationSection.video} type="video/mp4" />
                      </video>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Our Guiding Team Section */}
        {guidingTeamSection.title && (
          <section className="our-team relative z-9 py-100 max-767:py-50 max-767:overflow-x-hidden">
            <div className="container-fluid">
              <div className="text-center title-olive">
                <h2 className="h2 flex flex-wrap gap-x-10 justify-center">
                  {guidingTeamSection.title.split(' ').map((word, index) => (
                    <span key={index}>{word}</span>
                  ))}
                </h2>
              </div>
              <div className="mt-60 max-1023:mt-30 relative">
                <div className="img relative">
                  <img
                    src={guidingTeamSection.image || '/placeholder.svg'}
                    className="min-1439:object-top rounded-10 w-full h-full object-cover block"
                    width="1280"
                    height="749"
                    alt="Our Guiding Team"
                  />
                  {guidingTeamSection.members?.map(member => (
                    <div key={member.id} className={`info-grid ${member.position}`}>
                      <div className="info-icon">
                        <img src="./src/assets/images/info.svg" width="24" height="24" alt="Info" />
                      </div>
                      <div className="info-content flex flex-col bg-gray rounded-10 py-8 px-10">
                        <h6 className="font-extralight !text-body-4 !leading-18 inline-block !font-body">
                          {member.name}
                        </h6>
                        <span className="uppercase font-normal text-body-5 tracking-05">
                          {member.jobTitle}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </AsyncWrapper>
  );
}
