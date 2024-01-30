import { Banner } from './Banner';
import { Header } from '../../../components/Header';
import { OurCoffee } from './OurCoffee';
import { OurBlends } from './OurBlends';
import { Footer } from '../../../components/Footer';
import { Plantations } from './Plantations';

import './Home.scss';

export const HomePage = () => {
  return (
    <main>
      <Header isSticky />
      <Banner />
      <OurCoffee />
      <OurBlends />
      <Plantations />
      <Footer />
    </main>
  );
};
