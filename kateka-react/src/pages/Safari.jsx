'use client';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Safari() {
  const { data, loading, error } = useFetchData('/safari');

  const safari = data?.safari || { title: '', content: '' };
  const experiences = data?.experiences || { title: '', slides: [] };
  const conservation = data?.conservation || {};
  const guidingTeam = data?.guidingTeam || { title: '', image: '', members: [] };

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Safari Banner (Static) */}
        <section className="banner py-45 pb-0 pt-180 max-1023:pt-100">
          <div className="container-fluid relative">
            <div className="title-olive text-center pb-60 sticky top-180 max-1023:top-120">
              <h2 className="h2">Safari</h2>
            </div>
            <div className="img relative">
              <img
                src="./src/assets/images/safari-banner.webp"
                className="img-ratio rounded-10"
                width="1280"
                height="620"
                alt="Safari Banner"
              />
            </div>
          </div>
        </section>

        {/* Safari Description */}
        <section className="common-content py-100">
          <div className="container-fluid max-w-993 mx-auto">
            <div className="title-olive">
              <h2 className="h2">{safari.title}</h2>
            </div>
            <div className="content pt-30 max-w-624">
              <p>{safari.content}</p>
            </div>
          </div>
        </section>

        {/* Safari Experiences */}
        {experiences.slides?.length > 0 && (
          <section className="safari-experiences py-100">
            <div className="container-fluid">
              <div className="title-olive text-center mb-50">
                <h2 className="h2">{experiences.title}</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-30">
                {experiences.slides.map(slide => (
                  <div key={slide.id} className="rounded-10 overflow-hidden shadow-lg bg-white">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-300 object-cover"
                    />
                    <div className="p-20">
                      <h3 className={`text-lg font-bold text-${slide.textColor}`}>{slide.title}</h3>
                      <p className="mt-10">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Safari Conservation */}
        {conservation.title && (
          <section
            className="safari-conservation py-100 bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${conservation.backgroundImage})`,
            }}
          >
            <div className="container-fluid max-w-993 mx-auto text-center text-white relative z-10">
              <h2 className="h2">{conservation.title}</h2>
              <p className="mt-30">{conservation.content}</p>
              <div className="mt-50">
                <video
                  src={conservation.video}
                  controls
                  className="mx-auto w-full max-w-3xl rounded-10"
                ></video>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-0"></div>
          </section>
        )}

        {/* Safari Guiding Team */}
        {guidingTeam.members?.length > 0 && (
          <section className="guiding-team py-100">
            <div className="container-fluid">
              <div className="title-olive text-center mb-50">
                <h2 className="h2">{guidingTeam.title}</h2>
              </div>
              <div className="relative text-center">
                <img
                  src={guidingTeam.image}
                  alt="Guiding Team"
                  className="mx-auto w-full max-w-4xl rounded-10"
                />
                {guidingTeam.members.map(member => (
                  <div
                    key={member.id}
                    className={`absolute tooltip ${member.position}`}
                    style={{ top: '0', left: '0' }} // You should use actual positioning classes or JS for real tooltips
                  >
                    <div className="tooltip-content bg-white p-4 rounded shadow-lg">
                      <strong>{member.name}</strong>
                      <p>{member.jobTitle}</p>
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
