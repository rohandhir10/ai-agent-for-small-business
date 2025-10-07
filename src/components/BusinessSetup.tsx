import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface BusinessSetupProps {
  userId: string;
  onComplete: () => void;
}

const BusinessSetup = ({ userId, onComplete }: BusinessSetupProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    business_name: "",
    business_email: "",
    business_phone: "",
    business_description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("businesses").insert({
        ...formData,
        user_id: userId,
      });

      if (error) throw error;

      toast({
        title: "Business created!",
        description: "Your business profile has been set up successfully.",
      });
      onComplete();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create business",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto shadow-elegant">
      <CardHeader>
        <CardTitle className="text-2xl">Set Up Your Business</CardTitle>
        <CardDescription>Tell us about your business to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business_name">Business Name *</Label>
            <Input
              id="business_name"
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_email">Business Email *</Label>
            <Input
              id="business_email"
              type="email"
              value={formData.business_email}
              onChange={(e) => setFormData({ ...formData, business_email: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_phone">Business Phone</Label>
            <Input
              id="business_phone"
              type="tel"
              value={formData.business_phone}
              onChange={(e) => setFormData({ ...formData, business_phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_description">Business Description</Label>
            <Textarea
              id="business_description"
              value={formData.business_description}
              onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
              placeholder="Tell your customers about your business..."
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Business"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusinessSetup;
