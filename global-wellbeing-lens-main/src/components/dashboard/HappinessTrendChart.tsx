import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockData = [
  { year: "2015", "América del Norte": 7.2, "Europa Occidental": 6.9, "América Latina": 6.1, "Asia Oriental": 5.6, "África": 4.3 },
  { year: "2017", "América del Norte": 7.1, "Europa Occidental": 6.9, "América Latina": 6.0, "Asia Oriental": 5.7, "África": 4.4 },
  { year: "2019", "América del Norte": 7.0, "Europa Occidental": 7.0, "América Latina": 6.1, "Asia Oriental": 5.8, "África": 4.4 },
  { year: "2021", "América del Norte": 6.9, "Europa Occidental": 6.8, "América Latina": 5.9, "Asia Oriental": 5.9, "África": 4.5 },
  { year: "2023", "América del Norte": 7.0, "Europa Occidental": 6.9, "América Latina": 6.0, "Asia Oriental": 6.0, "África": 4.6 },
  { year: "2024", "América del Norte": 7.1, "Europa Occidental": 7.0, "América Latina": 6.1, "Asia Oriental": 6.1, "África": 4.7 },
];

export const HappinessTrendChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Tendencia Global de Felicidad</CardTitle>
        <CardDescription>Evolución por región (2015-2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="year" className="text-xs" />
            <YAxis domain={[3, 8]} className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }} 
            />
            <Legend />
            <Line type="monotone" dataKey="América del Norte" stroke="hsl(var(--chart-1))" strokeWidth={2} />
            <Line type="monotone" dataKey="Europa Occidental" stroke="hsl(var(--chart-2))" strokeWidth={2} />
            <Line type="monotone" dataKey="América Latina" stroke="hsl(var(--chart-3))" strokeWidth={2} />
            <Line type="monotone" dataKey="Asia Oriental" stroke="hsl(var(--chart-4))" strokeWidth={2} />
            <Line type="monotone" dataKey="África" stroke="hsl(var(--chart-5))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
