import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import HeroChat from '@/components/HeroChat'
import LogoCloud from '@/components/LogoCloud'
import ProblemSolution from '@/components/ProblemSolution'
import CompetitiveMatrix from '@/components/CompetitiveMatrix'
import ChamberTimeline from '@/components/ChamberTimeline'
import Modules from '@/components/Modules'
import FeatureShowcase from '@/components/FeatureShowcase'
import OttoTeaser from '@/components/OttoTeaser'
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
      <HeroChat />
      <LogoCloud />
      <ProblemSolution />
      <CompetitiveMatrix />
      <ChamberTimeline />
      <Modules />
      <FeatureShowcase />
      <OttoTeaser />
      <Trust />
      <Constellation />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
