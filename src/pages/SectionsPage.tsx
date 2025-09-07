import { BookOpen, Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BottomNavigation } from '@/components/BottomNavigation';
import { excelModules, getModuleProgress } from '@/data/modules';

interface SectionsPageProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onModuleClick?: (moduleId: string) => void;
}

const SectionsPage = ({ activeTab, onTabChange, onModuleClick }: SectionsPageProps) => {
  const totalLessons = excelModules.reduce((total, module) => total + module.lessons.length, 0);
  const totalDuration = excelModules.reduce((total, module) => 
    total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.duration, 0), 0
  );

  const handleModuleClick = (moduleId: string) => {
    if (onModuleClick) {
      onModuleClick(moduleId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Seções do Curso</h1>
          <p className="text-muted-foreground mb-4">
            Domine o Excel com nosso guia completo e prático
          </p>
          
          {/* Course Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{excelModules.length}</div>
              <div className="text-xs text-muted-foreground">Módulos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{totalLessons}</div>
              <div className="text-xs text-muted-foreground">Lições</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-foreground">{Math.round(totalDuration / 60)}h</div>
              <div className="text-xs text-muted-foreground">Duração</div>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {excelModules.map((module, index) => {
            const progress = getModuleProgress(module.id);
            const moduleDuration = module.lessons.reduce((total, lesson) => total + lesson.duration, 0);
            
            return (
              <Card 
                key={module.id}
                className="overflow-hidden hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                onClick={() => handleModuleClick(module.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${module.color}`} />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center text-lg">
                        {module.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {module.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                    >
                      {index + 1}/{excelModules.length}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <BookOpen className="mr-1" size={12} />
                        {module.lessons.length} {module.lessons.length === 1 ? 'lição' : 'lições'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1" size={12} />
                        {moduleDuration} min
                      </div>
                    </div>
                    {progress === 100 && (
                      <Badge variant="default" className="text-xs bg-green-500">
                        Concluído ✓
                      </Badge>
                    )}
                  </div>

                  {progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="text-primary font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Course Info */}
        <Card className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="text-center">
            <div className="text-xl mb-2">🎯</div>
            <h3 className="font-semibold text-foreground mb-2">
              Aprenda Excel de Forma Prática
            </h3>
            <p className="text-sm text-muted-foreground">
              "Aprender é a única coisa de que a mente nunca se cansa, nunca tem medo e nunca se arrepende."
            </p>
            <p className="text-xs text-muted-foreground mt-1 italic">
              — Leonardo da Vinci
            </p>
          </div>
        </Card>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default SectionsPage;