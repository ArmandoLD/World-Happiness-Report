import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { region: "América del Norte", happiness: 7.1, countries: 3 },
  { region: "Europa Occidental", happiness: 7.0, countries: 21 },
  { region: "América Latina", happiness: 6.1, countries: 20 },
  { region: "Asia Oriental", happiness: 6.0, countries: 9 },
  { region: "Europa del Este", happiness: 5.8, countries: 29 },
  { region: "Medio Oriente", happiness: 5.4, countries: 17 },
  { region: "Asia del Sur", happiness: 4.8, countries: 7 },
  { region: "África Subsahariana", happiness: 4.6, countries: 36 },
];

export const RegionalComparison = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Comparación Regional</CardTitle>
        <CardDescription>Promedio de felicidad por región (2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" domain={[0, 8]} className="text-xs" />
            <YAxis 
              dataKey="region" 
              type="category" 
              width={150}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value: any, name: string, props: any) => {
                if (name === "happiness") return [value.toFixed(2), "Índice de Felicidad"];
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
