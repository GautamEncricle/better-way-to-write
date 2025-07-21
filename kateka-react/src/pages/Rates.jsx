'use client';

import { useState } from 'react';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Rates() {
  const { data, loading, error } = useFetchData(`/rates`);
  const [activeYear, setActiveYear] = useState('');
  const [activeAccordion, setActiveAccordion] = useState(null);

  const banner = data?.banner || {};
  const rateYears = data?.rateYears || [];
  const ratesData = data?.ratesData || {};
  const additionalInfo = data?.additionalInfo || [];

  if (rateYears.length > 0 && !activeYear) {
    setActiveYear(rateYears[0].id);
  }

  const handleYearChange = yearId => {
    setActiveYear(yearId);
  };

  const handleAccordionToggle = index => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const activeRateData = ratesData[activeYear];

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        {/* Banner Section */}
        <section className="banner transparent-banner h-[calc(100vh_-_300px)] max-1023:h-[calc(100vh_-_400px)] py-100">
          <div className="container-fluid relative text-center h-full flex items-center justify-center">
            <div className="title-olive">
              <h1>{banner.title || 'Rates'}</h1>
            </div>
          </div>
        </section>

        {/* Rates Section */}
        <section className="rates relative z-9">
          <div className="container-fluid-md">
            <div className="tabs">
              <ul className="tabs-nav flex flex-wrap gap-x-40 justify-center">
                {rateYears.map(year => (
                  <li key={year.id}>
                    <a
                      href={`#${year.id}`}
                      className={`cursor-pointer ${activeYear === year.id ? 'active font-bold text-olive-600' : ''}`}
                      onClick={e => {
                        e.preventDefault();
                        handleYearChange(year.id);
                      }}
                    >
                      {year.year}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="tabs-stage">
                {activeRateData ? (
                  <div className="tab-content pt-35" key={activeYear}>
                    <div className="text-center py-30">
                      <h6 className="!text-24 tracking-1">
                        {activeRateData.validityText || 'RATES VALID UNTIL FURTHER NOTICE'}
                      </h6>
                    </div>

                    <div className="table w-full">
                      <table>
                        <thead>
                          <tr>
                            <th>Season Rate</th>
                            <th>
                              Daily Rate
                              <span>(Up to 4 guests)</span>
                            </th>
                            <th>
                              Price Per Additional Person
                              <span>(Up to 6 adults max in house)</span>
                            </th>
                            <th>
                              Price Per Additional Child
                              <span>(Children 0 - 4 stay free of charge)</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeRateData.seasons && activeRateData.seasons.length > 0 ? (
                            activeRateData.seasons.map((season, index) => (
                              <tr key={`${activeYear}-season-${index}`}>
                                <td>
                                  {season.name}
                                  <div className="date-info">
                                    {season.dates?.map((date, dateIndex) => (
                                      <span key={dateIndex}>{date}</span>
                                    ))}
                                  </div>
                                </td>
                                <td>
                                  {season.dailyRate}
                                  <div className="date-info">
                                    <span>per night</span>
                                  </div>
                                </td>
                                <td>
                                  {season.additionalPersonRate}
                                  <div className="date-info">
                                    <span>per night</span>
                                  </div>
                                </td>
                                <td>
                                  {season.childRate}
                                  <div className="date-info">
                                    <span>per Child (5-11 years)</span>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center py-20">
                                No rate data available for {activeYear}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {activeRateData.premiumDates && (
                      <div className="pdf-info text-center py-60">
                        <div className="title-olive">
                          <h4>{activeRateData.premiumDates.title || 'Premium DATES'}</h4>
                        </div>
                        <div className="content lightfont pt-20">
                          <p>
                            {activeRateData.premiumDates.description ||
                              'Additional charges apply during premium dates.'}
                          </p>
                        </div>
                        <div className="mt-35 flex justify-center">
                          <a
                            href={activeRateData.pdfDownloadLink || '#'}
                            className="btn btn-olive"
                            role="link"
                            aria-label="DOWNLOAD RATES PDF"
                          >
                            {activeRateData.pdfButtonText || 'DOWNLOAD RATES PDF'}
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
                    )}
                  </div>
                ) : (
                  <div className="tab-content pt-35">
                    <div className="text-center py-60">
                      <p className="text-lg text-gray-600">
                        No rate data available for the selected year ({activeYear})
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Available data keys: {Object.keys(ratesData).join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information Accordion */}
        <section className="accordion-wrapper pt-130 max-1023:pt-50 pb-50">
          <div className="max-w-1008 mx-auto max-1023:px-20">
            <div className="accordion-row">
              <div className="title-olive text-center">
                <h2 className="h2 flex flex-wrap justify-center gap-x-10">
                  <span>ADDITIONAL</span> <span>INFORMATION</span>
                </h2>
              </div>
              <div className="accordion-container pt-40 max-1023:pt-20">
                {additionalInfo.length > 0 ? (
                  additionalInfo.map((item, index) => (
                    <div key={item.id} className="accordion-grid">
                      <div
                        className="acc-head relative py-20 card p-3 rounded-0 cursor-pointer"
                        onClick={() => handleAccordionToggle(index)}
                      >
                        <h5 className="font-heading tracking-01">{item.title}</h5>
                      </div>
                      <div
                        className={`acc-body content global-list rounded-0 pl-5 transition-all duration-300 ${
                          activeAccordion === index ? 'block' : 'hidden'
                        }`}
                      >
                        <p>{item.content}</p>
                        {item.list && (
                          <ul>
                            {item.list.map((listItem, listIndex) => (
                              <li key={listIndex}>{listItem}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-50">
                    <p className="text-lg text-gray-600">No additional information available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </AsyncWrapper>
  );
}
