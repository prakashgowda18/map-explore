import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../../components/ui/badge";
import { cn } from "../../lib/utils";

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface SensoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const SensoryFilter: React.FC<SensoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mb-8"
    >
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              className={cn(
                "px-4 py-2 cursor-pointer text-sm font-medium",
                activeCategory === category.id
                  ? "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200"
                  : "bg-white hover:bg-gray-100 border-gray-200"
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="flex items-center">
                {category.icon}
                {category.name}
              </span>
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SensoryFilter;
