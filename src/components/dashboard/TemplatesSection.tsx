"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FileSpreadsheet } from "lucide-react";

const templates = [
  { id: "blank", name: "Blank spreadsheet", icon: <FileSpreadsheet className="h-12 w-12 text-black/60" /> },
  { id: "todo", name: "To-do list", icon: <FileSpreadsheet className="h-12 w-12 text-gray-700/60" /> },
  { id: "budget", name: "Annual budget", icon: <FileSpreadsheet className="h-12 w-12 text-gray-800/60" /> },
  { id: "monthly-budget", name: "Monthly budget", icon: <FileSpreadsheet className="h-12 w-12 text-gray-900/60" /> },
  { id: "investment", name: "Investment tracker", icon: <FileSpreadsheet className="h-12 w-12 text-black/60" /> },
];

export default function TemplatesSection() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleCreateSpreadsheet = async (templateId: string = "blank") => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Create the sheet first
      const { data: sheet, error: sheetError } = await supabase
        .from("sheets")
        .insert([
          {
            title: templateId === "blank" ? "Untitled spreadsheet" : templates.find(t => t.id === templateId)?.name,
            user_id: user.id,
            description: `Created from ${templateId} template`,
            is_public: false,
          },
        ])
        .select()
        .single();

      if (sheetError) {
        console.error("Error creating sheet:", sheetError);
        return;
      }

      if (sheet) {
        // For non-blank templates, we could add template-specific initial data here
        if (templateId !== "blank") {
          // Example: Add header row for todo template
          if (templateId === "todo") {
            await supabase.from("sheet_data").insert([
              { sheet_id: sheet.id, row_index: 0, col_index: 0, cell_value: "Task", cell_type: "text" },
              { sheet_id: sheet.id, row_index: 0, col_index: 1, cell_value: "Status", cell_type: "text" },
              { sheet_id: sheet.id, row_index: 0, col_index: 2, cell_value: "Due Date", cell_type: "text" },
            ]);
          }
          // Add more template-specific initializations here
        }

        router.push(`/sheets/${sheet.id}`);
      }
    } catch (error) {
      console.error("Error creating spreadsheet:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => handleCreateSpreadsheet(template.id)}
          className="group aspect-[4/3] rounded-lg border border-gray-200 hover:border-black/50 transition-colors p-4 flex flex-col items-center justify-center gap-2 bg-white hover:bg-gray-50"
        >
          {template.icon}
          <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {template.name}
          </span>
        </button>
      ))}
    </div>
  );
} 