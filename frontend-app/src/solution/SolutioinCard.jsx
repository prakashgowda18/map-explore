import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

interface SolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  animation: string;
  tips: string[];
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  title,
  description,
  icon,
  animation,
  tips,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const renderAnimation = () => {
    switch (animation) {
      case "headphones":
        return (
          <motion.div
            className="relative h-16 w-16 mx-auto"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {icon}
            <motion.div
              className="absolute top-0 left-0 h-full w-full rounded-full border-2 border-blue-400"
              animate={{
                scale: [1, 1.4, 1.8],
                opacity: [0.8, 0.4, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>
        );
      case "quiet":
        return (
          <motion.div
            className="relative h-16 w-16 mx-auto"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {icon}
          </motion.div>
        );
      case "break":
        return (
          <motion.div
            className="relative h-16 w-16 mx-auto"
            animate={{
              x: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {icon}
          </motion.div>
        );
      case "sunglasses":
        return (
          <motion.div
            className="relative h-16 w-16 mx-auto"
            animate={{
              rotateZ: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {icon}
          </motion.div>
        );
      case "blink":
        return (
          <motion.div
            className="relative h-16 w-16 mx-auto"
            animate={{
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {icon}
          </motion.div>
        );
      case "pulse":
        return (
          <motion.div
            className="relative h-16 w-16 mx-auto"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(255, 255, 0, 0)",
                "0 0 0 10px rgba(255, 255, 0, 0.1)",
                "0 0 0 0 rgba(255, 255, 0, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {icon}
          </motion.div>
        );
      default:
        return <div className="h-16 w-16 mx-auto">{icon}</div>;
    }
  };

  return (
    <motion.div
      whileHover={{ translateY: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "overflow-hidden transition-all duration-200", 
        isExpanded ? "h-auto" : "h-[280px]"
      )}>
        <CardHeader className="pb-2">
          <div className="flex justify-center mb-4">{renderAnimation()}</div>
          <CardTitle className="text-center text-blue-700">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{description}</p>
          
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              height: isExpanded ? "auto" : 0
            }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="font-medium text-blue-800 mb-2 flex items-center">
              <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Tips</Badge>
              Helpful Suggestions
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-2">
              {tips.map((tip, index) => (
                <li key={index} className="text-sm">{tip}</li>
              ))}
            </ul>
          </motion.div>
          
          <Button
            variant="ghost" 
            size="sm"
            className="w-full mt-4 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <span className="flex items-center">
                Show Less <ChevronUp className="ml-2 h-4 w-4" />
              </span>
            ) : (
              <span className="flex items-center">
                Show More <ChevronDown className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SolutionCard;
