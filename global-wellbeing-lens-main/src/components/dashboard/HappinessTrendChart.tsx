import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { supabase } from "@/lib/supabase";

type ChartRow = { year: string; [region: string]: number | string | null };

const YEARS = Array.from({ length: 10 }, (_, i) => String(2015 + i));

export const HappinessTrendChart = () => {
  const [data, setData] = useState<ChartRow[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data: rows, error } = await supabase
          .from("happiness_data")
          .select('year, "regional indicator", "happiness score"')
          .gte("year", 2015)
          .lte("year", 2024)
          .order("year", { ascending: true });
        console.log("Filas recibidas:", rows?.length);
        console.log("Primeros 5:", rows?.slice(0, 5));
        console.log("Últimos 5:", rows?.slice(-5));

        if (error) {
          console.error("Supabase error (happiness trend):", error);
          setData([]);
          setRegions([]);
          return;
        }

        if (!rows || rows.length === 0) {
          setData([]);
          setRegions([]);
          return;
        }

        const agg: Record<string, Record<string, { sum: number; count: number }>> = {};
        const regionsSet = new Set<string>();

        for (const r of rows) {
          const rr: any = r;
          const y = String(rr["year"] ?? rr.year ?? "");
          const region = (rr["regional indicator"] ?? rr["regional_indicator"] ?? "Unknown") as string;
          const raw = rr["happiness score"] ?? rr["happiness_score"] ?? rr["happinessScore"] ?? rr["happiness"];
          const val = raw == null ? NaN : Number(raw);
          if (!y) continue;
          if (!region || region === "nan") continue;
          if (!Number.isFinite(val)) continue;
          regionsSet.add(region);
          if (!agg[y]) agg[y] = {};
          if (!agg[y][region]) agg[y][region] = { sum: 0, count: 0 };
          agg[y][region].sum += val;
          agg[y][region].count += 1;
        }

        const regionsList = Array.from(regionsSet).sort((a, b) => a.localeCompare(b));

        const chartData: ChartRow[] = YEARS.map((y) => {
          const obj: ChartRow = { year: y };
          for (const reg of regionsList) {
            const cell = agg[y]?.[reg];
            obj[reg] = cell ? cell.sum / cell.count : null;
          }
          return obj;
        });

        setData(chartData);
        setRegions(regionsList);
      } catch (e) {
        console.error(e);
        setData([]);
        setRegions([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  console.log("🔵 El componente HappinessTrendChart se está montando");


  const colorCount = 5;

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Tendencia Global de Felicidad</CardTitle>
        <CardDescription>Evolución por región (2015-2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="year" className="text-xs" />
            <YAxis domain={[0, 10]} className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            {regions.map((reg, i) => {
              const idx = (i % colorCount) + 1;
              return (
                <Line
                  key={reg}
                  type="monotone"
                  dataKey={reg}
                  stroke={`hsl(var(--chart-${idx}))`}
                  strokeWidth={2}
                  connectNulls={true}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
