import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, RotateCcw } from "lucide-react";
import { useState } from "react";

const years = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024"];

const regions = [
  "Todas las regiones",
  "América del Norte",
  "Europa Occidental",
  "América Latina y el Caribe",
  "Asia Oriental",
  "Europa del Este",
  "Medio Oriente y África del Norte",
  "Asia del Sur",
  "África Subsahariana",
];

const countries = [
  "Todos los países",
  "Finlandia",
  "Dinamarca",
  "Islandia",
  "Suiza",
  "Países Bajos",
  "Noruega",
  "Suecia",
  "Alemania",
  "España",
  "Francia",
  "Reino Unido",
  "Estados Unidos",
  "Canadá",
  "México",
  "Brasil",
  "Argentina",
  "Chile",
  "China",
  "Japón",
  "Corea del Sur",
  "India",
  "Tailandia",
];

export const FilterBar = () => {
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [selectedRegion, setSelectedRegion] = useState<string>("Todas las regiones");
  const [selectedCountry, setSelectedCountry] = useState<string>("Todos los países");

  const handleReset = () => {
    setSelectedYear("2024");
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
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {years.map((year) => (
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
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar región" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[300px]">
                {regions.map((region) => (
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
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar país" />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[300px]">
                {countries.map((country) => (
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
