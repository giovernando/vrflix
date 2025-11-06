import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Bell, User, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[hsl(var(--netflix-black))]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <h1 className="text-primary text-3xl font-bold tracking-tight">
              VERFLIX
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-foreground hover:text-muted-foreground transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-foreground hover:text-muted-foreground transition-colors text-sm"
            >
              Movies
            </Link>
            <Link
              to="/watchlist"
              className="text-foreground hover:text-muted-foreground transition-colors text-sm"
            >
              My List
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5" />
          </Button>

          {user ? (
            <>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => navigate("/auth/login")}
              className="bg-primary hover:bg-[hsl(var(--netflix-red-hover))] text-primary-foreground"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
