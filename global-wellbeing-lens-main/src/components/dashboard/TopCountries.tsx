import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

const topCountries = [
  { rank: 1, name: "Finlandia", score: 7.84, change: 0.02 },
  { rank: 2, name: "Dinamarca", score: 7.62, change: 0.05 },
  { rank: 3, name: "Islandia", score: 7.53, change: -0.01 },
  { rank: 4, name: "Suiza", score: 7.51, change: 0.03 },
  { rank: 5, name: "Países Bajos", score: 7.42, change: 0.01 },
];

const bottomCountries = [
  { rank: 143, name: "Afganistán", score: 2.52, change: -0.12 },
  { rank: 142, name: "Líbano", score: 2.71, change: -0.08 },
  { rank: 141, name: "Zimbabue", score: 2.87, change: 0.03 },
  { rank: 140, name: "Ruanda", score: 3.02, change: 0.05 },
  { rank: 139, name: "Botsuana", score: 3.18, change: -0.02 },
];

export const TopCountries = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="shadow-card border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Top 5 Países Más Felices
          </CardTitle>
          <CardDescription>Clasificación 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topCountries.map((country) => (
              <div key={country.rank} className="flex items-center justify-between p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background">
                    #{country.rank}
                  </Badge>
                  <span className="font-medium">{country.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-accent">{country.score.toFixed(2)}</span>
                  <span className={`text-xs ${country.change >= 0 ? "text-accent" : "text-destructive"}`}>
                    {country.change >= 0 ? "+" : ""}{country.change.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-destructive/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-destructive" />
            Bottom 5 Países Menos Felices
          </CardTitle>
          <CardDescription>Clasificación 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {bottomCountries.map((country) => (
              <div key={country.rank} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-background">
                    #{country.rank}
                  </Badge>
                  <span className="font-medium">{country.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-destructive">{country.score.toFixed(2)}</span>
                  <span className={`text-xs ${country.change >= 0 ? "text-accent" : "text-destructive"}`}>
                    {country.change >= 0 ? "+" : ""}{country.change.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
