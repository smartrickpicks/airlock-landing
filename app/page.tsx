import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/Hero'
import ProblemSolution from '@/components/ProblemSolution'
import ChamberTimeline from '@/components/ChamberTimeline'
import PeopleIntel from '@/components/PeopleIntel'
import Modules from '@/components/Modules'
import Trust from '@/components/Trust'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <ScrollProgress />
      <Hero />
      <ProblemSolution />
      <ChamberTimeline />
      <PeopleIntel />
      <Modules />
      <Trust />
      <FinalCTA />
      <Footer />
    </main>
  )
}
