import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockData = [
  { year: "2015", "América del Norte": 0.82, "Europa Occidental": 0.79, "América Latina": 0.72, "Asia Oriental": 0.68, "África": 0.61 },
  { year: "2017", "América del Norte": 0.81, "Europa Occidental": 0.80, "América Latina": 0.71, "Asia Oriental": 0.69, "África": 0.62 },
  { year: "2019", "América del Norte": 0.80, "Europa Occidental": 0.81, "América Latina": 0.70, "Asia Oriental": 0.70, "África": 0.63 },
  { year: "2021", "América del Norte": 0.78, "Europa Occidental": 0.79, "América Latina": 0.68, "Asia Oriental": 0.71, "África": 0.64 },
  { year: "2023", "América del Norte": 0.79, "Europa Occidental": 0.80, "América Latina": 0.69, "Asia Oriental": 0.72, "África": 0.65 },
  { year: "2024", "América del Norte": 0.81, "Europa Occidental": 0.82, "América Latina": 0.70, "Asia Oriental": 0.73, "África": 0.66 },
];

export const FreedomTrendChart = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Libertad de Elección</CardTitle>
        <CardDescription>Evolución de la autonomía individual percibida (2015-2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorNA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEU" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-4))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-4))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAF" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="year" className="text-xs" />
            <YAxis domain={[0.5, 0.9]} className="text-xs" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }} 
            />
            <Legend />
            <Area type="monotone" dataKey="América del Norte" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorNA)" />
            <Area type="monotone" dataKey="Europa Occidental" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorEU)" />
            <Area type="monotone" dataKey="América Latina" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#colorLA)" />
            <Area type="monotone" dataKey="Asia Oriental" stroke="hsl(var(--chart-4))" fillOpacity={1} fill="url(#colorAS)" />
            <Area type="monotone" dataKey="África" stroke="hsl(var(--chart-5))" fillOpacity={1} fill="url(#colorAF)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
