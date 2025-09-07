import { Home, Book, Search, Heart, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'sections', label: 'Seções', icon: Book },
  { id: 'search', label: 'Buscar', icon: Search },
  { id: 'favorites', label: 'Favoritos', icon: Heart },
  { id: 'more', label: 'Mais', icon: MoreHorizontal },
];

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-elegant z-50">
      <div className="flex items-center justify-around px-2 py-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200",
                "min-w-[60px] min-h-[50px]",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon 
                size={20} 
                className={cn(
                  "transition-transform duration-200",
                  isActive && "scale-110"
                )} 
              />
              <span className={cn(
                "text-xs mt-1 font-medium transition-colors duration-200",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};