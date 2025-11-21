import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useFilters } from "@/context/FiltersContext";

type CountryRow = { country: string; score: number; change?: number; };

export const TopCountries = () => {
  const { selectedYear, selectedRegion, selectedCountry } = useFilters();
  const [top, setTop] = useState<CountryRow[]>([]);
  const [bottom, setBottom] = useState<CountryRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Build base filters
        const buildBase = () => supabase.from("happiness_data").select('country, "happiness score", year, "regional indicator"');

        const applyFilters = (q: any) => {
          let qq = q;
          if (selectedYear && selectedYear !== "") {
            const y = Number(selectedYear);
            if (!Number.isNaN(y)) qq = qq.eq("year", y);
          }
          if (selectedRegion && selectedRegion !== "Todas las regiones") qq = qq.eq("regional indicator", selectedRegion);
          if (selectedCountry && selectedCountry !== "Todos los países") qq = qq.eq("country", selectedCountry);
          return qq;
        };

        // Top 5 (highest happiness score)
        let qTop = buildBase();
        qTop = applyFilters(qTop).order('"happiness score"', { ascending: false }).range(0, 4);
        const { data: topData, error: topError } = await qTop;

        // Bottom 5 (lowest happiness score)
        let qBottom = buildBase();
        qBottom = applyFilters(qBottom).order('"happiness score"', { ascending: true }).range(0, 4);
        const { data: bottomData, error: bottomError } = await qBottom;

        if (topError) console.error("Top fetch error:", topError);
        if (bottomError) console.error("Bottom fetch error:", bottomError);

        const mapRows = (arr: any[] | null): CountryRow[] => {
          if (!arr) return [];
          return arr.map((r) => {
            const raw = r["happiness score"] ?? r["happiness_score"] ?? r["happinessScore"] ?? r["score"];
            const value = raw == null ? NaN : Number(raw);
            return { country: r.country ?? "", score: Number.isFinite(value) ? value : 0 };
          });
        };

        const topRows = mapRows(topData as any[]);
        const bottomRows = mapRows(bottomData as any[]);

        // Optionally compute change vs previous year if selectedYear provided
        if (selectedYear) {
          const prevYear = Number(selectedYear) - 1;
          const fetchPrev = async (countryName: string) => {
            const { data } = await supabase.from("happiness_data").select('"happiness score"').eq("country", countryName).eq("year", prevYear).maybeSingle();
            if (data) {
              const raw = data["happiness score"] ?? data["happiness_score"];
              return Number.isFinite(Number(raw)) ? Number(raw) : null;
            }
            return null;
          };

          // compute changes in parallel
          const computeChanges = async (rows: CountryRow[]) => {
            return Promise.all(rows.map(async (r) => {
              const prev = await fetchPrev(r.country);
              return { ...r, change: prev == null ? 0 : Number((r.score - prev).toFixed(2)) };
            }));
          };

          const [topWithChange, bottomWithChange] = await Promise.all([computeChanges(topRows), computeChanges(bottomRows)]);
          setTop(topWithChange);
          setBottom(bottomWithChange);
        } else {
          setTop(topRows);
          setBottom(bottomRows);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedYear, selectedRegion, selectedCountry]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-card border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Top 5 Países Más Felices
          </CardTitle>
          <CardDescription>Clasificación {selectedYear ?? "(todos los años)"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {top.map((country, idx) => (
              <div key={country.country} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background">#{idx + 1}</Badge>
                  <span className="font-medium">{country.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-accent">{country.score.toFixed(2)}</span>
                  <span className={`text-xs ${country.change && country.change >= 0 ? "text-accent" : "text-destructive"}`}>
                    {country.change && country.change >= 0 ? "+" : ""}{(country.change ?? 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-destructive" />
            Bottom 5 Países Menos Felices
          </CardTitle>
          <CardDescription>Clasificación {selectedYear ?? "(todos los años)"}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bottom.map((country, idx) => (
              <div key={country.country} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background">#{idx + 1}</Badge>
                  <span className="font-medium">{country.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-destructive">{country.score.toFixed(2)}</span>
                  <span className={`text-xs ${country.change && country.change >= 0 ? "text-accent" : "text-destructive"}`}>
                    {country.change && country.change >= 0 ? "+" : ""}{(country.change ?? 0).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
