export type SheetStatus = 'active' | 'recent' | 'shared' | 'template' | 'archived';
export type SheetPermission = 'owner' | 'editor' | 'viewer';

export type SheetCollaborator = {
  id: string;
  name: string;
  avatar_url: string;
};

export type SheetCategory = {
  id: string;
  name: string;
  color: string;
  icon?: string;
  user_id: string;
  created_at: string;
};

export type Folder = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  parent_id?: string; // For nested folders
  user_id: string;
  created_at: string;
  updated_at: string;
  order: number; // For custom ordering
};

export type SheetTag = {
  id: string;
  name: string;
  color?: string;
};

export type Sheet = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  content?: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  is_starred: boolean;
  slug: string;
  preview_url?: string;
  status?: SheetStatus;
  permission?: SheetPermission;
  collaborators?: SheetCollaborator[];
  tags?: string[]; // Array of tag IDs
  folder_id?: string; // Reference to folder
  category_id?: string; // Reference to category
  is_archived: boolean; // Archive status
  archived_at?: string; // When it was archived
};

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

export interface SheetEditorProps {
  sheet: Sheet;
  isEditable?: boolean;
}

export interface SheetListProps {
  sheets: Sheet[];
}

export interface SheetFormProps {
  onSubmit: (data: Partial<Sheet>) => Promise<void>;
  initialData?: Partial<Sheet>;
}