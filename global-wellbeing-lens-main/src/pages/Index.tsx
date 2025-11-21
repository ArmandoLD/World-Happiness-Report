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
import { useEffect, useState } from "react";
import { useFilters } from "@/context/FiltersContext";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const { selectedYear, selectedRegion, selectedCountry } = useFilters();

  const [avgHappiness, setAvgHappiness] = useState<number | null>(null);
  const [avgGdp, setAvgGdp] = useState<number | null>(null);
  const [avgSocialSupport, setAvgSocialSupport] = useState<number | null>(null);
  const [avgCorruption, setAvgCorruption] = useState<number | null>(null);
  const [avgFreedom, setAvgFreedom] = useState<number | null>(null);
  const [countriesCount, setCountriesCount] = useState<number | null>(null);

  useEffect(() => {
    const loadKPIs = async () => {
      try {
        // Build base query with filters (year/region/country)
        let q = supabase.from("happiness_data").select(
          '"happiness score", "gdp per capita", "social support", "perceptions of corruption", "freedom to make life choices"'
        );

        if (selectedYear && selectedYear !== "") {
          const y = Number(selectedYear);
          if (!Number.isNaN(y)) q = q.eq("year", y);
        }
        if (selectedRegion && selectedRegion !== "Todas las regiones") {
          q = q.eq("regional indicator", selectedRegion);
        }
        if (selectedCountry && selectedCountry !== "Todos los países") {
          q = q.eq("country", selectedCountry);
        }

        const { data: rows, error } = await q.range(0, 10000);
        if (error) {
          console.error("Error fetching KPI rows:", error);
          setAvgHappiness(null);
          setAvgGdp(null);
          setAvgSocialSupport(null);
          setAvgCorruption(null);
          setAvgFreedom(null);
        } else if (!rows || rows.length === 0) {
          setAvgHappiness(null);
          setAvgGdp(null);
          setAvgSocialSupport(null);
          setAvgCorruption(null);
          setAvgFreedom(null);
        } else {
          let sumH = 0,
            sumG = 0,
            sumS = 0,
            sumC = 0,
            sumF = 0;
          let countH = 0,
            countG = 0,
            countS = 0,
            countC = 0,
            countF = 0;

          for (const r of rows as any[]) {
            const h = r["happiness score"] ?? r.happiness_score ?? r.happiness;
            const g = r["gdp per capita"] ?? r.gdp_per_capita ?? r.gdp;
            const s = r["social support"] ?? r.social_support ?? r.social;
            const c = r["perceptions of corruption"] ?? r.perceptions_of_corruption ?? r.corruption;
            const f = r["freedom to make life choices"] ?? r.freedom_to_make_life_choices ?? r.freedom;

            const hn = h == null ? NaN : Number(h);
            const gn = g == null ? NaN : Number(g);
            const sn = s == null ? NaN : Number(s);
            const cn = c == null ? NaN : Number(c);
            const fn = f == null ? NaN : Number(f);

            if (Number.isFinite(hn)) {
              sumH += hn;
              countH++;
            }
            if (Number.isFinite(gn)) {
              sumG += gn;
              countG++;
            }
            if (Number.isFinite(sn)) {
              sumS += sn;
              countS++;
            }
            if (Number.isFinite(cn)) {
              sumC += cn;
              countC++;
            }
            if (Number.isFinite(fn)) {
              sumF += fn;
              countF++;
            }
          }

          setAvgHappiness(countH ? sumH / countH : null);
          // GDP: keep raw average; display logic will show in thousands
          setAvgGdp(countG ? sumG / countG : null);
          setAvgSocialSupport(countS ? sumS / countS : null);
          setAvgCorruption(countC ? sumC / countC : null);
          setAvgFreedom(countF ? sumF / countF : null);
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadKPIs();
  }, [selectedYear, selectedRegion, selectedCountry]);

  // countries count (global, no filters)
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const { data: rows, error } = await supabase.from("happiness_data").select("country").range(0, 20000);
        if (error) {
          console.error("Error fetching countries:", error);
          setCountriesCount(null);
          return;
        }
        const setC = new Set<string>();
        for (const r of rows as any[]) if (r && r.country) setC.add(r.country);
        setCountriesCount(setC.size);
      } catch (e) {
        console.error(e);
        setCountriesCount(null);
      }
    };
    loadCountries();
  }, []);

  const fmt = (v: number | null, digits = 2) => (v == null ? "—" : Number(v).toFixed(digits));
  const fmtGdp = (v: number | null) => {
    if (v == null) return "—";
    // If value looks small (<1000) assume it's already in thousands (e.g. 8.624 => 8.624k)
    const thousands = v > 1000 ? v / 1000 : v;
    return `$${Number(thousands).toFixed(thousands < 10 ? 1 : 0)}k`;
  };

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
              value={fmt(avgHappiness, 2)}
              subtitle="KPI Principal - Promedio (filtro activo)"
              icon={Smile}
              trend={{ value: 0, isPositive: true }}
              variant="primary"
            />
            <KPICard
              title="PIB per cápita promedio"
              value={fmtGdp(avgGdp)}
              subtitle="Promedio (miles de USD)"
              icon={TrendingUp}
              trend={{ value: 0, isPositive: true }}
            />
            <KPICard
              title="Apoyo Social Promedio"
              value={fmt(avgSocialSupport, 2)}
              subtitle="Factor comunitario del bienestar"
              icon={Users}
              trend={{ value: 0, isPositive: true }}
              variant="accent"
            />
            <KPICard
              title="Percepción de Corrupción"
              value={fmt(avgCorruption, 2)}
              subtitle="Impacto de la gobernanza"
              icon={Shield}
              trend={{ value: 0, isPositive: false }}
            />
            <KPICard
              title="Libertad de Elección"
              value={fmt(avgFreedom, 2)}
              subtitle="Autonomía individual percibida"
              icon={Heart}
              trend={{ value: 0, isPositive: true }}
            />
            <KPICard
              title="Países analizados"
              value={countriesCount == null ? "—" : String(countriesCount)}
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
