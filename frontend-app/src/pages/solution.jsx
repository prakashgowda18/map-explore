import React, { useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Volume2, Users, SunMedium, Lightbulb, Eye, EyeOff, VideoOff } from "lucide-react";
import SolutionCard from "../components/Solution/SolutionCard";
import SensoryFilter from "../components/Solution/SensoryFilter";
import VideoResource from "../components/solutions/VideoResource";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { useToast } from "../../components/ui/use-toast";

const Solution = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Solutions" },
    { id: "noise", name: "Noise Sensitivity", icon: <Volume2 className="mr-2" /> },
    { id: "crowds", name: "Crowd Sensitivity", icon: <Users className="mr-2" /> },
    { id: "light", name: "Light Sensitivity", icon: <SunMedium className="mr-2" /> },
  ];
  
  const solutions = [
    {
      id: 1,
      title: "Use Noise-Cancelling Headphones",
      description: "Wearing noise-cancelling headphones can help reduce overwhelming sounds in loud environments.",
      category: "noise",
      icon: <Headphones size={48} />,
      animation: "headphones",
      tips: [
        "Choose over-ear headphones for better noise isolation",
        "Carry them in your sensory kit when going out",
        "Consider models with adjustable noise cancellation levels"
      ]
    },
    {
      id: 2,
      title: "Find Quiet Spaces",
      description: "Look for designated quiet areas or create a personal quiet space to retreat to when needed.",
      category: "noise",
      icon: <Volume2 size={48} />,
      animation: "quiet",
      tips: [
        "Research venues in advance for quiet rooms",
        "Use restrooms as temporary quiet spaces",
        "Consider arriving early to events to find quieter spots"
      ]
    },
    {
      id: 3,
      title: "Scheduled Breaks from Crowds",
      description: "Plan regular breaks away from crowded areas to prevent sensory overload.",
      category: "crowds",
      icon: <Users size={48} />,
      animation: "break",
      tips: [
        "Set timers to remind yourself to take breaks",
        "Identify exit routes before entering crowded spaces",
        "Use visualization techniques during breaks to calm yourself"
      ]
    },
    {
      id: 4,
      title: "Use Sunglasses or Tinted Lenses",
      description: "Special tinted glasses can reduce the harshness of bright or fluorescent lighting.",
      category: "light",
      icon: <SunMedium size={48} />,
      animation: "sunglasses",
      tips: [
        "Try FL-41 tinted lenses which are specially designed to filter fluorescent light",
        "Keep an extra pair in your bag or car",
        "Consider a hat with a brim as an additional light shield"
      ]
    },
    {
      id: 5,
      title: "White Noise Machines",
      description: "Create a consistent background sound to mask unpredictable noises that may cause distress.",
      category: "noise",
      icon: <Volume2 size={48} />,
      animation: "quiet",
      tips: [
        "Portable white noise machines can be taken anywhere",
        "Many smartphone apps offer free white noise options",
        "Experiment with different sounds (white, pink, or brown noise)"
      ]
    },
    {
      id: 6,
      title: "Ear Defenders",
      description: "Heavy-duty hearing protection for extremely loud environments like concerts or sporting events.",
      category: "noise",
      icon: <Headphones size={48} />,
      animation: "headphones",
      tips: [
        "Look for models with a high noise reduction rating (NRR)",
        "Some designs are discreet and less noticeable",
        "Practice wearing them at home to get comfortable"
      ]
    },
    {
      id: 7,
      title: "Visual Boundaries",
      description: "Create visual markers that help define personal space in crowded environments.",
      category: "crowds",
      icon: <Users size={48} />,
      animation: "break",
      tips: [
        "Use a brightly colored mat or blanket to sit on in public spaces",
        "Position yourself near walls or corners when possible",
        "Consider wearing clothing with clear boundaries (like jackets)"
      ]
    },
    {
      id: 8,
      title: "Crowd Navigation Planning",
      description: "Prepare strategies for moving through crowded spaces with minimal distress.",
      category: "crowds",
      icon: <Eye size={48} />,
      animation: "blink",
      tips: [
        "Study maps of venues before visiting",
        "Plan to visit during off-peak hours",
        "Use a 'buddy system' with a trusted friend or family member"
      ]
    },
    {
      id: 9,
      title: "Adjustable Lighting",
      description: "Control your environment with dimmable lights and lamps with warm tones rather than fluorescent lighting.",
      category: "light",
      icon: <Lightbulb size={48} />,
      animation: "pulse",
      tips: [
        "Replace harsh overhead lighting with floor or table lamps",
        "Use bulbs with warmer color temperatures (2700K-3000K)",
        "Install dimmer switches where possible"
      ]
    },
    {
      id: 10,
      title: "Light Blocking Curtains",
      description: "Install heavy curtains that can block out bright sunlight or street lights when needed.",
      category: "light",
      icon: <EyeOff size={48} />,
      animation: "sunglasses",
      tips: [
        "Look for curtains labeled as 'blackout' or 'room darkening'",
        "Choose curtains with neutral colors for a calming effect",
        "Consider using clips to ensure complete coverage around edges"
      ]
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Managing Noise Sensitivity",
      description: "Practical strategies for coping with noise in everyday situations.",
      category: "noise",
      youtubeId: "dQw4w9WgXcQ", // This would be replaced with a real educational video ID
    },
    {
      id: 2,
      title: "Navigating Crowded Spaces",
      description: "Techniques for staying calm in crowds and busy environments.",
      category: "crowds",
      youtubeId: "dQw4w9WgXcQ", // This would be replaced with a real educational video ID
    },
    {
      id: 3,
      title: "Understanding Sensory Processing",
      description: "An overview of sensory processing differences in autism from Autism Speaks.",
      category: "all",
      youtubeId: "xG2cvidnt7U", // Autism Speaks video on sensory processing
    },
    {
      id: 4,
      title: "Light Sensitivity Solutions",
      description: "How to adapt environments to reduce light sensitivity issues.",
      category: "light",
      youtubeId: "dQw4w9WgXcQ", // This would be replaced with a real educational video ID
    },
    {
      id: 5,
      title: "Creating a Sensory Toolkit",
      description: "How to assemble personalized tools to manage sensory challenges on-the-go.",
      category: "all",
      youtubeId: "dQw4w9WgXcQ", // This would be replaced with a real educational video ID
    },
    {
      id: 6,
      title: "Sensory Diet Activities",
      description: "Regular sensory activities that can help regulate the nervous system.",
      category: "all",
      youtubeId: "dQw4w9WgXcQ", // This would be replaced with a real educational video ID
    }
  ];

  const filteredSolutions = activeCategory === "all" 
    ? solutions 
    : solutions.filter(solution => solution.category === activeCategory);

  const filteredVideos = activeCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast({
      title: "Filter Applied",
      description: `Showing ${category === "all" ? "all" : category} solutions`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            ASD Sensory Solutions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find helpful strategies for managing sensory challenges related to noise, crowds, and bright lights.
          </p>
        </header>

        <SensoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />

        <Tabs defaultValue="solutions" className="w-full mb-12">
          <TabsList className="w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="solutions" className="w-1/2">Solutions</TabsTrigger>
            <TabsTrigger value="videos" className="w-1/2">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="solutions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSolutions.map(solution => (
                <SolutionCard 
                  key={solution.id} 
                  title={solution.title} 
                  description={solution.description} 
                  icon={solution.icon}
                  animation={solution.animation}
                  tips={solution.tips}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVideos.map(video => (
                <VideoResource 
                  key={video.id} 
                  title={video.title} 
                  description={video.description} 
                  youtubeId={video.youtubeId} 
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white rounded-lg p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Did You Know?</h2>
          <p className="text-gray-700">
            Creating a personalized sensory kit can help manage unexpected sensory challenges. 
            Consider including items like noise-cancelling headphones, sunglasses, fidget toys, 
            and a card explaining your needs to others when communication becomes difficult.
          </p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 shadow-lg mb-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.autism.org/sensory-proces" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-blue-600 mb-2">Autism.org: Sensory Processing</h3>
              <p className="text-gray-600">Comprehensive information about sensory processing challenges and strategies.</p>
            </a>
            <a href="https://autismspeaks.org/sensory-issues" target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium text-blue-600 mb-2">Autism Speaks: Sensory Issues</h3>
              <p className="text-gray-600">Research-backed approaches to managing various sensory sensitivities.</p>
            </a>
          </div>
        </div>
      </motion.div>
      
      <footer className="text-center text-gray-500 text-sm mt-12">
        <p>Always consult with healthcare professionals for personalized advice.</p>
      </footer>
    </div>
  );
};

export default Solution;