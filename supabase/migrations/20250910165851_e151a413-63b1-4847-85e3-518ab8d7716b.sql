-- Insert sample products without user dependencies (for demo purposes)
-- Note: In production, these would be linked to real user profiles

-- First, let's insert some standalone sample data for testing
INSERT INTO public.products (name, description, category, price, unit, quantity_available, minimum_order, organic, harvest_date, expiry_date, location, image_url, status) VALUES
  ('Organic Tomatoes', 'Fresh organic tomatoes grown without pesticides', 'vegetables', 45.00, 'kg', 500, 10, true, '2024-01-15', '2024-02-15', 'Punjab', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400', 'available'),
  ('Fresh Wheat', 'High quality wheat suitable for flour production', 'grains', 22.00, 'kg', 2000, 50, false, '2024-01-10', '2024-12-31', 'Haryana', 'https://images.unsplash.com/photo-1574323566094-1877bb5ee611?w=400', 'available'),
  ('Basmati Rice', 'Premium quality basmati rice with authentic aroma', 'grains', 85.00, 'kg', 1500, 25, true, '2024-01-08', '2025-01-08', 'Gujarat', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', 'available'),
  ('Fresh Onions', 'Grade A onions perfect for wholesale distribution', 'vegetables', 28.00, 'kg', 800, 20, false, '2024-01-12', '2024-04-12', 'Maharashtra', 'https://images.unsplash.com/photo-1508313880080-c4bce1d99b6d?w=400', 'available'),
  ('Organic Mangoes', 'Alphonso mangoes grown organically in our orchards', 'fruits', 120.00, 'kg', 300, 5, true, '2024-01-20', '2024-02-20', 'Andhra Pradesh', 'https://images.unsplash.com/photo-1553279768-865429ffd9d1?w=400', 'available'),
  ('Fresh Potatoes', 'Farm fresh potatoes ideal for cooking and processing', 'vegetables', 18.00, 'kg', 1200, 30, false, '2024-01-14', '2024-06-14', 'Uttar Pradesh', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400', 'available'),
  ('Organic Carrots', 'Sweet and crunchy organic carrots', 'vegetables', 35.00, 'kg', 200, 5, true, '2024-01-18', '2024-03-18', 'Punjab', 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400', 'available'),
  ('Yellow Mustard Seeds', 'Premium quality mustard seeds for oil extraction', 'spices', 65.00, 'kg', 400, 10, false, '2024-01-05', '2025-01-05', 'Haryana', 'https://images.unsplash.com/photo-1596040033229-a292df4483d0?w=400', 'available'),
  ('Organic Spinach', 'Fresh organic spinach leaves', 'vegetables', 25.00, 'kg', 150, 5, true, '2024-01-22', '2024-02-01', 'Punjab', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', 'available'),
  ('Fresh Corn', 'Sweet yellow corn kernels', 'vegetables', 30.00, 'kg', 400, 10, false, '2024-01-16', '2024-03-16', 'Karnataka', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400', 'available');

-- Insert sample weather alerts
INSERT INTO public.weather_alerts (alert_type, severity, location, message, start_time, end_time) VALUES
  ('rain', 'moderate', 'Punjab', 'Moderate rainfall expected in the region. Farmers advised to cover harvested crops.', NOW(), NOW() + INTERVAL '2 days'),
  ('heat', 'high', 'Haryana', 'High temperature warning. Ensure adequate irrigation for crops.', NOW(), NOW() + INTERVAL '3 days'),
  ('wind', 'low', 'Gujarat', 'Light winds expected. Good conditions for pesticide application.', NOW(), NOW() + INTERVAL '1 day'),
  ('storm', 'high', 'Maharashtra', 'Severe storm warning. Secure farming equipment and protect crops.', NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days'),
  ('drought', 'moderate', 'Rajasthan', 'Water scarcity warning. Implement water conservation measures.', NOW(), NOW() + INTERVAL '7 days');