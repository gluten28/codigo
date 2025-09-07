import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, BookOpen } from 'lucide-react';
import { Module, getModuleProgress } from '@/data/modules';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  onClick: (module: Module) => void;
}

export const ModuleCard = ({ module, onClick }: ModuleCardProps) => {
  const progress = getModuleProgress(module.id);
  const totalLessons = module.lessons.length;
  const totalDuration = module.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);

  return (
    <Card 
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-card hover:scale-[1.02]",
        "border-border/50 bg-gradient-card"
      )}
      onClick={() => onClick(module)}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{module.icon}</div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {module.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {module.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <BookOpen size={12} />
            <span>{totalLessons} lições</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>{totalDuration} min</span>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Progresso</span>
            <span className="text-xs font-medium text-foreground">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Badge */}
        {progress === 100 && (
          <Badge className="bg-secondary text-secondary-foreground text-xs">
            ✓ Concluído
          </Badge>
        )}
      </div>
    </Card>
  );
};