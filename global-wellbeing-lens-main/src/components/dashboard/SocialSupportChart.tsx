import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockData = [
  { region: "América del Norte", apoyo: 0.93 },
  { region: "Europa Occidental", apoyo: 0.92 },
  { region: "América Latina", apoyo: 0.87 },
  { region: "Asia Oriental", apoyo: 0.83 },
  { region: "Europa del Este", apoyo: 0.81 },
  { region: "Medio Oriente", apoyo: 0.78 },
  { region: "Asia del Sur", apoyo: 0.74 },
  { region: "África Subsahariana", apoyo: 0.68 },
];

export const SocialSupportChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Apoyo Social por Región</CardTitle>
        <CardDescription>Promedio del factor comunitario del bienestar (2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockData}>
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
              formatter={(value: any) => [value.toFixed(2), "Apoyo Social"]}
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
