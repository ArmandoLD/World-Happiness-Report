import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { supabase } from "@/lib/supabase";
import { useFilters } from "@/context/FiltersContext";

type RegionRow = { region: string; apoyo: number };

export const SocialSupportChart = () => {
  const { selectedYear } = useFilters();
  const [data, setData] = useState<RegionRow[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        let query = supabase.from("happiness_data").select('"regional indicator", "social support"');

        if (selectedYear && selectedYear !== "") {
          const y = Number(selectedYear);
          if (!Number.isNaN(y)) query = query.eq("year", y);
        }

        const { data: rows, error } = await query;
        if (error) {
          console.error("Supabase error (social support):", error);
          setData(null);
          return;
        }

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
          setData([]);
          return;
        }

        // Group by regional indicator and compute average social support
        const groups: Record<string, { sum: number; count: number }> = {};
        for (const r of rows) {
          const region = (r["regional indicator"] ?? r["regional_indicator"] ?? "Unknown") as string;
          const raw = r["social support"] ?? r["social_support"] ?? r["socialSupport"];
          const value = raw == null ? NaN : Number(raw);
          if (!region || region === "nan") continue;
          if (!Number.isFinite(value)) continue;
          if (!groups[region]) groups[region] = { sum: 0, count: 0 };
          groups[region].sum += value;
          groups[region].count += 1;
        }

        const result: RegionRow[] = Object.keys(groups).map((region) => ({
          region,
          apoyo: groups[region].sum / groups[region].count,
        }));

        // sort descending by apoyo
        result.sort((a, b) => b.apoyo - a.apoyo);
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
        <CardTitle>Apoyo Social por Región</CardTitle>
        <CardDescription>Promedio del factor comunitario del bienestar ({selectedYear ?? "todos los años"})</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data ?? []}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="region" 
              angle={-45}
              textAnchor="end"
              height={120}
              className="text-xs"
            />
            <YAxis domain={[0, 1]} className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value: any) => [Number(value).toFixed(2), "Apoyo Social"]}
            />
            <Legend />
            <Bar 
              dataKey="apoyo" 
              fill="hsl(var(--accent))" 
              radius={[8, 8, 0, 0]}
              name="Índice de Apoyo Social"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
