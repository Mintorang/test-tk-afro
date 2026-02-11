'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { 
  ChefHat, 
  Users, 
  Clock, 
  Star, 
  Heart,
  MapPin,
  Phone,
  Mail,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Award
} from 'lucide-react';
import Image from 'next/image';

interface TourStep {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  features: string[];
  icon: any;
}

const tourSteps: TourStep[] = [
  {
    id: "reel1",
    title: "Chef's Kitchen Mastery",
    description: "Watch our expert chefs skillfully prepare authentic Nigerian dishes with traditional techniques and modern precision.",
    image: "/images/updates/reels/VID-20250716-WA0026.mp4",
    duration: "0:30",
    features: ["Traditional Techniques", "Expert Chefs", "Authentic Recipes"],
    icon: ChefHat
  },
  {
    id: "reel2",
    title: "Kitchen Team Dynamics",
    description: "Experience the synchronized teamwork and passion that goes into every dish preparation in our bustling kitchen.",
    image: "/images/updates/reels/VID-20250716-WA0025.mp4",
    duration: "1:10",
    features: ["Team Coordination", "Passionate Staff", "Efficient Workflow"],
    icon: Users
  },
  {
    id: "reel3",
    title: "Premium Ingredient Selection",
    description: "Discover how we carefully select and prepare the finest ingredients that make our Nigerian cuisine truly exceptional.",
    image: "/images/updates/reels/date 2025-07-18 at 13.07.08.png",
    duration: "0:10",
    features: ["Premium Quality", "Fresh Selection", "Authentic Flavors"],
    icon: Heart
  },
  {
    id: "reel4",
    title: "Artistic Food Presentation",
    description: "See how we transform each dish into a visual masterpiece, ensuring every plate tells a story of Nigerian heritage.",
    image: "/images/updates/reels/date 2025-07-18 at 13.07.41.png",
    duration: "0:10",
    features: ["Visual Appeal", "Cultural Heritage", "Professional Plating"],
    icon: Star
  },
  {
    id: "reel5",
    title: "Quality Control Process",
    description: "Witness our meticulous quality control process ensuring every order meets our high standards before delivery.",
    image: "/images/updates/reels/date 2025-07-18 at 13.08.23.png",
    duration: "0:10",
    features: ["Quality Standards", "Food Safety", "Customer Satisfaction"],
    icon: Clock
  },
  {
    id: "reel6",
    title: "Customer Joy & Satisfaction",
    description: "Experience the genuine happiness and satisfaction our authentic Nigerian cuisine brings to our valued customers.",
    image: "/images/updates/reels/date 2025-07-18 at 13.08.50.png",
    duration: "0:10",
    features: ["Customer Happiness", "Community Impact", "Cultural Connection"],
    icon: Users
  },
  {
    id: "reel7",
    title: "Celebration & Events",
    description: "See how our Nigerian cuisine becomes the centerpiece of celebrations, creating memorable moments for families and communities.",
    image: "/images/updates/reels/date 2025-07-18 at 13.09.26.png",
    duration: "0:10",
    features: ["Event Catering", "Family Gatherings", "Cultural Celebrations"],
    icon: Award
  }
];

const VirtualExperienceTour = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % tourSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + tourSteps.length) % tourSteps.length);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Virtual Experience Tour
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Take a behind-the-scenes look at our kitchen, meet our team, and discover 
            how we create authentic Nigerian cuisine from scratch.
          </p>
        </motion.div>

        {/* Main Tour Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image/Video Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="overflow-hidden bg-white/5 backdrop-blur-sm border-white/10">
              <div className="relative h-96">
                {tourSteps[currentStep].image.endsWith('.mp4') ? (
                  <video
                    src={tourSteps[currentStep].image}
                    controls
                    autoPlay={isPlaying}
                    loop
                    muted
                    className="object-cover w-full h-full rounded-lg"
                    style={{ height: '100%', width: '100%' }}
                  />
                ) : (
                  <Image
                    src={tourSteps[currentStep].image}
                    alt={tourSteps[currentStep].title}
                    fill
                    className="object-cover"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlay}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </motion.button>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-black/50 text-white border-0 backdrop-blur-sm">
                    {tourSteps[currentStep].duration}
                  </Badge>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Step Indicator */}
            <div className="flex items-center gap-4 mb-6">
              <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-0">
                Step {currentStep + 1} of {tourSteps.length}
              </Badge>
              <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Current Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                                 <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                   {(() => {
                     const IconComponent = tourSteps[currentStep].icon;
                     return <IconComponent className="w-6 h-6 text-white" />;
                   })()}
                 </div>
                <h3 className="text-2xl font-bold text-white">
                  {tourSteps[currentStep].title}
                </h3>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {tourSteps[currentStep].description}
              </p>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Key Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {tourSteps[currentStep].features.map((feature, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <SkipBack className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={togglePlay}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={nextStep}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Next
                <SkipForward className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Step Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {tourSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`p-6 rounded-lg transition-all duration-300 text-left ${
                  currentStep === index
                    ? 'bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border-orange-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                } border backdrop-blur-sm`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === index
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                      : 'bg-white/10'
                  }`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <Badge className={`${
                    currentStep === index
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                      : 'bg-white/20 text-slate-300'
                  } border-0`}>
                    {index + 1}
                  </Badge>
                </div>
                <h4 className="text-white font-semibold mb-2">{step.title}</h4>
                <p className="text-slate-400 text-sm line-clamp-2">{step.description}</p>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="p-8 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border-orange-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Experience the Real Thing
            </h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Ready to taste the authentic flavors you just discovered? 
              Order now and experience the same quality and care in every bite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                asChild
              >
                <a href="/menu">Order Now</a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white"
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualExperienceTour; 