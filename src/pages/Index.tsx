import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketplaceGrid } from "@/components/MarketplaceGrid";
import { Features } from "@/components/Features";
import { WeatherAlerts } from "@/components/WeatherAlerts";
import { RoleSelector } from "@/components/RoleSelector";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleRoleSelect = (role: 'farmer' | 'buyer') => {
    if (!user) {
      navigate('/auth');
      return;
    }
    setSelectedRole(role);
    setShowDashboard(true);
  };

  const handleBackToMarketplace = () => {
    setShowDashboard(false);
    setSelectedRole(null);
  };

  if (showDashboard && selectedRole) {
    return (
      <>
        <Navbar onRoleSelect={handleRoleSelect} />
        <Dashboard role={selectedRole} onBack={handleBackToMarketplace} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onRoleSelect={handleRoleSelect} />
      <Hero onRoleSelect={handleRoleSelect} />
      <Features />
      <WeatherAlerts />
      <MarketplaceGrid />
      <RoleSelector onRoleSelect={handleRoleSelect} />
    </div>
  );
};

export default Index;
