import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { BrainCircuit, Zap, Activity } from 'lucide-react';

export function SynapseSpinner() {
  const nodeControls = useAnimation();
  const connectionsControls = useAnimation();
  
  useEffect(() => {
    // Animate nodes pulsing
    nodeControls.start({
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        duration: 2, 
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    });
    
    // Animate connections flowing
    connectionsControls.start({
      pathLength: [0, 1],
      pathOffset: [0, 1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "linear"
      }
    });
  }, [nodeControls, connectionsControls]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
      <div className="relative w-64 h-64">
        {/* Neural network nodes */}
        <motion.div 
          className="absolute top-0 left-0"
          animate={nodeControls}
        >
          <BrainCircuit size={28} className="text-blue-400" />
        </motion.div>
        
        <motion.div 
          className="absolute top-12 right-8"
          animate={nodeControls}
          transition={{ delay: 0.3 }}
        >
          <Zap size={24} className="text-purple-400" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-16 left-12"
          animate={nodeControls}
          transition={{ delay: 0.7 }}
        >
          <Activity size={28} className="text-teal-400" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-4 right-4"
          animate={nodeControls}
          transition={{ delay: 0.5 }}
        >
          <BrainCircuit size={28} className="text-indigo-400" />
        </motion.div>
        
        <motion.div 
          className="absolute top-24 left-24"
          animate={nodeControls}
          transition={{ delay: 0.1 }}
        >
          <Zap size={28} className="text-pink-400" />
        </motion.div>
        
        <svg className="absolute inset-0 w-full h-full">
          {/* Connection lines between nodes */}
          <motion.path 
            d="M 28 14 Q 80 40, 148 24" 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            fill="none"
            animate={connectionsControls}
            transition={{ delay: 0.2 }}
          />
          
          <motion.path 
            d="M 28 14 Q 50 80, 40 120" 
            stroke="#06B6D4" 
            strokeWidth="2" 
            fill="none"
            animate={connectionsControls}
            transition={{ delay: 0.4 }}
          />
          
          <motion.path 
            d="M 148 24 Q 100 100, 180 140" 
            stroke="#3B82F6" 
            strokeWidth="2" 
            fill="none"
            animate={connectionsControls}
            transition={{ delay: 0.1 }}
          />
          
          <motion.path 
            d="M 40 120 Q 100 150, 180 140" 
            stroke="#EC4899" 
            strokeWidth="2" 
            fill="none"
            animate={connectionsControls}
            transition={{ delay: 0.3 }}
          />
          
          <motion.path 
            d="M 88 88 Q 100 40, 148 24" 
            stroke="#10B981" 
            strokeWidth="2" 
            fill="none"
            animate={connectionsControls}
            transition={{ delay: 0.5 }}
          />
          
          <motion.path 
            d="M 88 88 Q 60 120, 40 120" 
            stroke="#8B5CF6" 
            strokeWidth="2" 
            fill="none"
            animate={connectionsControls}
            transition={{ delay: 0.6 }}
          />
        </svg>
      </div>
      
      {/* Text and progress indicator */}
      <div className="mt-8 flex flex-col items-center">
        <motion.h1 
          className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          SynapsSolutions
        </motion.h1>
        
        <motion.div 
          className="h-1 w-48 bg-gray-700 rounded-full overflow-hidden mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"
            initial={{ width: "0%" }}
            animate={{ 
              width: "100%",
              transition: { 
                duration: 2.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
        
        <motion.p 
          className="text-gray-400 mt-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            transition: { 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }
          }}
        >
          Building neural connections...
        </motion.p>
      </div>
    </div>
  );
}