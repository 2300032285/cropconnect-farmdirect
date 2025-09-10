-- Insert sample farmer profiles
INSERT INTO public.profiles (user_id, full_name, phone, address, city, state, postal_code, bio, farm_name, role, organic_certified, farm_size_acres) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Rajesh Kumar', '+91-9876543210', 'Village Dhanouri, Ludhiana District', 'Ludhiana', 'Punjab', '141001', 'Organic farming specialist with 15 years of experience', 'Kumar Organic Farms', 'farmer', true, 25.5),
  ('22222222-2222-2222-2222-222222222222', 'Priya Sharma', '+91-9876543211', 'Bhiwani Road, Sector 14', 'Hisar', 'Haryana', '125001', 'Traditional wheat and mustard cultivation', 'Sharma Agriculture', 'farmer', false, 40.0),
  ('33333333-3333-3333-3333-333333333333', 'Sunil Patel', '+91-9876543212', 'Nr. APMC Market, Rajkot Road', 'Jamnagar', 'Gujarat', '361001', 'Premium rice cultivation with modern techniques', 'Patel Rice Mills', 'farmer', true, 60.0),
  ('44444444-4444-4444-4444-444444444444', 'Meera Devi', '+91-9876543213', 'Shivaji Nagar, Solapur Road', 'Pune', 'Maharashtra', '411001', 'Onion and sugarcane farming for 20+ years', 'Devi Krishi Kendra', 'farmer', false, 35.0),
  ('55555555-5555-5555-5555-555555555555', 'Ravi Reddy', '+91-9876543214', 'Guntur District, Tadepalli Village', 'Guntur', 'Andhra Pradesh', '522501', 'Mango orchard specialist with organic certification', 'Reddy Mango Orchards', 'farmer', true, 80.0),
  ('66666666-6666-6666-6666-666666666666', 'Amit Singh', '+91-9876543215', 'Saharanpur Road, Industrial Area', 'Meerut', 'Uttar Pradesh', '250001', 'Potato and sugarcane cultivation', 'Singh Agro Farm', 'farmer', false, 45.0);

-- Insert sample buyer profiles
INSERT INTO public.profiles (user_id, full_name, phone, address, city, state, postal_code, bio, role) VALUES
  ('77777777-7777-7777-7777-777777777777', 'Mumbai Wholesale Market', '+91-9876543216', 'Vashi Wholesale Market, Sector 19', 'Mumbai', 'Maharashtra', '400703', 'Leading wholesale distributor for fresh produce', 'buyer'),
  ('88888888-8888-8888-8888-888888888888', 'Delhi Fresh Foods', '+91-9876543217', 'Azadpur Mandi, Ring Road', 'Delhi', 'Delhi', '110033', 'Premium restaurant supply chain', 'buyer'),
  ('99999999-9999-9999-9999-999999999999', 'Bangalore Organics', '+91-9876543218', 'Electronic City, Phase 1', 'Bangalore', 'Karnataka', '560100', 'Organic food retailer serving South India', 'buyer');

-- Insert sample products
INSERT INTO public.products (farmer_id, name, description, category, price, unit, quantity_available, minimum_order, organic, harvest_date, expiry_date, location, image_url) VALUES
  ((SELECT id FROM profiles WHERE user_id = '11111111-1111-1111-1111-111111111111'), 'Organic Tomatoes', 'Fresh organic tomatoes grown without pesticides', 'vegetables', 45.00, 'kg', 500, 10, true, '2024-01-15', '2024-02-15', 'Punjab', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '22222222-2222-2222-2222-222222222222'), 'Fresh Wheat', 'High quality wheat suitable for flour production', 'grains', 22.00, 'kg', 2000, 50, false, '2024-01-10', '2024-12-31', 'Haryana', 'https://images.unsplash.com/photo-1574323566094-1877bb5ee611?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '33333333-3333-3333-3333-333333333333'), 'Basmati Rice', 'Premium quality basmati rice with authentic aroma', 'grains', 85.00, 'kg', 1500, 25, true, '2024-01-08', '2025-01-08', 'Gujarat', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '44444444-4444-4444-4444-444444444444'), 'Fresh Onions', 'Grade A onions perfect for wholesale distribution', 'vegetables', 28.00, 'kg', 800, 20, false, '2024-01-12', '2024-04-12', 'Maharashtra', 'https://images.unsplash.com/photo-1508313880080-c4bce1d99b6d?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '55555555-5555-5555-5555-555555555555'), 'Organic Mangoes', 'Alphonso mangoes grown organically in our orchards', 'fruits', 120.00, 'kg', 300, 5, true, '2024-01-20', '2024-02-20', 'Andhra Pradesh', 'https://images.unsplash.com/photo-1553279768-865429ffd9d1?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '66666666-6666-6666-6666-666666666666'), 'Fresh Potatoes', 'Farm fresh potatoes ideal for cooking and processing', 'vegetables', 18.00, 'kg', 1200, 30, false, '2024-01-14', '2024-06-14', 'Uttar Pradesh', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '11111111-1111-1111-1111-111111111111'), 'Organic Carrots', 'Sweet and crunchy organic carrots', 'vegetables', 35.00, 'kg', 200, 5, true, '2024-01-18', '2024-03-18', 'Punjab', 'https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400'),
  ((SELECT id FROM profiles WHERE user_id = '22222222-2222-2222-2222-222222222222'), 'Yellow Mustard Seeds', 'Premium quality mustard seeds for oil extraction', 'spices', 65.00, 'kg', 400, 10, false, '2024-01-05', '2025-01-05', 'Haryana', 'https://images.unsplash.com/photo-1596040033229-a292df4483d0?w=400');

