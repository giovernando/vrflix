import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--netflix-black))] text-muted-foreground py-12 px-4 md:px-12 mt-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Social Links */}
        <div className="flex gap-6 mb-8">
          <a href="#" className="hover:text-foreground transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            <Youtube className="h-6 w-6" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="space-y-3">
            <a href="#" className="block text-sm hover:underline">
              Audio Description
            </a>
            <a href="#" className="block text-sm hover:underline">
              Help Center
            </a>
            <a href="#" className="block text-sm hover:underline">
              Gift Cards
            </a>
            <a href="#" className="block text-sm hover:underline">
              Media Center
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="block text-sm hover:underline">
              Investor Relations
            </a>
            <a href="#" className="block text-sm hover:underline">
              Jobs
            </a>
            <a href="#" className="block text-sm hover:underline">
              Terms of Use
            </a>
            <a href="#" className="block text-sm hover:underline">
              Privacy
            </a>
          </div>
          <div className="space-y-3">
            <a href="#" className="block text-sm hover:underline">
              Legal Notices
            </a>
            <a href="#" className="block text-sm hover:underline">
              Cookie Preferences
            </a>
            <a href="#" className="block text-sm hover:underline">
              Corporate Information
            </a>
            <a href="#" className="block text-sm hover:underline">
              Contact Us
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-sm">© 2025 VERFLIX. Built with React.</p>
      </div>
    </footer>
  );
};
