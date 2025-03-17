"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { FileSpreadsheet } from "lucide-react";
import Link from "next/link";

const templates = [
  { id: "blank", name: "Blank spreadsheet", icon: <FileSpreadsheet className="h-12 w-12 text-primary/60" /> },
  { id: "todo", name: "To-do list", icon: <FileSpreadsheet className="h-12 w-12 text-emerald-500/60" /> },
  { id: "budget", name: "Annual budget", icon: <FileSpreadsheet className="h-12 w-12 text-orange-500/60" /> },
  { id: "monthly-budget", name: "Monthly budget", icon: <FileSpreadsheet className="h-12 w-12 text-blue-500/60" /> },
  { id: "investment", name: "Investment tracker", icon: <FileSpreadsheet className="h-12 w-12 text-violet-500/60" /> },
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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Start a new spreadsheet</h2>
        <Link 
          href="/templates" 
          className="text-sm text-primary hover:text-primary/90 transition-colors"
        >
          Template gallery
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => handleCreateSpreadsheet(template.id)}
            className="group aspect-[4/3] rounded-lg border border-border hover:border-primary/50 transition-colors p-4 flex flex-col items-center justify-center gap-2 bg-card hover:bg-accent"
          >
            {template.icon}
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {template.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 