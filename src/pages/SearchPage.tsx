import { useState, useMemo } from 'react';
import { Search, BookOpen, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BottomNavigation } from '@/components/BottomNavigation';
import { excelModules, searchLessons } from '@/data/modules';

interface SearchPageProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLessonClick?: (moduleId: string, lessonId: string) => void;
}

const SearchPage = ({ activeTab, onTabChange, onLessonClick }: SearchPageProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchLessons(searchQuery);
  }, [searchQuery]);

  const getModuleForLesson = (lessonId: string) => {
    return excelModules.find(module => 
      module.lessons.some(lesson => lesson.id === lessonId)
    );
  };

  const handleLessonClick = (lessonId: string) => {
    const module = getModuleForLesson(lessonId);
    if (module && onLessonClick) {
      onLessonClick(module.id, lessonId);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Buscar Lições</h1>
          <p className="text-muted-foreground">Encontre rapidamente o conteúdo que precisa</p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <Input
            placeholder="Digite para buscar fórmulas, funções ou tópicos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Search Results */}
        {searchQuery.trim() ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Resultados da busca
              </h2>
              <Badge variant="secondary">
                {searchResults.length} {searchResults.length === 1 ? 'resultado' : 'resultados'}
              </Badge>
            </div>

            {searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((lesson) => {
                  const module = getModuleForLesson(lesson.id);
                  return (
                    <Card 
                      key={lesson.id} 
                      className="p-4 hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg">{module?.icon}</span>
                            <span className="text-xs text-muted-foreground">
                              {module?.title}
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
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground">
                  Tente buscar por outros termos como "SOMA", "gráfico" ou "tabela dinâmica"
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Digite para começar a buscar
            </h3>
            <p className="text-muted-foreground mb-4">
              Encontre rapidamente fórmulas, funções e lições específicas
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['SOMA', 'SE', 'PROCV', 'gráficos', 'tabela dinâmica'].map((term) => (
                <Badge 
                  key={term}
                  variant="outline" 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default SearchPage;