import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarketplaceGrid } from "@/components/MarketplaceGrid";
import { Features } from "@/components/Features";
import { RoleSelector } from "@/components/RoleSelector";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'farmer' | 'buyer' | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleRoleSelect = (role: 'farmer' | 'buyer') => {
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
      <MarketplaceGrid />
      <Features />
      <RoleSelector onRoleSelect={handleRoleSelect} />
    </div>
  );
};

export default Index;
