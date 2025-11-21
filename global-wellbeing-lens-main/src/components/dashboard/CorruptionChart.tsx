import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";
import { useFilters } from "@/context/FiltersContext";

type Row = { country: string; corrupcion: number };

const topCountriesStatic: Row[] = [
  { country: "Singapur", corrupcion: 0.15 },
  { country: "Dinamarca", corrupcion: 0.17 },
  { country: "Nueva Zelanda", corrupcion: 0.18 },
  { country: "Finlandia", corrupcion: 0.19 },
  { country: "Suecia", corrupcion: 0.20 },
  { country: "Noruega", corrupcion: 0.21 },
  { country: "Suiza", corrupcion: 0.22 },
  { country: "Países Bajos", corrupcion: 0.24 },
  { country: "Canadá", corrupcion: 0.26 },
  { country: "Alemania", corrupcion: 0.28 },
];

const bottomCountriesStatic: Row[] = [
  { country: "Afganistán", corrupcion: 0.89 },
  { country: "Sudán del Sur", corrupcion: 0.86 },
  { country: "Siria", corrupcion: 0.84 },
  { country: "Venezuela", corrupcion: 0.82 },
  { country: "Yemen", corrupcion: 0.80 },
  { country: "Haití", corrupcion: 0.78 },
  { country: "Guinea Ecuatorial", corrupcion: 0.76 },
  { country: "Libia", corrupcion: 0.74 },
  { country: "Congo", corrupcion: 0.72 },
  { country: "Chad", corrupcion: 0.70 },
];

export const CorruptionChart = () => {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { selectedYear, selectedRegion, selectedCountry } = useFilters();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("happiness_data")
          .select('country, "perceptions of corruption", year, "regional indicator"');

        if (selectedYear && selectedYear !== "") {
          const y = Number(selectedYear);
          if (!Number.isNaN(y)) query = query.eq("year", y);
        }

        if (selectedRegion && selectedRegion !== "Todas las regiones") {
          query = query.eq("regional indicator", selectedRegion);
        }

        if (selectedCountry && selectedCountry !== "Todos los países") {
          query = query.eq("country", selectedCountry);
        }

        const { data, error } = await query.range(0, 5000);

        if (error) {
          console.error("Supabase error:", error);
        } else if (data && Array.isArray(data)) {
          const mapped: Row[] = data.map((r) => {
            const raw = r["perceptions of corruption"] ?? r["perceptions_of_corruption"] ?? r["perceptionsOfCorruption"] ?? r["perceptions"];
            const value = raw == null ? NaN : Number(raw);
            return {
              country: r.country ?? "",
              corrupcion: Number.isFinite(value) ? Number(value) : NaN,
            };
          });
          setRows(mapped);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedYear, selectedRegion, selectedCountry]);

  // Filtrar valores inválidos
  const cleanRows = rows
    ? rows.filter((r) => Number.isFinite(r.corrupcion) && r.corrupcion > 0)
    : null;

  // Orden general una sola vez (menor → mayor)
  const sorted = cleanRows ? [...cleanRows].sort((a, b) => a.corrupcion - b.corrupcion) : null;

  // Top 10 reales
  const topCountries = sorted?.slice(0, 10) ?? topCountriesStatic;

  // Bottom 10 reales (tomando los más altos)
  const bottomCountries = sorted
    ? [...sorted].slice(-10).reverse()
    : bottomCountriesStatic;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* TOP 10 */}
      <Card className="shadow-card border-accent/20">
        <CardHeader>
          <CardTitle>Menor Percepción de Corrupción</CardTitle>
          <CardDescription>Top 10 países con mejor gobernanza ({selectedYear ?? "todos los años"})</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topCountries} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 1]} className="text-xs" />
              <YAxis 
                dataKey="country" 
                type="category" 
                width={120}
                className="text-xs"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                formatter={(value: any) => [value.toFixed(2), "Percepción de Corrupción"]}
              />
              <Bar 
                dataKey="corrupcion" 
                fill="hsl(var(--accent))" 
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* BOTTOM 10 */}
      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle>Mayor Percepción de Corrupción</CardTitle>
          <CardDescription>Bottom 10 países con desafíos de gobernanza ({selectedYear ?? "todos los años"})</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={bottomCountries} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 1]} className="text-xs" />
              <YAxis 
                dataKey="country" 
                type="category" 
                width={120}
                className="text-xs"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
                formatter={(value: any) => [value.toFixed(2), "Percepción de Corrupción"]}
              />
              <Bar 
                dataKey="corrupcion" 
                fill="hsl(var(--destructive))" 
                radius={[0, 8, 8, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
