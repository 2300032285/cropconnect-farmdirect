-- Insert sample weather alerts (these don't need user references)
INSERT INTO public.weather_alerts (alert_type, severity, location, message, start_time, end_time) VALUES
  ('rain', 'moderate', 'Punjab', 'Moderate rainfall expected in the region. Farmers advised to cover harvested crops.', NOW(), NOW() + INTERVAL '2 days'),
  ('heat', 'high', 'Haryana', 'High temperature warning. Ensure adequate irrigation for crops.', NOW(), NOW() + INTERVAL '3 days'),
  ('wind', 'low', 'Gujarat', 'Light winds expected. Good conditions for pesticide application.', NOW(), NOW() + INTERVAL '1 day'),
  ('storm', 'high', 'Maharashtra', 'Severe storm warning. Secure farming equipment and protect crops.', NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days'),
  ('drought', 'high', 'Rajasthan', 'Water scarcity warning. Implement water conservation measures.', NOW(), NOW() + INTERVAL '7 days');