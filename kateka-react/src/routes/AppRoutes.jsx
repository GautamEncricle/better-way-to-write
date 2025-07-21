import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '../pages/Index';
import Stay from '../pages/Stay';
import StaySingle from '../pages/StaySingle';
import Safari from '../pages/Safari';
import Offers from '../pages/Offer';
import Location from '../pages/Location';
import Gallery from '../pages/Gallery';
import Rates from '../pages/Rates';
import FAQ from '../pages/Faq';
import Dining from '../pages/Dining';
import Contact from '../pages/Contact';
import Conservation from '../pages/Conservation';
import Campaign from '../pages/CampaignLP';
import Blog from '../pages/Blog';
import About from '../pages/About';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/stay" element={<Stay />} />
    <Route path="/stay/:id" element={<StaySingle />} />
    <Route path="/safari" element={<Safari />} />
    <Route path="/offers" element={<Offers />} />
    <Route path="/location" element={<Location />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/rates" element={<Rates />} />
    <Route path="/faq" element={<FAQ />} />
    <Route path="/dining" element={<Dining />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/conservation" element={<Conservation />} />
    <Route path="/campaign" element={<Campaign />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/about" element={<About />} />
  </Routes>
);

export default AppRoutes;
