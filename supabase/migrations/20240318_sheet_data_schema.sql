-- This migration updates the sheet_data table structure to support cell data
-- Updates schema to work with JSON data and temporary sheets

-- Create column_sizes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.column_sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sheet_id UUID NOT NULL REFERENCES public.sheets(id) ON DELETE CASCADE,
    column_index INTEGER NOT NULL,
    width INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(sheet_id, column_index)
);

-- Create row_sizes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.row_sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sheet_id UUID NOT NULL REFERENCES public.sheets(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    height INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(sheet_id, row_index)
);

-- Ensure is_temporary column exists on sheets table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'sheets' AND column_name = 'is_temporary'
    ) THEN
        ALTER TABLE public.sheets ADD COLUMN is_temporary BOOLEAN DEFAULT FALSE;
    END IF;
END$$;

-- Re-create sheet_data table if needed
-- First check if it has the correct structure
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'sheet_data' AND column_name = 'row_index'
    ) THEN
        -- Drop old sheet_data table
        DROP TABLE IF EXISTS public.sheet_data;
        
        -- Create new sheet_data table
        CREATE TABLE public.sheet_data (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            sheet_id UUID NOT NULL REFERENCES public.sheets(id) ON DELETE CASCADE,
            cell_key TEXT NOT NULL,
            data JSONB NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            UNIQUE(sheet_id, cell_key)
        );
    ELSE
        -- Check if sheet_data table exists, create if it doesn't
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.tables 
            WHERE table_name = 'sheet_data'
        ) THEN
            CREATE TABLE public.sheet_data (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                sheet_id UUID NOT NULL REFERENCES public.sheets(id) ON DELETE CASCADE,
                cell_key TEXT NOT NULL,
                data JSONB NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                UNIQUE(sheet_id, cell_key)
            );
        END IF;
    END IF;
END$$;

-- Add a function to clean up temporary sheets
CREATE OR REPLACE FUNCTION cleanup_temporary_sheets() RETURNS void AS $$
BEGIN
    DELETE FROM public.sheets 
    WHERE is_temporary = true 
    AND updated_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Add a cron job to run the cleanup function daily (if pg_cron extension is available)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_extension WHERE extname = 'pg_cron'
    ) THEN
        SELECT cron.schedule('0 0 * * *', 'SELECT cleanup_temporary_sheets()');
    END IF;
EXCEPTION
    WHEN undefined_function THEN
        -- pg_cron extension is not available
        RAISE NOTICE 'pg_cron extension not available, skipping automatic cleanup schedule';
END$$; 