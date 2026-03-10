import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/Hero'
import LogoCloud from '@/components/LogoCloud'
import ProblemSolution from '@/components/ProblemSolution'
import CompetitiveMatrix from '@/components/CompetitiveMatrix'
import ChamberTimeline from '@/components/ChamberTimeline'
import FeatureShowcase from '@/components/FeatureShowcase'
import PeopleIntel from '@/components/PeopleIntel'
import PlaybookEngine from '@/components/PlaybookEngine'
import Modules from '@/components/Modules'
import Metrics from '@/components/Metrics'
import Trust from '@/components/Trust'
import Constellation from '@/components/Constellation'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <ScrollProgress />
      <Hero />
      <LogoCloud />
      <ProblemSolution />
      <CompetitiveMatrix />
      <ChamberTimeline />
      <FeatureShowcase />
      <PeopleIntel />
      <PlaybookEngine />
      <Modules />
      <Metrics />
      <Trust />
      <Constellation />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
