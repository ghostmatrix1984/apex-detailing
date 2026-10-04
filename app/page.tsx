import { DetailSpecProvider } from "@/components/detail-spec";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { BeforeAfter } from "@/components/before-after";
import { BuildYourDetail } from "@/components/build-your-detail";
import { SelectedWork } from "@/components/selected-work";
import { Process } from "@/components/process";
import { Reviews } from "@/components/reviews";
import { BookingSection } from "@/components/booking-section";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <DetailSpecProvider>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <BeforeAfter />
        <BuildYourDetail />
        <SelectedWork />
        <Process />
        <Reviews />
        <BookingSection />
      </main>
      <SiteFooter />
    </DetailSpecProvider>
  );
}
