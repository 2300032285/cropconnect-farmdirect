import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CloudRain, Sun, Wind, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const getWeatherIcon = (type: string) => {
  switch (type) {
    case 'rain':
      return CloudRain;
    case 'heat':
      return Sun;
    case 'wind':
      return Wind;
    case 'storm':
      return Zap;
    default:
      return AlertTriangle;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'border-red-500 bg-red-50 text-red-800';
    case 'moderate':
      return 'border-orange-500 bg-orange-50 text-orange-800';
    case 'low':
      return 'border-yellow-500 bg-yellow-50 text-yellow-800';
    default:
      return 'border-gray-500 bg-gray-50 text-gray-800';
  }
};

export function WeatherAlerts() {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['weather-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('weather_alerts')
        .select('*')
        .gte('end_time', new Date().toISOString())
        .order('start_time', { ascending: true })
        .limit(5);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading || !alerts || alerts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">Weather Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => {
            const Icon = getWeatherIcon(alert.alert_type);
            return (
              <Alert 
                key={alert.id} 
                className={`${getSeverityColor(alert.severity)} border-2`}
              >
                <Icon className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold capitalize">
                    {alert.alert_type} Alert - {alert.location}
                  </h3>
                  <AlertDescription className="mt-1">
                    {alert.message}
                  </AlertDescription>
                  <div className="text-xs mt-2 opacity-75">
                    Until {new Date(alert.end_time).toLocaleDateString()}
                  </div>
                </div>
              </Alert>
            );
          })}
        </div>
      </div>
    </section>
  );
}