-- Insert sample orders
INSERT INTO public.orders (buyer_id, farmer_id, product_id, quantity, unit_price, total_amount, delivery_address, delivery_date, notes, status) VALUES
  ((SELECT id FROM profiles WHERE user_id = '77777777-7777-7777-7777-777777777777'), 
   (SELECT farmer_id FROM products WHERE name = 'Organic Tomatoes'),
   (SELECT id FROM products WHERE name = 'Organic Tomatoes'),
   50, 45.00, 2250.00, 'Vashi Wholesale Market, Sector 19, Mumbai, Maharashtra 400703', '2024-01-25', 'Please ensure early morning delivery', 'confirmed'),
  ((SELECT id FROM profiles WHERE user_id = '88888888-8888-8888-8888-888888888888'),
   (SELECT farmer_id FROM products WHERE name = 'Fresh Wheat'),
   (SELECT id FROM products WHERE name = 'Fresh Wheat'),
   100, 22.00, 2200.00, 'Azadpur Mandi, Ring Road, Delhi 110033', '2024-01-26', 'Quality certificates required', 'pending'),
  ((SELECT id FROM profiles WHERE user_id = '99999999-9999-9999-9999-999999999999'),
   (SELECT farmer_id FROM products WHERE name = 'Organic Mangoes'),
   (SELECT id FROM products WHERE name = 'Organic Mangoes'),
   25, 120.00, 3000.00, 'Electronic City, Phase 1, Bangalore, Karnataka 560100', '2024-01-28', 'Handle with care - premium fruit order', 'delivered');

-- Insert sample notifications
INSERT INTO public.notifications (user_id, title, message, type, read) VALUES
  ((SELECT id FROM profiles WHERE user_id = '11111111-1111-1111-1111-111111111111'), 'New Order Received', 'You have received a new order for Organic Tomatoes from Mumbai Wholesale Market', 'order', false),
  ((SELECT id FROM profiles WHERE user_id = '77777777-7777-7777-7777-777777777777'), 'Order Confirmed', 'Your order for Organic Tomatoes has been confirmed by Kumar Organic Farms', 'order', false),
  ((SELECT id FROM profiles WHERE user_id = '22222222-2222-2222-2222-222222222222'), 'Order Inquiry', 'Delhi Fresh Foods has inquired about your Fresh Wheat listing', 'inquiry', true),
  ((SELECT id FROM profiles WHERE user_id = '55555555-5555-5555-5555-555555555555'), 'Payment Received', 'Payment of ₹3000 received for Organic Mangoes order', 'payment', false);

-- Insert sample weather alerts
INSERT INTO public.weather_alerts (alert_type, severity, location, message, start_time, end_time) VALUES
  ('rain', 'moderate', 'Punjab', 'Moderate rainfall expected in the region. Farmers advised to cover harvested crops.', NOW(), NOW() + INTERVAL '2 days'),
  ('heat', 'high', 'Haryana', 'High temperature warning. Ensure adequate irrigation for crops.', NOW(), NOW() + INTERVAL '3 days'),
  ('wind', 'low', 'Gujarat', 'Light winds expected. Good conditions for pesticide application.', NOW(), NOW() + INTERVAL '1 day'),
  ('storm', 'high', 'Maharashtra', 'Severe storm warning. Secure farming equipment and protect crops.', NOW() + INTERVAL '1 day', NOW() + INTERVAL '2 days');