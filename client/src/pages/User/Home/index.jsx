import { Banner } from './Banner';
import { Header } from '../../../components/Header';
import { OurCoffee } from './OurCoffee';
import { OurBlends } from './OurBlends';
import { Footer } from '../../../components/Footer';
import { Plantations } from './Plantations';
import { Activities } from './Activities';

import './Home.scss';
import { HomeBlog } from './HomeBlog';

export const HomePage = () => {
  return (
    <main>
      <Header />
      <Banner />
      <OurCoffee />
      <OurBlends />
      <Plantations />
      <Activities />
      <HomeBlog />
      <Footer />
    </main>
  );
};
