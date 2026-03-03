import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { ReactNode } from "react";

interface BookingDialogProps {
  children: ReactNode;
}

const BookingDialog = ({ children }: BookingDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="glass border-border bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-foreground">
            Book Your Seat
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4 pt-2" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <Label>Service</Label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="haircut">Signature Haircut — $45</SelectItem>
                <SelectItem value="beard">Beard Trim & Shape — $30</SelectItem>
                <SelectItem value="shave">Hot Towel Shave — $40</SelectItem>
                <SelectItem value="combo">Haircut + Beard Combo — $65</SelectItem>
                <SelectItem value="deluxe">The Deluxe Experience — $95</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg tracking-wide">
            <CalendarDays className="mr-2 h-5 w-5" />
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
