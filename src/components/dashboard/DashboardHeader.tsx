"use client";

import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";

export default function DashboardHeader() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>("");
  const [userInitials, setUserInitials] = useState<string>("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        setUserAvatarUrl(user.user_metadata.avatar_url || "");
        // Get initials from email
        const initials = user.email
          ?.split("@")[0]
          .split(".")
          .map(n => n[0])
          .join("")
          .toUpperCase() || "";
        setUserInitials(initials);
      }
    };
    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="font-semibold text-xl text-foreground">
              Meraki Sheets
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                Recent
              </Link>
              <Link
                href="/templates"
                className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                Templates
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-3 flex-1 max-w-xl mx-4">
            <SearchBar className="flex-1" />
            <FilterDropdown />
          </div>
          
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Avatar className="h-8 w-8">
                    {userAvatarUrl ? (
                      <AvatarImage src={userAvatarUrl} alt="User" />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-r from-gray-700 to-black text-white">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-sm text-muted-foreground">
                  {userEmail}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
} 