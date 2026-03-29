import { Send } from "lucide-react";
import { useState } from "react";
import { useSubmitContactForm } from "../hooks/useQueries";
import AdBanner from "./AdBanner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({
  open,
  onOpenChange,
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submitForm = useSubmitContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      submitForm.mutate(
        { name: name.trim(), email: email.trim(), message: message.trim() },
        {
          onSuccess: () => {
            setName("");
            setEmail("");
            setMessage("");
            onOpenChange(false);
          },
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-navy/95 backdrop-blur-md border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Contact Us 📧
          </DialogTitle>
          <p className="text-white/70 text-center text-sm">
            Have a question or issue? Send us a message!
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="contact-name" className="text-white">
              Your Name
            </Label>
            <Input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <Label htmlFor="contact-email" className="text-white">
              Email Address
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <Label htmlFor="contact-message" className="text-white">
              Message
            </Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              required
              rows={5}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={submitForm.isPending}
            className="w-full bg-gradient-to-r from-cyan to-cyan/80 hover:from-cyan/90 hover:to-cyan/70 text-navy font-bold"
          >
            <Send className="w-5 h-5 mr-2" />
            {submitForm.isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="pt-4 border-t border-white/10">
          <AdBanner />
        </div>
      </DialogContent>
    </Dialog>
  );
}
