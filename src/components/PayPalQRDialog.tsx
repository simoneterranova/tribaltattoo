import { useState } from "react";
import { QrCode, Copy, Check, ExternalLink, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import shopConfig from "@/config/shopConfig";

interface PayPalQRDialogProps {
  children?: React.ReactNode;
  totalAmount: number;
  onPaymentConfirmed?: () => void;
}

const PayPalQRDialog = ({ children, totalAmount, onPaymentConfirmed }: PayPalQRDialogProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const formattedAmount = totalAmount.toFixed(2);
  const paypalDirectLink = `https://paypal.me/${shopConfig.contact.paypalMeHandle}/${formattedAmount}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedAmount);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenChange = (val: boolean) => {
    if (!val) setShowQr(false);
    setOpen(val);
    if (!val) onPaymentConfirmed?.();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="lg" className="w-full gap-2">
            <QrCode className="h-5 w-5" />
            Paga con PayPal
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card border border-border">
        {showQr && (
          <button
            onClick={() => setShowQr(false)}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit -mb-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Indietro
          </button>
        )}
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            Paga con PayPal<span className="text-primary">.</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Amount badge */}
          <div className="flex items-center justify-between bg-background border border-border rounded-sm px-4 py-3">
            <span className="font-body text-sm text-muted-foreground uppercase tracking-wider">
              Totale da pagare
            </span>
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

          {!showQr ? (
            /* Choice buttons */
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="h-auto py-6 flex flex-col items-center gap-3 border-border hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
                onClick={() => setShowQr(true)}
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

              <div className="space-y-2.5">
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

          <p className="text-center font-body text-xs text-muted-foreground">
            Dopo il pagamento contattaci per concordare appuntamento e personalizzazione
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PayPalQRDialog;

