import { Banner } from "./Banner"
import { Header } from "../../../components/Header"
import { OurCoffee } from "./OurCoffee"
import { OurBlends } from "./OurBlends"

export const HomePage = () => {
    return (
        <main>
            <Header/>
            <Banner/>
            <OurCoffee/>
            <OurBlends/>
        </main>
    )
}