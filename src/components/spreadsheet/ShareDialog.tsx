import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, Copy, Link, Mail, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EmailInvite {
  email: string;
  access: "view" | "edit";
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [invites, setInvites] = useState<EmailInvite[]>([]);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // RFC 5322 compliant email regex
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    if (invites.some(invite => invite.email.toLowerCase() === email.toLowerCase())) {
      setEmailError("This email has already been added");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) {
      validateEmail(e.target.value);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleAddEmail = () => {
    if (validateEmail(email)) {
      setInvites([...invites, { email, access: "view" }]);
      setEmail("");
      setEmailError(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setInvites(invites.filter(invite => invite.email !== emailToRemove));
  };

  const handleAccessChange = (email: string, access: "view" | "edit") => {
    setInvites(invites.map(invite => 
      invite.email === email ? { ...invite, access } : invite
    ));
  };

  const handleShare = () => {
    // Here you would implement the actual sharing logic
    console.log('Sharing with:', invites);
    // Reset the form
    setInvites([]);
    setEmail("");
    setEmailError(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share Spreadsheet</DialogTitle>
          <DialogDescription>
            Share with specific people or anyone with the link
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-6">
          {/* Email sharing section */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Input 
                  value={email}
                  onChange={handleEmailChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Add people by email"
                  type="email"
                  className={cn(
                    "flex-1",
                    emailError && "border-red-500 focus-visible:ring-red-500"
                  )}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                />
                <Button
                  onClick={handleAddEmail}
                  disabled={!email}
                  size="icon"
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {emailError && (
                <p className="text-sm text-red-500" id="email-error" role="alert">
                  {emailError}
                </p>
              )}
            </div>

            {/* List of invited emails */}
            {invites.length > 0 && (
              <div className="flex flex-col gap-2">
                {invites.map((invite) => (
                  <div key={invite.email} className="flex items-center justify-between gap-2 p-2 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{invite.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={invite.access}
                        onChange={(e) => handleAccessChange(invite.email, e.target.value as "view" | "edit")}
                        className="text-sm bg-transparent border rounded px-2 py-1"
                      >
                        <option value="view">Can view</option>
                        <option value="edit">Can edit</option>
                      </select>
                      <button
                        onClick={() => handleRemoveEmail(invite.email)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <Button 
                  onClick={handleShare} 
                  className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Share
                </Button>
              </div>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Link sharing section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Input 
                value={shareUrl}
                readOnly
                className="flex-1 text-sm text-muted-foreground"
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link className="w-4 h-4" />
              <span>Anyone with the link can view this spreadsheet</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 