import { useWeatherAlerts } from "@/hooks/useWeatherAlerts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CloudRain, Sun, Wind, Zap, Droplets, AlertTriangle } from "lucide-react";

const alertIcons = {
  rain: CloudRain,
  heat: Sun,
  wind: Wind,
  storm: Zap,
  drought: Droplets,
};

const severityColors = {
  low: "bg-blue-100 text-blue-800 border-blue-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
};

export function WeatherAlerts() {
  const { activeAlerts, isLoading } = useWeatherAlerts();

  if (isLoading || !activeAlerts?.length) return null;

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Weather Alerts
          </h2>
          <p className="text-muted-foreground">
            Stay informed about weather conditions affecting your region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeAlerts.map((alert) => {
            const Icon = alertIcons[alert.alert_type as keyof typeof alertIcons] || AlertTriangle;
            
            return (
              <Alert key={alert.id} className="relative">
                <Icon className="h-4 w-4" />
                <div className="flex items-start justify-between mb-2">
                  <AlertTitle className="text-base font-semibold">
                    {alert.alert_type.charAt(0).toUpperCase() + alert.alert_type.slice(1)} Alert
                  </AlertTitle>
                  <Badge 
                    variant="outline" 
                    className={severityColors[alert.severity as keyof typeof severityColors]}
                  >
                    {alert.severity}
                  </Badge>
                </div>
                <AlertDescription className="space-y-2">
                  <p className="text-sm">{alert.message}</p>
                  <div className="text-xs text-muted-foreground">
                    <p>Location: {alert.location}</p>
                    <p>Valid until: {new Date(alert.end_time).toLocaleDateString()}</p>
                  </div>
                </AlertDescription>
              </Alert>
            );
          })}
        </div>
      </div>
    </section>
  );
}