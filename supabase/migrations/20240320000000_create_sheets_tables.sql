-- Create sheets table
CREATE TABLE sheets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    is_public BOOLEAN DEFAULT false,
    slug TEXT GENERATED ALWAYS AS (
        LOWER(
            REGEXP_REPLACE(
                title, 
                '[^a-zA-Z0-9]', 
                '-', 
                'g'
            )
        ) || '-' || SUBSTRING(id::text, 1, 8)
    ) STORED
);

-- Create sheet_data table for storing cell data
CREATE TABLE sheet_data (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    sheet_id UUID REFERENCES sheets(id) ON DELETE CASCADE,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    cell_value TEXT,
    cell_type TEXT DEFAULT 'text',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(sheet_id, row_index, col_index)
);

-- Create indexes for better query performance
CREATE INDEX idx_sheets_user_id ON sheets(user_id);
CREATE INDEX idx_sheets_slug ON sheets(slug);
CREATE INDEX idx_sheet_data_sheet_id ON sheet_data(sheet_id);
CREATE INDEX idx_sheet_data_position ON sheet_data(sheet_id, row_index, col_index);

-- Enable Row Level Security
ALTER TABLE sheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE sheet_data ENABLE ROW LEVEL SECURITY;

-- Create policies for sheets table
CREATE POLICY "Users can view their own sheets"
    ON sheets FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own sheets"
    ON sheets FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sheets"
    ON sheets FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sheets"
    ON sheets FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for sheet_data table
CREATE POLICY "Users can view their sheets' data"
    ON sheet_data FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM sheets 
        WHERE sheets.id = sheet_data.sheet_id 
        AND sheets.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert data into their sheets"
    ON sheet_data FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM sheets 
        WHERE sheets.id = sheet_data.sheet_id 
        AND sheets.user_id = auth.uid()
    ));

CREATE POLICY "Users can update data in their sheets"
    ON sheet_data FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM sheets 
        WHERE sheets.id = sheet_data.sheet_id 
        AND sheets.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete data from their sheets"
    ON sheet_data FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM sheets 
        WHERE sheets.id = sheet_data.sheet_id 
        AND sheets.user_id = auth.uid()
    ));

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_sheets_updated_at
    BEFORE UPDATE ON sheets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sheet_data_updated_at
    BEFORE UPDATE ON sheet_data
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 