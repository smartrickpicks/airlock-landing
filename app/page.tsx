import Nav from '@/components/Nav'
import ScrollProgress from '@/components/ScrollProgress'
import HeroChat from '@/components/HeroChat'
import ProblemSolution from '@/components/ProblemSolution'
import OttoTeaser from '@/components/OttoTeaser'
import BenchProof from '@/components/BenchProof'
import CostComparison from '@/components/CostComparison'
import ChamberTimeline from '@/components/ChamberTimeline'
import ModelStatCards from '@/components/ModelStatCards'
import PluginVsPlatform from '@/components/PluginVsPlatform'
import Pricing from '@/components/Pricing'
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

      {/* Act 1: The Hook — Otto talks to you */}
      <HeroChat />

      {/* Act 2: The Problem — Proof over vibes */}
      <ProblemSolution />

      {/* Act 3: The AI That Says No */}
      <OttoTeaser />

      {/* Act 4: The Proof — ConstellationBench data */}
      <BenchProof />

      {/* Act 4b: Cost comparison — Forge stretches your API credits */}
      <CostComparison />

      {/* Act 5: How Work Flows — Chambers */}
      <ChamberTimeline />

      {/* Act 6: Choose Your Council — Model stat cards */}
      <ModelStatCards />

      {/* Act 7: Plugin vs Platform */}
      <PluginVsPlatform />

      {/* Act 8: Pricing */}
      <Pricing />

      {/* Act 9: Security & Trust */}
      <Trust />

      {/* Act 10: The Architecture — Constellation */}
      <Constellation />

      {/* Act 11: FAQ */}
      <FAQ />

      {/* Act 12: Final CTA */}
      <FinalCTA />
      <Footer />
    </main>
  )
}
