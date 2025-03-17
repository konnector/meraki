export type Sheet = {
    id: string;
    user_id: string;
    title: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    is_public: boolean;
    is_starred: boolean;
    slug: string;
}

export type SheetData = {
    id: string;
    sheet_id: string;
    row_index: number;
    col_index: number;
    cell_value: string | null;
    cell_type: 'text' | 'number' | 'formula' | 'date';
    created_at: string;
    updated_at: string;
}

export type Database = {
    public: {
        Tables: {
            sheets: {
                Row: Sheet;
                Insert: Omit<Sheet, 'id' | 'created_at' | 'updated_at' | 'slug'>;
                Update: Partial<Omit<Sheet, 'id' | 'created_at' | 'updated_at' | 'slug'>>;
            };
            sheet_data: {
                Row: SheetData;
                Insert: Omit<SheetData, 'id' | 'created_at' | 'updated_at'>;
                Update: Partial<Omit<SheetData, 'id' | 'created_at' | 'updated_at'>>;
            };
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    full_name: string;
                    avatar_url?: string;
                    created_at: string;
                };
            };
        };
    };
}; 