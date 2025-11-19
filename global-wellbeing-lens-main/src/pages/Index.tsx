import { Smile, TrendingUp, Globe, Users, Shield, Heart } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { HappinessTrendChart } from "@/components/dashboard/HappinessTrendChart";
import { GDPCorrelationChart } from "@/components/dashboard/GDPCorrelationChart";
import { RegionalComparison } from "@/components/dashboard/RegionalComparison";
import { WorldMap } from "@/components/dashboard/WorldMap";
import { TopCountries } from "@/components/dashboard/TopCountries";
import { FreedomTrendChart } from "@/components/dashboard/FreedomTrendChart";
import { SocialSupportChart } from "@/components/dashboard/SocialSupportChart";
import { CorruptionChart } from "@/components/dashboard/CorruptionChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                World Happiness Report
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Dashboard Estratégico de Análisis de Bienestar Global (2015-2024)
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-muted-foreground">Período de análisis</p>
              <p className="text-lg font-bold text-foreground">2015 - 2024</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Filters Section */}
        <section>
          <FilterBar />
        </section>

        {/* KPIs Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Indicadores Clave de Rendimiento (KPIs)</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <KPICard
              title="Índice de Felicidad Global"
              value="5.74"
              subtitle="KPI Principal - Promedio mundial 2024"
              icon={Smile}
              trend={{ value: 1.2, isPositive: true }}
              variant="primary"
            />
            <KPICard
              title="PIB per cápita promedio"
              value="$23,450"
              subtitle="Desarrollo económico global"
              icon={TrendingUp}
              trend={{ value: 3.5, isPositive: true }}
            />
            <KPICard
              title="Apoyo Social Promedio"
              value="0.81"
              subtitle="Factor comunitario del bienestar"
              icon={Users}
              trend={{ value: 0.5, isPositive: true }}
              variant="accent"
            />
            <KPICard
              title="Percepción de Corrupción"
              value="0.42"
              subtitle="Impacto de la gobernanza"
              icon={Shield}
              trend={{ value: 2.1, isPositive: false }}
            />
            <KPICard
              title="Libertad de Elección"
              value="0.75"
              subtitle="Autonomía individual percibida"
              icon={Heart}
              trend={{ value: 1.8, isPositive: true }}
            />
            <KPICard
              title="Países analizados"
              value="143"
              subtitle="Cobertura global completa"
              icon={Globe}
            />
          </div>
        </section>

        {/* World Map Section */}
        <section>
          <WorldMap />
        </section>

        {/* Top and Bottom Countries */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Ranking Mundial</h2>
          <TopCountries />
        </section>

        {/* Primary Charts: Happiness Trends */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Evolución del Índice de Felicidad</h2>
          <HappinessTrendChart />
        </section>

        {/* Secondary KPI: GDP Correlation */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">PIB per cápita vs Felicidad</h2>
          <GDPCorrelationChart />
        </section>

        {/* Secondary KPI: Social Support */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Apoyo Social por Región</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <SocialSupportChart />
            <RegionalComparison />
          </div>
        </section>

        {/* Secondary KPI: Corruption Perception */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Percepción de Corrupción</h2>
          <CorruptionChart />
        </section>

        {/* Secondary KPI: Freedom of Choice */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Libertad de Elección</h2>
          <FreedomTrendChart />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Fuente: World Happiness Report | Dashboard Estratégico de Análisis</p>
            <p className="mt-1">© 2024 - Visualización de datos con fines académicos</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
