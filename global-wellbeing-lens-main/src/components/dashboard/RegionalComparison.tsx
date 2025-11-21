import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";
import { useFilters } from "@/context/FiltersContext";

type RegionRow = { region: string; happiness: number; countries: number };

export const RegionalComparison = () => {
  const { selectedYear } = useFilters();
  const [data, setData] = useState<RegionRow[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let query = supabase.from("happiness_data").select('"regional indicator", "happiness score"');

        if (selectedYear && selectedYear !== "") {
          const y = Number(selectedYear);
          if (!Number.isNaN(y)) query = query.eq("year", y);
        }

        const { data: rows, error } = await query;
        if (error) {
          console.error("Supabase error (regional comparison):", error);
          setData(null);
          return;
        }

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
          setData([]);
          return;
        }

        const groups: Record<string, { sum: number; count: number }> = {};
        for (const r of rows) {
          const region = (r["regional indicator"] ?? r["regional_indicator"] ?? "Unknown") as string;
          const raw = r["happiness score"] ?? r["happiness_score"] ?? r["happinessScore"];
          const value = raw == null ? NaN : Number(raw);
          if (!region || region === "nan") continue;
          if (!Number.isFinite(value)) continue;
          if (!groups[region]) groups[region] = { sum: 0, count: 0 };
          groups[region].sum += value;
          groups[region].count += 1;
        }

        const result: RegionRow[] = Object.keys(groups).map((region) => ({
          region,
          happiness: groups[region].sum / groups[region].count,
          countries: groups[region].count,
        }));

        // sort descending by happiness
        result.sort((a, b) => b.happiness - a.happiness);
        setData(result);
      } catch (e) {
        console.error(e);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedYear]);

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Comparación Regional</CardTitle>
        <CardDescription>Promedio de felicidad por región ({selectedYear ?? "todos los años"})</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data ?? []} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" domain={[0, 10]} className="text-xs" />
            <YAxis 
              dataKey="region" 
              type="category" 
              width={180}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value: any, name: string) => {
                if (name === "happiness") return [Number(value).toFixed(2), "Índice de Felicidad"];
                return [value, name];
              }}
            />
            <Bar 
              dataKey="happiness" 
              fill="hsl(var(--primary))" 
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
