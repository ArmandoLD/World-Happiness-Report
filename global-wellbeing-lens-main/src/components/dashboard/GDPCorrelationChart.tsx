import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockData = [
  { gdp: 65000, happiness: 7.8, country: "Luxemburgo", region: "Europa" },
  { gdp: 55000, happiness: 7.5, country: "Suiza", region: "Europa" },
  { gdp: 50000, happiness: 7.6, country: "Noruega", region: "Europa" },
  { gdp: 48000, happiness: 7.4, country: "EE.UU.", region: "América del Norte" },
  { gdp: 45000, happiness: 7.3, country: "Países Bajos", region: "Europa" },
  { gdp: 42000, happiness: 7.2, country: "Alemania", region: "Europa" },
  { gdp: 38000, happiness: 7.0, country: "Reino Unido", region: "Europa" },
  { gdp: 35000, happiness: 6.8, country: "Japón", region: "Asia" },
  { gdp: 30000, happiness: 6.5, country: "Corea del Sur", region: "Asia" },
  { gdp: 25000, happiness: 6.2, country: "España", region: "Europa" },
  { gdp: 20000, happiness: 6.0, country: "Chile", region: "América Latina" },
  { gdp: 15000, happiness: 5.8, country: "Argentina", region: "América Latina" },
  { gdp: 12000, happiness: 5.5, country: "China", region: "Asia" },
  { gdp: 10000, happiness: 5.2, country: "Brasil", region: "América Latina" },
  { gdp: 8000, happiness: 5.0, country: "Tailandia", region: "Asia" },
  { gdp: 6000, happiness: 4.8, country: "India", region: "Asia" },
  { gdp: 4000, happiness: 4.5, country: "Nigeria", region: "África" },
  { gdp: 3000, happiness: 4.2, country: "Kenia", region: "África" },
  { gdp: 2000, happiness: 3.8, country: "Etiopía", region: "África" },
  { gdp: 1500, happiness: 3.5, country: "Chad", region: "África" },
];

export const GDPCorrelationChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>PIB per cápita vs Índice de Felicidad</CardTitle>
        <CardDescription>Correlación económica con el bienestar (2024)</CardDescription>
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
            <YAxis 
              dataKey="happiness" 
              name="Felicidad" 
              domain={[3, 8]} 
              className="text-xs"
            />
            <Tooltip 
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
              formatter={(value: any, name: string) => {
                if (name === "PIB per cápita (USD)") return [`$${value.toLocaleString()}`, name];
                return [value, name];
              }}
            />
            <Legend />
            <Scatter 
              name="Países" 
              data={mockData} 
              fill="hsl(var(--primary))" 
              fillOpacity={0.6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
