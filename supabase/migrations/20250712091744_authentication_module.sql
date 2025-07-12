-- SmartHMS Authentication Module Migration
-- Location: supabase/migrations/20250712091744_authentication_module.sql

-- 1. Create custom types for hotel management
CREATE TYPE public.user_role AS ENUM ('admin', 'receptionist', 'room_service_manager', 'maintenance_manager', 'security_manager', 'guest');

-- 2. Create user_profiles table as intermediary for auth relationships
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'guest'::public.user_role,
    phone TEXT,
    avatar_url TEXT,
    department TEXT,
    shift_schedule JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create hotel configuration table for multi-property support
CREATE TABLE public.hotel_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hotel_name TEXT NOT NULL DEFAULT 'SmartHMS Hotel',
    hotel_logo_url TEXT,
    address JSONB DEFAULT '{}',
    contact_info JSONB DEFAULT '{}',
    timezone TEXT DEFAULT 'UTC',
    currency TEXT DEFAULT 'USD',
    check_in_time TIME DEFAULT '15:00',
    check_out_time TIME DEFAULT '11:00',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Essential indexes for performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_active ON public.user_profiles(is_active);

-- 5. Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_config ENABLE ROW LEVEL SECURITY;

-- 6. Helper functions for RLS policies
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
)
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.user_profiles up
    WHERE up.id = auth.uid() 
    AND up.role IN ('admin', 'receptionist', 'room_service_manager', 'maintenance_manager', 'security_manager')::public.user_role[]
)
$$;

-- 7. Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (
    id, 
    email, 
    full_name, 
    role
  )
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'guest'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- 8. Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Function to update profile timestamp
CREATE OR REPLACE FUNCTION public.update_profile_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;

-- 10. Trigger for profile updates
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_profile_updated_at();

-- 11. RLS Policies
CREATE POLICY "users_view_own_profile"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "users_update_own_profile"
ON public.user_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "admin_manage_all_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "staff_view_profiles"
ON public.user_profiles
FOR SELECT
TO authenticated
USING (public.is_staff());

-- Hotel config policies
CREATE POLICY "staff_view_hotel_config"
ON public.hotel_config
FOR SELECT
TO authenticated
USING (public.is_staff());

CREATE POLICY "admin_manage_hotel_config"
ON public.hotel_config
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 12. Create initial hotel configuration
INSERT INTO public.hotel_config (hotel_name, address, contact_info)
VALUES (
    'SmartHMS Hotel',
    '{"street": "123 Hotel Avenue", "city": "Business District", "country": "Example Country", "postal_code": "12345"}',
    '{"phone": "+1-234-567-8900", "email": "info@smarthms.com", "website": "https://smarthms.com"}'
);

-- 13. Mock data for development
DO $$
DECLARE
    admin_uuid UUID := gen_random_uuid();
    receptionist_uuid UUID := gen_random_uuid();
    room_service_uuid UUID := gen_random_uuid();
    maintenance_uuid UUID := gen_random_uuid();
    security_uuid UUID := gen_random_uuid();
    guest_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (admin_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'admin@smarthms.com', crypt('admin123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Smith", "role": "admin"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (receptionist_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'receptionist@smarthms.com', crypt('reception123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "receptionist"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (room_service_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'roomservice@smarthms.com', crypt('service123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Mike Wilson", "role": "room_service_manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (maintenance_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'maintenance@smarthms.com', crypt('maintain123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "David Brown", "role": "maintenance_manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (security_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'security@smarthms.com', crypt('secure123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Lisa Davis", "role": "security_manager"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (guest_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'guest@smarthms.com', crypt('guest123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Guest User", "role": "guest"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Profile data will be automatically created by the trigger
EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'Some users already exist, skipping duplicate entries';
    WHEN OTHERS THEN
        RAISE NOTICE 'Error creating mock data: %', SQLERRM;
END $$;

-- 14. Cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_auth_test_data()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    auth_user_ids_to_delete UUID[];
BEGIN
    -- Get auth user IDs first
    SELECT ARRAY_AGG(id) INTO auth_user_ids_to_delete
    FROM auth.users
    WHERE email LIKE '%@smarthms.com';

    -- Delete user profiles first (child records)
    DELETE FROM public.user_profiles WHERE id = ANY(auth_user_ids_to_delete);

    -- Delete auth users last (parent records)
    DELETE FROM auth.users WHERE id = ANY(auth_user_ids_to_delete);
    
    RAISE NOTICE 'Cleaned up % test user records', array_length(auth_user_ids_to_delete, 1);
EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key constraint prevents deletion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Cleanup failed: %', SQLERRM;
END;
$$;