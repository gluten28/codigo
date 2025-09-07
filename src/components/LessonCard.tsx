import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormulaCard } from '@/components/FormulaCard';
import { Clock, Heart, BookOpen, Star } from 'lucide-react';
import { Lesson } from '@/data/modules';
import { isLessonComplete, isFavorite, addFavorite, removeFavorite } from '@/utils/storage';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface LessonCardProps {
  lesson: Lesson;
  onComplete?: (lessonId: string) => void;
}

export const LessonCard = ({ lesson, onComplete }: LessonCardProps) => {
  const [completed, setCompleted] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setCompleted(isLessonComplete(lesson.id));
    setFavorite(isFavorite(lesson.id));
  }, [lesson.id]);

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(lesson.id);
      setFavorite(false);
      toast({
        title: "Removido dos favoritos",
        description: `"${lesson.title}" foi removido dos seus favoritos.`,
      });
    } else {
      addFavorite(lesson.id);
      setFavorite(true);
      toast({
        title: "Adicionado aos favoritos",
        description: `"${lesson.title}" foi adicionado aos seus favoritos.`,
      });
    }
  };

  const difficultyColors = {
    'iniciante': 'bg-green-100 text-green-800 border-green-200',
    'intermediário': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'avançado': 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-card border-border/50">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-2">
              {lesson.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {lesson.objective}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteToggle}
            className={cn(
              "ml-2 h-8 w-8 p-0",
              favorite ? "text-accent hover:text-accent/80" : "text-muted-foreground"
            )}
          >
            <Heart 
              size={16} 
              className={favorite ? "fill-current" : ""} 
            />
          </Button>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Clock size={12} />
            <span>{lesson.duration} min</span>
          </div>
          <Badge 
            variant="outline" 
            className={cn("text-xs", difficultyColors[lesson.difficulty])}
          >
            {lesson.difficulty}
          </Badge>
          {completed && (
            <Badge className="bg-secondary text-secondary-foreground text-xs">
              ✓ Concluído
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-sm max-w-none">
        <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {lesson.content}
        </div>
      </div>

      {/* Formulas */}
      {lesson.formulas.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <BookOpen size={16} className="text-primary" />
            <h4 className="font-semibold text-sm text-foreground">
              Fórmulas desta lição
            </h4>
          </div>
          <div className="space-y-2">
            {lesson.formulas.map((formula) => (
              <FormulaCard key={formula.id} formula={formula} />
            ))}
          </div>
        </div>
      )}

      {/* Examples */}
      {lesson.examples.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Star size={16} className="text-accent" />
            <h4 className="font-semibold text-sm text-foreground">
              Exemplos práticos
            </h4>
          </div>
          <div className="space-y-2">
            {lesson.examples.map((example) => (
              <Card key={example.id} className="p-3 bg-muted/30">
                <h5 className="font-medium text-sm mb-2">{example.title}</h5>
                <p className="text-xs text-muted-foreground mb-2">{example.description}</p>
                <Button size="sm" variant="outline" className="text-xs">
                  Testar Exemplo
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Template Download */}
      {lesson.templateUrl && (
        <div className="pt-2 border-t border-border/50">
          <Button variant="outline" size="sm" className="w-full">
            📁 Baixar Template
          </Button>
        </div>
      )}
    </Card>
  );
};