import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle } from 'lucide-react';
import { Formula } from '@/data/modules';
import { copyToClipboard } from '@/utils/storage';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface FormulaCardProps {
  formula: Formula;
  className?: string;
}

export const FormulaCard = ({ formula, className }: FormulaCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(formula.formula);
    
    if (success) {
      setCopied(true);
      toast({
        title: "Fórmula copiada!",
        description: "A fórmula foi copiada para a área de transferência.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a fórmula. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={cn("p-4 space-y-3 bg-gradient-card border-border/50", className)}>
      {/* Formula */}
      <div className="relative">
        <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm border">
          <code className="text-foreground break-all">{formula.formula}</code>
        </div>
        <Button
          size="sm"
          onClick={handleCopy}
          className={cn(
            "absolute top-2 right-2 h-8 w-8 p-0 transition-all duration-200",
            copied 
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {copied ? (
            <CheckCircle size={14} />
          ) : (
            <Copy size={14} />
          )}
        </Button>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <p className="text-sm text-foreground font-medium">
          {formula.description}
        </p>
        
        {formula.example && (
          <div className="space-y-1">
            <Badge variant="outline" className="text-xs">
              Exemplo
            </Badge>
            <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
              {formula.example}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};