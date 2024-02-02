import { Activities } from '@user/Home/Activities'
import { Header } from '@components/Header'
import { OurCoffee } from '@user/Home/OurCoffee'
import { Banner } from '@user/Home/Banner'
import { OurBlends } from '@user/Home/OurBlends'
import { Footer } from '@components/Footer'
import { Plantations } from '@user/Home/Plantations'
import { HomeBlog } from '@user/Home/HomeBlog'

import './Home.scss'

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
  )
}
