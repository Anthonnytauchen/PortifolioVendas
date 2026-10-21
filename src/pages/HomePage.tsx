import React from 'react';
import { ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import { siteContent } from '@/config/siteContent';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionContainer } from '@/components/layout/SectionContainer';

export const HomePage: React.FC = () => {
  const { hero, services } = siteContent;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <SectionContainer id="hero" variant="default">
          <div className="flex flex-col items-start gap-8 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5">
              <Layers className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium leading-none text-foreground">
                {hero.badge}
              </span>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
                {hero.headline}
              </h1>
              <p className="text-base text-muted-foreground leading-7 max-w-2xl">
                {hero.subheadline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href={hero.primaryCta.href}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 py-2"
              >
                {hero.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center justify-center text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8 py-2 rounded-md"
              >
                {hero.secondaryCta.label}
              </a>
            </div>

            {/* Indicadores de Impacto B2B */}
            <div className="w-full pt-8 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {hero.highlights.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-border bg-card text-card-foreground p-6 flex flex-col gap-2 shadow-sm"
                >
                  <span className="text-3xl font-semibold tracking-tight text-primary">
                    {metric.value}
                  </span>
                  <span className="text-sm font-medium leading-none text-muted-foreground">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Seção de Serviços B2B */}
        <SectionContainer id="servicos" variant="muted">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3 max-w-2xl">
              <span className="text-sm font-medium leading-none text-primary">
                {services.sectionBadge}
              </span>
              <h2 className="text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-foreground">
                {services.title}
              </h2>
              <p className="text-base text-muted-foreground leading-7">
                {services.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {services.items.map((service) => (
                <article
                  key={service.id}
                  className="rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-sm font-medium leading-none text-primary">
                        {service.metricBadge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold leading-none tracking-tight text-card-foreground pt-2">
                      {service.title}
                    </h3>

                    <p className="text-base text-muted-foreground leading-7">
                      {service.description}
                    </p>
                  </div>

                  <div className="p-6 pt-4 mt-4 flex flex-col gap-2 border-t border-border">
                    {service.deliverables.map((deliverable) => (
                      <div key={deliverable} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                        <span className="text-sm font-medium leading-none text-muted-foreground">
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionContainer>
      </main>

      <Footer />
    </div>
  );
};

