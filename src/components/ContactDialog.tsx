import { useState } from "react";
import { Phone, MessageCircle, QrCode, ArrowLeft, Copy, Check, ExternalLink } from "lucide-react";
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
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  totalAmount?: number;
}

const ContactDialog = ({ 
  children, 
  open: controlledOpen, 
  onOpenChange: controlledOnOpenChange,
  totalAmount,
}: ContactDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [step, setStep] = useState<"options" | "paypal">("options");
  const [paypalSubStep, setPaypalSubStep] = useState<"choice" | "qr">("choice");
  const [copied, setCopied] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (!val) {
      // reset steps when closing
      setStep("options");
      setPaypalSubStep("choice");
    }
    (controlledOnOpenChange || setInternalOpen)(val);
  };

  // WhatsApp link - remove + from phone and use international format
  const whatsappNumber = shopConfig.contact.phone.replace(/\s+/g, '').replace('+', '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const formattedAmount = totalAmount?.toFixed(2);

  const handleCopy = () => {
    if (!formattedAmount) return;
    navigator.clipboard.writeText(formattedAmount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paypalDirectLink = `https://paypal.me/${shopConfig.contact.paypalMeHandle}/${formattedAmount}`;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && (
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        {step === "options" && (
          <>
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
              <a href={shopConfig.contact.phoneHref} className="block" title="Chiama Tribal Tattoo Studio">
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
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
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

              {/* PayPal QR — only shown when coming from cart */}
              {totalAmount !== undefined && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-border" />
                    <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">oppure paga subito</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-auto py-6 flex items-center justify-start gap-4 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
                    onClick={() => setStep("paypal")}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="font-heading text-lg text-foreground">Paga con PayPal</span>
                      <span className="font-body text-xs text-muted-foreground tracking-wide">
                        Scansiona e paga €{formattedAmount}
                      </span>
                    </div>
                  </Button>
                </>
              )}
            </div>

            <div className="border-t border-border pt-4">
              <p className="font-body text-xs text-center text-muted-foreground">
                Rispondo personalmente a tutti i messaggi
              </p>
            </div>
          </>
        )}

        {step === "paypal" && (
          <>
            <button
              onClick={() => {
                if (paypalSubStep === "qr") {
                  setPaypalSubStep("choice");
                } else {
                  setStep("options");
                }
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit -mb-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Indietro
            </button>
            <DialogHeader>
              <DialogTitle className="font-heading text-3xl">
                Paga con PayPal<span className="text-primary">.</span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-5 pt-2 overflow-y-auto max-h-[70vh] pr-1">
              {/* Amount */}
              <div className="flex items-center justify-between bg-background border border-border rounded-sm px-4 py-3">
                <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">Totale</span>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-3xl text-primary">€{formattedAmount}</span>
                  <button
                    onClick={handleCopy}
                    title="Copia importo"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {paypalSubStep === "choice" ? (
                /* Choice buttons */
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-auto py-6 flex flex-col items-center gap-3 border-border hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
                    onClick={() => setPaypalSubStep("qr")}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <QrCode className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="font-heading text-sm text-foreground">QR Code</span>
                      <span className="font-body text-xs text-muted-foreground">Scansiona dall'app</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-auto py-6 flex flex-col items-center gap-3 border-border hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
                    onClick={() => window.open(paypalDirectLink, "_blank", "noopener,noreferrer")}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <ExternalLink className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="font-heading text-sm text-foreground">Diretto</span>
                      <span className="font-body text-xs text-muted-foreground">Apri PayPal.me</span>
                    </div>
                  </Button>
                </div>
              ) : (
                /* QR view */
                <>
                  <div className="flex justify-center">
                    <div className="relative p-3 bg-white rounded-sm border-2 border-primary/40 shadow-lg">
                      <img
                        src="/images/paypal-qr.png"
                        alt="PayPal QR code per il pagamento"
                        className="w-52 h-52 object-contain"
                        draggable={false}
                      />
                      <div className="absolute bottom-2 right-2 bg-[#003087] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                        PayPal
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      "Apri l'app PayPal sul tuo telefono",
                      "Tocca \"Scansiona\" e inquadra il QR code",
                      `Inserisci €${formattedAmount} e completa il pagamento`,
                      "Inviaci la conferma via WhatsApp o email",
                    ].map((text, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <p className="font-body text-sm text-muted-foreground leading-snug">{text}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
