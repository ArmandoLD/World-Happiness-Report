import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, RotateCcw } from "lucide-react";
import { useFilters } from "@/context/FiltersContext";

export const FilterBar = () => {
  const {
    years,
    regions,
    countries,
    selectedYear,
    selectedRegion,
    selectedCountry,
    setSelectedYear,
    setSelectedRegion,
    setSelectedCountry,
    loading,
  } = useFilters();

  const handleReset = () => {
    setSelectedYear(years.includes("2024") ? "2024" : years[0] ?? null);
    setSelectedRegion("Todas las regiones");
    setSelectedCountry("Todos los países");
  };

  return (
    <Card className="shadow-card bg-gradient-to-r from-primary/5 via-background to-accent/5 border-primary/20">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Filtros de Análisis</h2>
        </div>
        
        <div className="grid gap-4 md:grid-cols-4">
          {/* Año */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Año</label>
            <Select value={selectedYear ?? ""} onValueChange={(v) => setSelectedYear(v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {loading
                  ? null
                  : years.filter((year) => year && year !== "").map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          {/* Región */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Región</label>
            <Select value={selectedRegion ?? "Todas las regiones"} onValueChange={(v) => setSelectedRegion(v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar región" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[300px]">
                {loading
                  ? null
                  : regions.filter((region) => region && region !== "").map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          {/* País */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">País</label>
            <Select value={selectedCountry ?? "Todos los países"} onValueChange={(v) => setSelectedCountry(v)}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar país" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[300px]">
                {loading
                  ? null
                  : countries.filter((country) => country && country !== "").map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botón Reset */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground invisible">Acciones</label>
            <Button 
              variant="outline" 
              onClick={handleReset}
              className="w-full border-primary/20 hover:bg-primary/5"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetear
            </Button>
          </div>
        </div>

        {/* Filtros aplicados */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium">Filtros activos:</span> {selectedYear} • {selectedRegion} • {selectedCountry}
          </p>
        </div>
      </div>
    </Card>
  );
};
