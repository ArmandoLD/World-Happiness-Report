import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type FiltersContextType = {
  years: string[];
  regions: string[];
  countries: string[];
  selectedYear: string | null;
  selectedRegion: string | null;
  selectedCountry: string | null;
  setSelectedYear: (y: string | null) => void;
  setSelectedRegion: (r: string | null) => void;
  setSelectedCountry: (c: string | null) => void;
  loading: boolean;
  refresh: () => Promise<void>;
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [years, setYears] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const [selectedYear, setSelectedYear] = useState<string | null>("2024");
  const [selectedRegion, setSelectedRegion] = useState<string | null>("Todas las regiones");
  const [selectedCountry, setSelectedCountry] = useState<string | null>("Todos los países");

  const [loading, setLoading] = useState(false);

  const fetchOptions = async () => {
    setLoading(true);
    try {
      // Use static years for the filter (2015-2024) and fetch only regions/countries.
      const [regionsRes, countriesRes] = await Promise.all([
        supabase.from("happiness_data").select('"regional indicator"'),
        supabase.from("happiness_data").select("country"),
      ]);

      if (regionsRes.error || countriesRes.error) {
        console.error("Error fetching filter options:", { regionsError: regionsRes.error, countriesError: countriesRes.error });
      }

      const regionsArray = Array.isArray(regionsRes.data) ? regionsRes.data.map((r: any) => r["regional indicator"]) : [];
      const regionsSet = Array.from(new Set(regionsArray)).filter(Boolean) as string[];
      regionsSet.sort();

      const countriesArray = Array.isArray(countriesRes.data) ? countriesRes.data.map((r: any) => r.country) : [];
      const countriesSet = Array.from(new Set(countriesArray)).filter(Boolean) as string[];
      countriesSet.sort();

      const staticYears = ["2024","2023","2022","2021","2020","2019","2018","2017","2016","2015"];

      setYears(staticYears);
      setRegions(["Todas las regiones", ...regionsSet]);
      setCountries(["Todos los países", ...countriesSet]);

      // ensure selected values are valid
      if (selectedYear == null) setSelectedYear(staticYears[0]);
      if (selectedRegion == null) setSelectedRegion("Todas las regiones");
      if (selectedCountry == null) setSelectedCountry("Todos los países");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FiltersContext.Provider
      value={{
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
        refresh: fetchOptions,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
  return ctx;
};

export default FiltersProvider;
