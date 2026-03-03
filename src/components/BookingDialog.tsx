import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpRight } from "lucide-react";
import { ReactNode, forwardRef } from "react";

interface BookingDialogProps {
  children: ReactNode;
}

const BookingDialog = forwardRef<HTMLDivElement, BookingDialogProps>(({ children }, ref) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-border bg-card sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="font-heading text-4xl text-foreground">
            Book a Seat<span className="text-primary">.</span>
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-5 pt-2" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Full Name</Label>
            <Input placeholder="John Doe" className="bg-muted border-border rounded-none h-12 font-body" />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Phone</Label>
            <Input placeholder="+1 (555) 000-0000" className="bg-muted border-border rounded-none h-12 font-body" />
          </div>
          <div className="space-y-2">
            <Label className="font-body text-xs tracking-widest uppercase text-muted-foreground">Service</Label>
            <Select>
              <SelectTrigger className="bg-muted border-border rounded-none h-12 font-body">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border rounded-none">
                <SelectItem value="haircut">Signature Haircut — $45</SelectItem>
                <SelectItem value="beard">Beard Trim & Shape — $30</SelectItem>
                <SelectItem value="shave">Hot Towel Shave — $40</SelectItem>
                <SelectItem value="combo">Cut + Beard Combo — $65</SelectItem>
                <SelectItem value="deluxe">The Deluxe — $95</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full rounded-none">
            Confirm Booking <ArrowUpRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
});

BookingDialog.displayName = "BookingDialog";

export default BookingDialog;
