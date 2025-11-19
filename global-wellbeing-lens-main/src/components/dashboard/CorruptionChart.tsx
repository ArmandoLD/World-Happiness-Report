import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const topCountries = [
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

const bottomCountries = [
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
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-card border-accent/20">
        <CardHeader>
          <CardTitle>Menor Percepción de Corrupción</CardTitle>
          <CardDescription>Top 10 países con mejor gobernanza (2024)</CardDescription>
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

      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle>Mayor Percepción de Corrupción</CardTitle>
          <CardDescription>Bottom 10 países con desafíos de gobernanza (2024)</CardDescription>
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
