import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "accent";
}

export const KPICard = ({ title, value, subtitle, icon: Icon, trend, variant = "default" }: KPICardProps) => {
  return (
    <Card className={cn(
      "shadow-soft hover:shadow-card transition-all duration-300",
      variant === "primary" && "border-primary/20 bg-gradient-to-br from-primary/5 to-transparent",
      variant === "accent" && "border-accent/20 bg-gradient-to-br from-accent/5 to-transparent"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn(
          "h-5 w-5",
          variant === "primary" && "text-primary",
          variant === "accent" && "text-accent",
          variant === "default" && "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            "text-xs font-medium mt-2 flex items-center gap-1",
            trend.isPositive ? "text-accent" : "text-destructive"
          )}>
            <span>{trend.isPositive ? "↑" : "↓"}</span>
            <span>{Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground">vs anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
