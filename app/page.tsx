import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { BeforeAfter } from "@/components/before-after";
import { BuildYourDetail } from "@/components/build-your-detail";
import { SelectedWork } from "@/components/selected-work";
import { Process } from "@/components/process";
import { Reviews } from "@/components/reviews";
import { FinalCta } from "@/components/final-cta";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <BeforeAfter />
        <BuildYourDetail />
        <SelectedWork />
        <Process />
        <Reviews />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
