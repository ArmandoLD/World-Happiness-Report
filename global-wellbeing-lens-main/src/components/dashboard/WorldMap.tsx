import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export const WorldMap = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Distribución Mundial de Felicidad</CardTitle>
        <CardDescription>Visualización geográfica del índice de felicidad</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-lg border border-border overflow-hidden">
          {/* Mapa conceptual simplificado */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 mx-auto text-primary animate-pulse" />
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">Mapa Mundial Interactivo</p>
                <p className="text-sm text-muted-foreground max-w-md">
                  Visualización geográfica del índice de felicidad por países.
                  Los colores más cálidos representan mayor felicidad.
                </p>
              </div>
              
              {/* Leyenda de colores */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-xs text-muted-foreground">Bajo</span>
                <div className="flex gap-1">
                  <div className="w-8 h-4 bg-destructive/30 rounded-sm" />
                  <div className="w-8 h-4 bg-secondary/40 rounded-sm" />
                  <div className="w-8 h-4 bg-secondary/70 rounded-sm" />
                  <div className="w-8 h-4 bg-accent/60 rounded-sm" />
                  <div className="w-8 h-4 bg-accent rounded-sm" />
                </div>
                <span className="text-xs text-muted-foreground">Alto</span>
              </div>
            </div>
          </div>
          
          {/* Decorative grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
