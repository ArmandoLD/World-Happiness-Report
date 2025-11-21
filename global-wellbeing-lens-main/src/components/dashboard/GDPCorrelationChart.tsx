import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/lib/supabase";
import { useFilters } from "@/context/FiltersContext";

type Point = { gdp: number; happiness: number; country: string; region?: string };

export const GDPCorrelationChart = () => {
  const { selectedYear } = useFilters();
  const [points, setPoints] = useState<Point[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from("happiness_data")
          .select('"country", "gdp per capita", "happiness score", "regional indicator"');

        if (selectedYear && selectedYear !== "") {
          const y = Number(selectedYear);
          if (!Number.isNaN(y)) query = query.eq("year", y);
        }

        // safe range to avoid silent truncation for small datasets
        const { data: rows, error } = await query.range(0, 5000);
        if (error) {
          console.error("Supabase error (gdp correlation):", error);
          setPoints([]);
          return;
        }

        if (!rows || rows.length === 0) {
          setPoints([]);
          return;
        }

        const pts: Point[] = [];
        for (const r of rows) {
          const rr: any = r;
          const country = rr["country"] ?? rr.country ?? "";
          const region = rr["regional indicator"] ?? rr["regional_indicator"] ?? rr.region ?? undefined;
          const rawGdp = rr["gdp per capita"] ?? rr["gdp_per_capita"] ?? rr.gdp;
          const rawHap = rr["happiness score"] ?? rr["happiness_score"] ?? rr.happiness;
          const gdp = rawGdp == null ? NaN : Number(rawGdp);
          const happiness = rawHap == null ? NaN : Number(rawHap);
          if (!country) continue;
          if (!Number.isFinite(gdp) || !Number.isFinite(happiness)) continue;
          pts.push({ gdp, happiness, country, region });
        }

        setPoints(pts);
      } catch (e) {
        console.error(e);
        setPoints([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedYear]);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>PIB per cápita vs Índice de Felicidad</CardTitle>
        <CardDescription>Correlación económica con el bienestar ({selectedYear ?? "todos los años"})</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="gdp"
              name="PIB per cápita (USD)"
              className="text-xs"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <YAxis dataKey="happiness" name="Felicidad" domain={[0, 10]} className="text-xs" />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
              formatter={(value: any, name: string) => {
                if (name === "PIB per cápita (USD)") return [`$${Number(value).toLocaleString()}`, name];
                if (typeof value === "number") return [Number(value).toFixed(2), name];
                return [String(value), name];
              }}
            />
            <Legend />
            <Scatter name="Países" data={points} fill="hsl(var(--primary))" fillOpacity={0.6} />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
