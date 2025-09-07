import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation } from '@/components/BottomNavigation';
import { ModuleCard } from '@/components/ModuleCard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { excelModules, Module } from '@/data/modules';
import { Play, Download, Shield, BookOpen } from 'lucide-react';
import SearchPage from './SearchPage';
import FavoritesPage from './FavoritesPage';
import SectionsPage from './SectionsPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const navigate = useNavigate();

  const handleModuleClick = (module: Module) => {
    navigate(`/module/${module.id}`);
  };

  const handleModuleNavigation = (moduleId: string) => {
    navigate(`/module/${moduleId}`);
  };

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    navigate(`/module/${moduleId}?lesson=${lessonId}`);
  };

  const handleStartClick = () => {
    navigate(`/module/${excelModules[0].id}`);
  };

  const handleSummaryClick = () => {
    setActiveTab('sections');
  };

  // Render different pages based on active tab
  if (activeTab === 'sections') {
    return (
      <SectionsPage 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onModuleClick={handleModuleNavigation}
      />
    );
  }

  if (activeTab === 'search') {
    return (
      <SearchPage 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLessonClick={handleLessonClick}
      />
    );
  }

  if (activeTab === 'favorites') {
    return (
      <FavoritesPage 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLessonClick={handleLessonClick}
      />
    );
  }

  if (activeTab === 'more') {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Configurações
            </h2>
            <p className="text-muted-foreground">
              Funcionalidades adicionais em breve!
            </p>
          </div>
        </div>
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <div className="text-4xl mb-4">📊</div>
            <h1 className="text-3xl font-bold leading-tight">
              Código do Excel
            </h1>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              Guia completo e interativo para dominar o Excel
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={handleStartClick}>
                <Play className="mr-2" size={20} />
                Começar Agora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" onClick={handleSummaryClick}>
                <BookOpen className="mr-2" size={20} />
                Ver Sumário
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4 text-center bg-gradient-card">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-semibold text-sm mb-1">Começar do Zero</h3>
            <p className="text-xs text-muted-foreground">Fundamentos essenciais</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-card">
            <div className="text-2xl mb-2">🧮</div>
            <h3 className="font-semibold text-sm mb-1">Fórmulas Essenciais</h3>
            <p className="text-xs text-muted-foreground">SOMA, SE, PROCV</p>
          </Card>
          <Card className="p-4 text-center bg-gradient-card">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="font-semibold text-sm mb-1">Dashboards</h3>
            <p className="text-xs text-muted-foreground">Relatórios visuais</p>
          </Card>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
            <div className="bg-secondary/20 p-2 rounded-lg">
              <Download className="text-secondary" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Modelos Grátis</h4>
              <p className="text-xs text-muted-foreground">Templates prontos</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
            <div className="bg-accent/20 p-2 rounded-lg">
              <BookOpen className="text-accent-foreground" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Conteúdo Bônus</h4>
              <p className="text-xs text-muted-foreground">Atalhos e dicas</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Shield className="text-primary" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-sm">Acesso Completo</h4>
              <p className="text-xs text-muted-foreground">Sem cadastro</p>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Módulos do Curso</h2>
            <Badge variant="secondary" className="text-xs">
              {excelModules.length} módulos
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {excelModules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onClick={handleModuleClick}
              />
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;