import { Button } from "@/components/ui/button";
import { Leaf, Menu, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onRoleSelect?: (role: 'farmer' | 'buyer') => void;
}

export function Navbar({ onRoleSelect }: NavbarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-custom-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">CropConnect</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button 
                variant="farmer" 
                size="sm"
                onClick={() => onRoleSelect?.('farmer')}
              >
                Farmer Dashboard
              </Button>
              <Button 
                variant="buyer" 
                size="sm"
                onClick={() => onRoleSelect?.('buyer')}
              >
                Buyer Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
              <User className="h-4 w-4" />
              Login
            </Button>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}