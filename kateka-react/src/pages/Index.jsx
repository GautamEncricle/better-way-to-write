'use client';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Index() {
  const { data, loading, error } = useFetchData('/home');

  const banner = data?.banner || {};
  const about = data?.about || {};
  const offers = data?.offers || [];
  const safari = data?.safari || {};
  const wellness = data?.wellness || {};
  const experience = data?.experience || {};
  const blogs = data?.blogs || [];
  const conservation = data?.conservation || {};
  const testimonials = data?.testimonials || [];

  const discover = [
    { image: './src/assets/images/discover-img1.webp', label: 'Private Villa' },
    { image: './src/assets/images/discover-img2.webp', label: 'Private Villa' },
    { image: './src/assets/images/discover-img3.webp', label: 'Private Villa' },
  ];

  return (
    <>
      <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
        <main>
          {/* Banner Section */}
          <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
            <div className="container-fluid relative">
              <div className="logo text-center sticky top-180 max-1023:top-120 pb-110 max-1023:pb-50">
                <a href="#">
                  <img
                    src="./src/assets/images/logo.svg"
                    className="mx-auto max-1023:max-w-250"
                    width="576"
                    height="76"
                    alt="Kateka"
                  />
                </a>
                <span className="text-32 max-767:text-24 tracking-01 font-heading inline-block pt-28 uppercase">
                  {banner.title}
                </span>
              </div>
              <div className="img relative">
                <img
                  src={banner.image}
                  className="img-ratio rounded-10"
                  width="1280"
                  height="620"
                  alt="Banner"
                />
              </div>
              {banner.video && (
                <div className="absolute bottom-24 left-1/2 w-[calc(100%_-_160px)] -translate-1/2 text-center">
                  <a
                    href={banner.video}
                    className="text-body-4 tracking-02 text-white uppercase"
                    data-lity
                  >
                    WATCH FULL VIDEO
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* About Section */}
          {about.title && (
            <section className="about-intro max-1023:py-50 h-screen max-1023:hidden">
              <div className="about-intro-inner bg-tree py-100 h-full relative">
                <div className="px-216 relative z-9 max-1023:px-20">
                  <div className="title-olive max-w-370">
                    <h2 className="h2">{about.title}</h2>
                  </div>
                  <div className="content pt-30 max-w-624">
                    <p>{about.content}</p>
                  </div>
                  <div className="mt-40">
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
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Discover Section */}
          <section className="discover-img-grid pb-400 max-1365:pb-300 max-1023:py-30">
            <div className="container-fluid relative">
              <div className="max-w-700 mx-auto text-center relative z-9">
                <div className="title-olive">
                  <h2 className="h2">Stay Lorem ipsum dolor sit amet, consecteturd</h2>
                </div>
                <div className="mt-30 flex justify-center">
                  <a href="#" className="btn btn-link" role="link" aria-label="DISCOVER ALL">
                    <span>
                      <img
                        src="./src/assets/images/link-arrow.svg"
                        className="transition-all duration-300"
                        width="16"
                        height="14"
                        alt="Arrow"
                      />
                    </span>
                    DISCOVER ALL
                  </a>
                </div>
              </div>
              <div className="discover-img-row max-1023:flex max-1023:flex-wrap max-767:justify-center max-1023:gap-x-0 max-1023:-mx-10 max-1023:mt-30">
                {discover.map((item, index) => (
                  <div
                    key={index}
                    className={`discover-img w-476 max-1365:w-390 max-1023:w-[33.33%] max-1023:px-10 absolute max-1023:relative ${
                      index === 0
                        ? 'left-80 max-1023:left-auto -top-150 max-1365:-bottom-230 max-1023:bottom-auto'
                        : index === 1
                          ? 'right-80 max-1023:right-auto -top-100 max-1023:top-auto'
                          : 'right-300 max-1023:right-auto -bottom-350 max-1365:-bottom-230 max-1023:bottom-auto'
                    }`}
                  >
                    <div className="img relative">
                      <img
                        src={item.image}
                        className="rounded-10"
                        width="476"
                        height="529"
                        alt={item.label}
                      />
                    </div>
                    <span className="text-body-5 tracking-05 font-normal uppercase mt-15 invisible opacity-0">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Safari Section */}
          {safari.title && (
            <section className="text-wtih-video py-100 max-1023:py-30">
              <div className="px-177 max-1365:px-50 max-1023:px-20">
                <div className="flex flex-wrap -mx-18 max-1023:mx-0 max-1023:gap-y-20">
                  <div className="lg:w-7/12 w-full px-9 max-1023:px-0">
                    <div className="img h-451 max-767:h-auto max-767:pt-[75.42%] relative">
                      <img
                        src={safari.image}
                        className="img-ratio rounded-10"
                        width="598"
                        height="451"
                        alt="Safari"
                      />
                    </div>
                  </div>
                  <div className="lg:w-5/12 w-full px-9 max-1023:px-0">
                    <div className="bg-olive h-451 max-767:h-auto rounded-10 p-80 max-1365:p-40 max-1023:p-20 flex flex-col justify-center">
                      <div className="title-gray">
                        <h2 className="h2">{safari.title}</h2>
                      </div>
                      <div className="content white pt-35 max-1023:pt-15">
                        <p>{safari.content}</p>
                      </div>
                      <div className="mt-35">
                        <a
                          href="#"
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
                          DISCOVER
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Wellness Section */}
          {wellness.title && (
            <section className="wellness py-250 max-1023:py-80 max-767:py-30 pb-40 relative overflow-hidden">
              {wellness.images && wellness.images[0] && (
                <div className="img-left absolute top-180 max-1023:top-0 left-1/2 max-1023:left-auto max-767:hidden max-1023:rotate-45 -translate-1/2 max-1023:translate-0">
                  <img
                    src={wellness.images[0]}
                    className="rounded-10 max-1023:w-150 max-1023:h-150"
                    width="268"
                    height="271"
                    alt="Wellness"
                  />
                </div>
              )}
              <div className="max-w-580 px-20 mx-auto text-center max-1023:py-50 max-767:py-0">
                <div className="title-olive">
                  <h2 className="h2">{wellness.title}</h2>
                </div>
                <div className="content pt-35">
                  <p>{wellness.content}</p>
                </div>
                <div className="mt-40 max-1023:mt-20 flex justify-center">
                  <a href="#" className="btn btn-link" role="link" aria-label="DISCOVER">
                    <span>
                      <img
                        src="./src/assets/images/link-arrow.svg"
                        className="transition-all duration-300"
                        width="16"
                        height="14"
                        alt="Arrow"
                      />
                    </span>
                    DISCOVER
                  </a>
                </div>
              </div>
              {wellness.images && wellness.images[1] && (
                <div className="img-right absolute bottom-0 left-1/2 max-1023:left-auto max-1023:right-0 max-767:hidden max-1023:rotate-45 -translate-x-1/2 max-1023:translate-0">
                  <img
                    src={wellness.images[1]}
                    className="rounded-10 max-1023:w-150 max-1023:h-150"
                    width="268"
                    height="271"
                    alt="Wellness"
                  />
                </div>
              )}
            </section>
          )}

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
                            src={item}
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
                          {experience.buttonText}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Conservation Section */}
          {conservation.title && (
            <section className="text-video pt-100 pb-250 max-1023:py-50 relative">
              <div className="bg-tree-img absolute top-0 left-0 w-full h-screen">
                <img src="./src/assets/images/tree-bg2.svg" width="100%" height="1235" alt="" />
              </div>
              <div className="max-w-826 mx-auto px-20 relative z-9">
                <div className="flex flex-wrap items-end">
                  <div className="lg:w-8/12 w-full">
                    <div className="max-w-507">
                      <div className="title-olive">
                        <h2 className="h2">{conservation.title}</h2>
                      </div>
                      <div className="content max-w-479 pt-35 max-1023:pt-15">
                        <p>{conservation.content}</p>
                      </div>
                      <div className="mt-30">
                        <a href="#" className="btn btn-link" role="link" aria-label="LEARN MORE">
                          <span>
                            <img
                              src="./src/assets/images/link-arrow.svg"
                              className="transition-all duration-300"
                              width="16"
                              height="14"
                              alt="Arrow"
                            />
                          </span>
                          LEARN MORE
                        </a>
                      </div>
                    </div>
                  </div>
                  {conservation.video && (
                    <div className="lg:w-4/12 w-full -mb-50 max-1023:mt-30">
                      <div className="video relative img-266-266 rounded-10 overflow-hidden">
                        <video className="img-ratio" controls autoPlay muted>
                          <source src={conservation.video} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials Section */}
          {testimonials.length > 0 && (
            <section className="testimonial min-h-screen overflow-hidden py-100 pb-0 max-1023:pb-50 relative">
              <div className="container-fluid relative">
                <div className="flex flex-wrap justify-center relative h-[110rem]">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className="testimonial-card !h-auto py-100 max-1023:py-50 rounded-10"
                    >
                      <div className="max-w-918 mx-auto max-1023:px-30">
                        <h3 className="text-olive/78">{testimonial.message}</h3>
                        <div className="w-full text-right inline-block pt-30">
                          <span className="uppercase font-semibold text-body-3 tracking-02">
                            {testimonial.name}, {testimonial.country}
                          </span>
                        </div>
                        <div className="skip-section">
                          <a
                            href="#offerWrapper"
                            className="uppercase text-body-4 tracking-02"
                            role="link"
                            aria-label="Skip"
                          >
                            Skip
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Offers Section */}
          <section id="offerWrapper" className="offer-wrapper py-100 max-1023:py-50">
            <div className="container-fluid">
              <div className="top-info max-w-531 mx-auto text-center">
                <div className="title-olive">
                  <h2 className="h2">Offers</h2>
                </div>
                <div className="content pt-35">
                  <p>
                    Lorem ipsum dolor sit amet, consecteturd do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam,
                  </p>
                </div>
              </div>
              {offers.length > 0 && (
                <div className="flex flex-wrap items-center mt-65 max-1023:mt-20 h-451 max-1023:h-auto relative">
                  <div className="lg:w-6/12 w-full">
                    <div className="offer-grid">
                      {offers.map((offer, index) => (
                        <div key={index} className="offer-grid-content">
                          <h4>{offer.title}</h4>
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
                                ENQUIRE NOW
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:w-6/12 w-full pl-60 max-1023:hidden">
                    <div className="offer-grid-img absolute top-0">
                      <img
                        src="./src/assets/images/offer-img1.webp"
                        className="rounded-10 w-598 h-451 block object-cover"
                        width="598"
                        height="451"
                        alt="Offers"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Blogs Section */}
          {blogs.length > 0 && (
            <section className="blog-grid py-150 max-1365:py-80 max-1023:py-50">
              <div className="container-fluid">
                <div className="flex flex-wrap items-center justify-between">
                  <div className="title-olive">
                    <h2 className="h2">blogs</h2>
                  </div>
                  <div className="btn-custom">
                    <a href="#" className="btn btn-olive" role="link" aria-label="READ ALL">
                      READ ALL
                    </a>
                  </div>
                </div>
                <div className="blog-img-grid relative mt-35">
                  {blogs.map((blog, index) => (
                    <div key={blog.id || index} className="relative mb-35">
                      <img
                        src={blog.image}
                        className="rounded-10 w-full h-451 block object-cover"
                        width="1280"
                        height="451"
                        alt={blog.title}
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 max-w-790 p-100 max-1023:p-30">
                        <div className="title-white">
                          <h2 className="h2">{blog.title}</h2>
                        </div>
                        <div className="content white pt-25">
                          <p>{blog.description}</p>
                        </div>
                        <div className="mt-35">
                          <a
                            href="#"
                            className="btn btn-link btn-link-white"
                            role="link"
                            aria-label="READ ARTICLE"
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
                            READ ARTICLE
                          </a>
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
    </>
  );
}
