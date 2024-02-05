import { Activities } from '@user/Home/Activities'
import { Banner } from '@user/Home/Banner'
import { HomeBlog } from '@user/Home/HomeBlog'
import { OurBlends } from '@user/Home/OurBlends'
import { OurCoffee } from '@user/Home/OurCoffee'
import { Plantations } from '@user/Home/Plantations'

import { Footer } from '@components/Footer'
import { Header } from '@components/Header'

import './Home.scss'

export const HomePage = () => (
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
)
