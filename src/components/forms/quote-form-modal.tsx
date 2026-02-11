import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail } from "lucide-react";

export function QuoteFormModal({ trigger }: { trigger: ReactNode }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        // Keep modal open to show success message
      } else {
        alert('Sorry, there was an error sending your request. Please try again or contact us directly.');
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
      alert('Sorry, there was an error sending your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSuccess(false);
  };

  const resetForm = () => {
    setIsSuccess(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {isSuccess ? 'Quote Request Received!' : 'Request a Quote'}
          </DialogTitle>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4">
            <div className="flex justify-center">
              <div className="relative">
                <CheckCircle className="h-16 w-16 sm:h-20 sm:w-20 text-green-500 animate-pulse" />
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                🎉 Request Received Successfully!
              </h3>
              <p className="text-base sm:text-lg text-slate-200 font-medium">
                Thank you, <span className="text-orange-400">{formData.name}</span>!
              </p>
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-4 sm:p-6">
                <div className="space-y-2 sm:space-y-3">
                  <p className="text-sm sm:text-base text-slate-200 font-medium">
                    ✨ Your catering quote request has been sent to our expert team
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300">
                    We'll review your requirements and get back to you with a personalized quote within <span className="text-orange-400 font-bold">24 hours</span>.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs sm:text-sm font-medium">Notification sent to chef@tkafrokitchen.com</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-slate-300">
                  💡 <strong>Pro tip:</strong> For urgent requests or questions, feel free to email us directly for immediate assistance.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <Button 
                onClick={handleClose}
                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold text-sm sm:text-base py-2 sm:py-3"
              >
                🎯 Perfect! Close
              </Button>
              <Button 
                onClick={resetForm}
                variant="outline"
                className="flex-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/10 text-sm sm:text-base py-2 sm:py-3"
              >
                📝 New Request
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block mb-1 text-sm sm:text-base text-slate-200">Name</label>
              <input
                name="name"
                className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base text-slate-200">Email</label>
              <input
                name="email"
                type="email"
                className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm sm:text-base text-slate-200">Message</label>
              <textarea
                name="message"
                rows={3}
                className="w-full border rounded-lg px-3 py-2 sm:py-3 text-black bg-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Tell us about your event, number of guests, date, and any special requirements..."
              />
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold text-sm sm:text-base py-2 sm:py-3 rounded-lg"
            >
              {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}