import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  whatsapp?: string;
  city: string;
  month: string;
  occasion: string;
}

export function WaitlistForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log('Waitlist submission:', data);
      setIsSubmitted(true);
      
      toast({
        title: "Welcome to the waitlist! 🎉",
        description: "You're in the founding 100. We'll text you when your month opens.",
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" className="py-24 bg-blush/20">
        <div className="container mx-auto px-6 text-center">
          <Card className="card-elevated max-w-md mx-auto animate-scale-in">
            <div className="p-8">
              <CheckCircle className="w-16 h-16 text-emerald mx-auto mb-6" />
              <h3 className="font-display text-2xl font-bold text-charcoal mb-4">
                You're in! 🎉
              </h3>
              <p className="text-body text-charcoal/70 mb-4">
                Position #47 in the founding 100
              </p>
              <p className="text-sm text-charcoal/60">
                We'll text you when your month opens. Plus, you've unlocked a complimentary upgrade!
              </p>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-24 bg-blush/20">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto text-center mb-8">
          <h2 className="text-headline mb-4 text-charcoal">
            Join the Waitlist
          </h2>
          <p className="text-body text-charcoal/70 mb-2">
            30 seconds. No spam. We text only when your month opens.
          </p>
          <p className="text-sm text-champagne font-medium">
            "Founding 100" unlocks a complimentary upgrade
          </p>
        </div>

        <Card className="card-glass max-w-lg mx-auto">
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  {...register('name', { required: 'Name is required', minLength: 2 })}
                  className="focus:ring-champagne focus:border-champagne"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  className="focus:ring-champagne focus:border-champagne"
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp (optional)</Label>
                <Input
                  id="whatsapp"
                  placeholder="+1234567890"
                  {...register('whatsapp')}
                  className="focus:ring-champagne focus:border-champagne"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Select onValueChange={(value) => setValue('city', value)}>
                    <SelectTrigger className="focus:ring-champagne">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="amaravati">Amaravati</SelectItem>
                      <SelectItem value="bengaluru">Bengaluru</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.city && (
                    <p className="text-sm text-destructive">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Input
                    id="month"
                    type="month"
                    {...register('month', { required: 'Month is required' })}
                    className="focus:ring-champagne focus:border-champagne"
                  />
                  {errors.month && (
                    <p className="text-sm text-destructive">{errors.month.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Occasion</Label>
                <Select onValueChange={(value) => setValue('occasion', value)}>
                  <SelectTrigger className="focus:ring-champagne">
                    <SelectValue placeholder="What's the occasion?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="justbecause">Just Because</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.occasion && (
                  <p className="text-sm text-destructive">{errors.occasion.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-hero h-12"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin"></div>
                    Joining...
                  </div>
                ) : (
                  'Join the Waitlist'
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}