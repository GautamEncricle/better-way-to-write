'use client';
import { useState } from 'react';

import useFetchData from '../hooks/useFetchData';
import AsyncWrapper from '../component/ui/AsyncWrapper';

export default function Contact() {
  const { data, loading, error } = useFetchData('/contact');
  const contactInfo = data?.contactInfo || {};
  const formSection = data?.formSection || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate form submission (mocked for now)
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('Form submitted:', formData);
      setSubmitMessage("Thank you for your enquiry! We'll get back to you soon.");

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        checkIn: '',
        checkOut: '',
        guests: '2',
      });
    } catch (err) {
      setSubmitMessage('Sorry, there was an error submitting your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AsyncWrapper loading={loading} error={error} retry={() => window.location.reload()}>
      <main>
        <section className="contact-info py-100 mt-150">
          <div className="container-fluid">
            <div className="flex flex-wrap items-start">
              <div className="lg:w-5/12 w-full max-1023:mb-50">
                <div className="max-w-270 mx-auto max-1023:max-w-full">
                  <div className="title-black">
                    <h5>{contactInfo.title || 'GENERAL CONTACT'}</h5>
                  </div>
                  <div className="grid gap-y-35 pt-25">
                    <div className="ct-info">
                      <ul>
                        <li>
                          Email{' '}
                          <a href={`mailto:${contactInfo.email || 'reception@kateka.co.za'}`}>
                            {contactInfo.email || 'reception@kateka.co.za'}
                          </a>
                        </li>
                        <li>
                          WhatsApp:{' '}
                          <a href={`https://wa.me/${contactInfo.whatsappNumber || '21798417685'}`}>
                            {contactInfo.whatsappDisplay || '+21 79 841 7685'}
                          </a>
                        </li>
                        <li>{contactInfo.whatsappNote || '(calls & messages only)'}</li>
                      </ul>
                    </div>
                    <div className="ct-info content">
                      <p>
                        {contactInfo.address ? (
                          contactInfo.address.split('\n').map((line, index) => (
                            <span key={index}>
                              {line}
                              {index < contactInfo.address.split('\n').length - 1 && <br />}
                            </span>
                          ))
                        ) : (
                          <>
                            Kateka <br /> Hoedspruit, Limpopo <br /> South Africa
                          </>
                        )}
                      </p>
                    </div>
                    {contactInfo.additionalInfo && (
                      <div className="ct-info content">
                        <p>{contactInfo.additionalInfo}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:w-7/12 w-full">
                <div className="enquire-form slide-down">
                  <div className="title-olive mb-40">
                    <h2 className="h2 flex flex-wrap gap-x-10">
                      {formSection.title ? (
                        formSection.title
                          .split(' ')
                          .map((word, index) => <span key={index}>{word}</span>)
                      ) : (
                        <>
                          <span>Stay</span>
                          <span>With</span>
                          <span>Us</span>
                        </>
                      )}
                    </h2>
                  </div>

                  {formSection.description && (
                    <div className="content mb-40">
                      <p>{formSection.description}</p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-5"
                        >
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-5"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-5"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="guests"
                          className="block text-sm font-medium text-gray-700 mb-5"
                        >
                          Number of Guests
                        </label>
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                        >
                          {[1, 2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>
                              {num} Guest{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                      <div>
                        <label
                          htmlFor="checkIn"
                          className="block text-sm font-medium text-gray-700 mb-5"
                        >
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleInputChange}
                          className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="checkOut"
                          className="block text-sm font-medium text-gray-700 mb-5"
                        >
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleInputChange}
                          className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-15 py-12 border border-gray-300 rounded-5 focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 resize-vertical"
                        placeholder="Tell us about your ideal safari and wellness experience..."
                      />
                    </div>

                    <div className="flex flex-wrap gap-20 items-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-olive disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Enquiry'}
                      </button>

                      {submitMessage && (
                        <div
                          className={`text-sm ${submitMessage.includes('error') ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {submitMessage}
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </AsyncWrapper>
  );
}
