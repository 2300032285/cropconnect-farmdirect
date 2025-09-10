import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useWeatherAlerts() {
  const { data: alerts, isLoading } = useQuery({
    queryKey: ['weather-alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('weather_alerts')
        .select('*')
        .gte('end_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;
      return data;
    },
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });

  return {
    alerts,
    isLoading,
    activeAlerts: alerts?.filter(alert => 
      new Date(alert.start_time) <= new Date() && 
      new Date(alert.end_time) >= new Date()
    ) || [],
  };
}