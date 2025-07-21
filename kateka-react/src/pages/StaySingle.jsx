'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export default function StaySingle() {
  const { data, loading, error } = useFetchData('/staySingle');
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (loading) return <AsyncWrapper loading={loading} error={error} />;
  if (error) return <AsyncWrapper loading={loading} error={error} />;

  return (
    <main>
      {/* Banner Section */}
      <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
        <div className="container-fluid relative">
          <div className="title-olive text-center pb-60 sticky top-180 max-1023:top-120">
            <h2 className="h2 flex flex-wrap justify-center gap-x-10">
              <span>{data.banner?.title?.split(' ')[0] || 'Stay'}</span>{' '}
              <span>{data.banner?.title?.split(' ')[1] || 'Name'}</span>
            </h2>
          </div>
          <div className="img relative">
            <img
              src={data.banner?.image || '/placeholder.svg'}
              className="img-ratio rounded-10"
              width="1280"
              height="620"
              alt={data.banner?.title || 'Stay Name'}
            />
          </div>
        </div>
      </section>

      {/* Common Content Section */}
      <section className="common-content py-210 max-1023:py-50 relative">
        {data.commonContent?.treeBgImage && (
          <div className="bg-tree-img absolute top-0 left-0 w-full h-screen">
            <img
              src={data.commonContent.treeBgImage || '/placeholder.svg'}
              width="100%"
              height="1235"
              alt="Background Tree"
            />
          </div>
        )}
        <div className="container-fluid relative z-9">
          <div className="max-w-993 mx-auto">
            <div className="title-olive">
              <h2 className="h2">{data.commonContent?.title}</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Icon Grid Section */}
      <section className="icon-grid relative z-9">
        <div className="container-fluid">
          <div className="grid grid-cols-6 gap-y-30 justify-center gap-x-80 gap-y-20">
            {data.iconGrid?.items?.map((item, index) => (
              <div key={index} className="icon-grid-bx">
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
            )) || (
              <>
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="icon-grid-bx">
                    <div className="icon">
                      <img src="/placeholder.svg" width="98" height="75" alt="Service Offering" />
                    </div>
                    <h6>Service Offering</h6>
                  </div>
                ))}
              </>
            )}
          </div>
          {data.iconGrid?.buttonText && (
            <div className="mt-50 flex justify-center">
              <a
                href={data.iconGrid.buttonLink || '#'}
                className="btn btn-olive"
                role="link"
                aria-label={data.iconGrid.buttonText}
              >
                {data.iconGrid.buttonText}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Slider Section */}
      {data.gallery?.images && data.gallery.images.length > 0 && (
        <section className="gallery-slider-wrapper py-200 max-1023:py-50">
          <div className="container-fluid">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              className="gallery-slider rounded-10 mb-30"
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {data.gallery.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="img relative">
                    <img
                      src={image || '/placeholder.svg'}
                      className="img-ratio"
                      width="1280"
                      height="565"
                      alt={`Gallery Image ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="gallery-thumb-slider"
            >
              {data.gallery.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="img relative">
                    <img
                      src={image || '/placeholder.svg'}
                      className="img-ratio rounded-10"
                      width="1280"
                      height="565"
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}

      {/* Availability Section */}
      {data.availability?.title && (
        <section className="availability-wrapper bg-olive py-110 max-1023:py-50">
          <div className="container-fluid">
            <div className="flex flex-wrap items-center justify-center w-full m-0 p-0">
              <div className="w-full max-w-876">
                <div className="title-white text-center">
                  <h2 className="h2">
                    {data.availability.title.split(' ').map((word, index) => (
                      <span key={index}>{word} </span>
                    ))}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
