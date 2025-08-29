import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, TrendingUp, Package, Users, IndianRupee } from "lucide-react";

interface DashboardProps {
  role: 'farmer' | 'buyer';
  onBack: () => void;
}

export function Dashboard({ role, onBack }: DashboardProps) {
  const isFarmer = role === 'farmer';

  const farmerStats = [
    { label: "Total Products", value: "12", icon: Package, trend: "+2 this month" },
    { label: "Total Earnings", value: "₹45,230", icon: IndianRupee, trend: "+15% this month" },
    { label: "Active Buyers", value: "28", icon: Users, trend: "+5 new buyers" },
    { label: "Avg. Rating", value: "4.8", icon: TrendingUp, trend: "Excellent!" }
  ];

  const buyerStats = [
    { label: "Orders Placed", value: "24", icon: Package, trend: "+3 this week" },
    { label: "Total Spent", value: "₹28,450", icon: IndianRupee, trend: "Saved ₹3,200" },
    { label: "Trusted Farmers", value: "15", icon: Users, trend: "+2 new farmers" },
    { label: "Quality Score", value: "4.9", icon: TrendingUp, trend: "Premium quality" }
  ];

  const stats = isFarmer ? farmerStats : buyerStats;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back to Marketplace
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isFarmer ? 'Farmer Dashboard' : 'Buyer Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your {isFarmer ? 'farming' : 'buying'} overview.
            </p>
          </div>
          <Button variant={isFarmer ? 'farmer' : 'buyer'}>
            <Plus className="h-4 w-4" />
            {isFarmer ? 'Add Product' : 'New Order'}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-custom-sm border border-border">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-8 w-8 text-primary" />
                <Badge variant="secondary" className="text-xs">
                  {stat.trend}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-card-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card p-6 rounded-lg shadow-custom-sm border border-border">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {isFarmer ? (
              <>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Package className="h-6 w-6" />
                  <span>Manage Products</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>View Orders</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Market Trends</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Package className="h-6 w-6" />
                  <span>Browse Products</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Users className="h-6 w-6" />
                  <span>My Farmers</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <span>Order History</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}