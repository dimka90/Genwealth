import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';

interface EncryptedBadgeProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function EncryptedBadge({ 
  text = 'Encrypted', 
  size = 'md', 
  className = '' 
}: EncryptedBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4'
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded-full bg-indigo-500/20 text-indigo-300 ${sizeClasses[size]} ${className}`}
    >
      <FaLock className={`mr-1.5 ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`} />
      {text}
    </motion.span>
  );
}