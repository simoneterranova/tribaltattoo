import { useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

interface ContactDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ContactDialog = ({ 
  children, 
  open: controlledOpen, 
  onOpenChange: controlledOnOpenChange 
}: ContactDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = controlledOnOpenChange || setInternalOpen;

  // WhatsApp link - remove + from phone and use international format
  const whatsappNumber = shopConfig.contact.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl">
            Contattami<span className="text-primary">.</span>
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-muted-foreground pt-2">
            Scegli come preferisci metterti in contatto con {shopConfig.team[0].name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-6">
          {/* Call Button */}
          <a href={shopConfig.contact.phoneHref} className="block" title="Chiama Gran Babar Studio">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-auto py-6 flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-heading text-lg text-foreground">Chiamami</span>
                <span className="font-body text-xs text-muted-foreground tracking-wide">
                  {shopConfig.contact.phone}
                </span>
              </div>
            </Button>
          </a>

          {/* WhatsApp Button */}
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block"
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-auto py-6 flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="font-heading text-lg text-foreground">Scrivimi su WhatsApp</span>
                <span className="font-body text-xs text-muted-foreground tracking-wide">
                  Messaggio diretto
                </span>
              </div>
            </Button>
          </a>
        </div>

        <div className="border-t border-border pt-4">
          <p className="font-body text-xs text-center text-muted-foreground">
            Rispondo personalmente a tutti i messaggi
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
