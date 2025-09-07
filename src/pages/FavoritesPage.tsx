import { useState, useEffect } from 'react';
import { Heart, BookOpen, Clock, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { excelModules } from '@/data/modules';
import { getFavorites, removeFavorite, clearAllFavorites } from '@/utils/storage';

interface FavoritesPageProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLessonClick?: (moduleId: string, lessonId: string) => void;
}

const FavoritesPage = ({ activeTab, onTabChange, onLessonClick }: FavoritesPageProps) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const favoriteLessons = favorites.map(lessonId => {
    for (const module of excelModules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        return { lesson, module };
      }
    }
    return null;
  }).filter(Boolean);

  const handleRemoveFavorite = (lessonId: string) => {
    removeFavorite(lessonId);
    setFavorites(getFavorites());
  };

  const handleClearAll = () => {
    clearAllFavorites();
    setFavorites([]);
  };

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    if (onLessonClick) {
      onLessonClick(moduleId, lessonId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Favoritos</h1>
              <p className="text-muted-foreground">Suas lições salvas para consulta rápida</p>
            </div>
            {favorites.length > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-2" size={16} />
                Limpar Tudo
              </Button>
            )}
          </div>
        </div>

        {/* Favorites List */}
        {favoriteLessons.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Lições Favoritas
              </h2>
              <Badge variant="secondary">
                {favoriteLessons.length} {favoriteLessons.length === 1 ? 'favorito' : 'favoritos'}
              </Badge>
            </div>

            <div className="space-y-3">
              {favoriteLessons.map(({ lesson, module }) => (
                <Card 
                  key={lesson.id} 
                  className="p-4 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                  onClick={() => handleLessonClick(module.id, lesson.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">{module.icon}</span>
                        <span className="text-xs text-muted-foreground">
                          {module.title}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {lesson.objective}
                      </p>
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={lesson.difficulty === 'iniciante' ? 'secondary' : 
                                  lesson.difficulty === 'intermediário' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {lesson.difficulty}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1" size={12} />
                          {lesson.duration} min
                        </div>
                        {lesson.formulas.length > 0 && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <BookOpen className="mr-1" size={12} />
                            {lesson.formulas.length} {lesson.formulas.length === 1 ? 'fórmula' : 'fórmulas'}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(lesson.id);
                      }}
                      className="text-destructive hover:text-destructive p-2"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-muted-foreground mb-4">
              Favorite lições para acesso rápido clicando no ícone de coração
            </p>
            <Button onClick={() => onTabChange('sections')}>
              Explorar Módulos
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default FavoritesPage;