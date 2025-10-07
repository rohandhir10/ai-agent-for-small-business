import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Mail, Phone, Clock } from "lucide-react";
import { format } from "date-fns";

interface AppointmentsListProps {
  businessId: string;
}

const AppointmentsList = ({ businessId }: AppointmentsListProps) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadAppointments();
  }, [businessId]);

  const loadAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        services (service_name, duration_minutes)
      `)
      .eq("business_id", businessId)
      .order("appointment_date", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load appointments",
      });
      return;
    }

    setAppointments(data || []);
    setLoading(false);
  };

  const updateStatus = async (appointmentId: string, newStatus: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", appointmentId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      });
      return;
    }

    toast({
      title: "Status updated",
      description: "Appointment status has been updated",
    });
    loadAppointments();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-yellow-500";
    }
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No appointments yet. Share your booking link to start receiving bookings!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id} className="shadow-card hover:shadow-elegant transition-all">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{appointment.customer_name}</CardTitle>
                <div className="flex gap-2 mt-2">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  <Badge variant="outline">{appointment.services?.service_name}</Badge>
                </div>
              </div>
              <Select
                value={appointment.status}
                onValueChange={(value) => updateStatus(appointment.id, value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.customer_email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.customer_phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(appointment.appointment_date), "PPP")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{format(new Date(appointment.appointment_date), "p")}</span>
              </div>
              {appointment.notes && (
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Notes: {appointment.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsList;
