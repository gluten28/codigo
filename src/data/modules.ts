export interface Lesson {
  id: string;
  title: string;
  objective: string;
  content: string;
  formulas: Formula[];
  examples: Example[];
  templateUrl?: string;
  duration: number; // in minutes
  difficulty: 'iniciante' | 'intermediário' | 'avançado';
}

export interface Formula {
  id: string;
  formula: string;
  description: string;
  example?: string;
}

export interface Example {
  id: string;
  title: string;
  description: string;
  inputs: { label: string; value: string; type: 'text' | 'number' }[];
  expectedOutput: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
  color: string;
}

export const excelModules: Module[] = [
  {
    id: 'introducao',
    title: 'Capítulo 1: Introdução ao Excel',
    description: 'O que é o Excel e por que é importante para o seu trabalho',
    icon: '🚀',
    color: 'from-blue-500 to-blue-600',
    lessons: [
      {
        id: 'o-que-e-excel',
        title: 'O que é o Excel e por que é importante?',
        objective: 'Compreender a importância e aplicações do Excel no mundo profissional',
        content: `O Microsoft Excel é uma das ferramentas mais poderosas e versáteis para análise de dados, cálculos e criação de relatórios. 

**Por que aprender Excel?**
- Ferramenta essencial no mercado de trabalho
- Permite análise rápida de dados
- Automatiza cálculos complexos
- Cria visualizações profissionais

O Excel está presente em praticamente todas as áreas profissionais, desde contabilidade até marketing digital.`,
        formulas: [],
        examples: [],
        duration: 8,
        difficulty: 'iniciante'
      },
      {
        id: 'interface-excel',
        title: 'Navegando na Interface do Excel',
        objective: 'Conhecer os elementos principais da interface do Excel',
        content: `A interface do Excel é composta por vários elementos importantes:

**Faixa de Opções**: Contém as ferramentas organizadas em separadores (Início, Inserir, Layout da Página, etc.)

**Barra de Fórmulas**: Mostra o conteúdo da célula selecionada

**Área de Trabalho**: Onde ficam as células organizadas em linhas e colunas

**Barra de Estado**: Mostra informações sobre a seleção atual

*Dica visual: consulte a Fig.1 no material para melhor compreensão da interface.*`,
        formulas: [],
        examples: [],
        duration: 10,
        difficulty: 'iniciante'
      }
    ]
  },
  {
    id: 'fundamentos',
    title: 'Capítulo 2: Fundamentos das Planilhas',
    description: 'Entendendo células, linhas e colunas',
    icon: '📊',
    color: 'from-green-500 to-green-600',
    lessons: [
      {
        id: 'celulas-linhas-colunas',
        title: 'Entendendo Células, Linhas e Colunas',
        objective: 'Dominar a estrutura básica das planilhas Excel',
        content: `Uma planilha Excel é composta por uma grade de células organizadas em:

**Colunas**: Identificadas por letras (A, B, C...)
**Linhas**: Identificadas por números (1, 2, 3...)
**Células**: Intersecção de uma coluna e linha (A1, B2, C3...)

Cada célula pode conter:
- Números
- Texto
- Fórmulas
- Datas

*Dica visual: consulte a Fig.4 para visualização da grade de células.*`,
        formulas: [],
        examples: [],
        duration: 12,
        difficulty: 'iniciante'
      },
      {
        id: 'inserindo-dados',
        title: 'Inserindo, Excluindo e Movendo Dados',
        objective: 'Aprender a manipular dados básicos nas células',
        content: `Operações básicas com dados:

**Inserir dados**: Clique numa célula e digite
**Editar dados**: Duplo clique na célula ou pressione F2
**Excluir dados**: Selecione a célula e pressione Delete
**Mover dados**: Cortar (Ctrl+X) e Colar (Ctrl+V)

**Formatação básica**:
- Negrito: Ctrl+B
- Itálico: Ctrl+I
- Sublinhado: Ctrl+U`,
        formulas: [],
        examples: [],
        duration: 15,
        difficulty: 'iniciante'
      }
    ]
  },
  {
    id: 'formulas',
    title: 'Capítulo 3: Fórmulas e Funções Essenciais',
    description: 'SOMA, MÉDIA, MÁXIMO, MÍNIMO, SE e muito mais',
    icon: '🧮',
    color: 'from-purple-500 to-purple-600',
    lessons: [
      {
        id: 'introducao-formulas',
        title: 'Introdução às Fórmulas do Excel',
        objective: 'Compreender como funcionam as fórmulas no Excel',
        content: `As fórmulas são o coração do Excel. Sempre começam com = ou +

**Fórmulas básicas**:
- =A1+B1 (soma duas células)
- =A1*B1 (multiplica duas células)
- =A1/B1 (divide duas células)

**Referências**:
- **Relativas**: A1 (muda ao copiar)
- **Absolutas**: $A$1 (não muda ao copiar)`,
        formulas: [
          {
            id: 'formula-basica',
            formula: '=A1+B1',
            description: 'Soma simples entre duas células',
            example: 'Se A1=5 e B1=3, resultado será 8'
          }
        ],
        examples: [],
        duration: 10,
        difficulty: 'iniciante'
      },
      {
        id: 'funcoes-essenciais',
        title: 'Funções: SOMA, MÉDIA, MÁXIMO, MÍNIMO, SE',
        objective: 'Dominar as funções mais utilizadas no Excel',
        content: `**Funções matemáticas essenciais**:

**SOMA**: =SOMA(A1:A10) - Soma todos os valores do intervalo
**MÉDIA**: =MÉDIA(A1:A10) - Calcula a média dos valores
**MÁXIMO**: =MÁXIMO(A1:A10) - Encontra o maior valor
**MÍNIMO**: =MÍNIMO(A1:A10) - Encontra o menor valor

**Função SE**: =SE(A1>100;"Aprovado";"Reprovado")
Permite criar lógica condicional nas células.

*Dica visual: consulte a Fig.5 para exemplo de cálculo de soma.*`,
        formulas: [
          {
            id: 'soma-intervalo',
            formula: '=SOMA(A1:A10)',
            description: 'Soma todos os valores de A1 até A10',
            example: 'Soma automaticamente todos os números do intervalo'
          },
          {
            id: 'funcao-se',
            formula: '=SE(A1>100;"Aprovado";"Reprovado")',
            description: 'Aprova se valor maior que 100',
            example: 'Se A1=150, resultado será "Aprovado"'
          },
          {
            id: 'cont-se',
            formula: '=CONT.SE(A1:A10;">50")',
            description: 'Conta quantas células são maiores que 50',
            example: 'Útil para contar critérios específicos'
          }
        ],
        examples: [
          {
            id: 'analise-vendas',
            title: 'Análise de Vendas Mensais',
            description: 'Calcular estatísticas de vendas',
            inputs: [
              { label: 'Janeiro', value: '15000', type: 'number' },
              { label: 'Fevereiro', value: '18000', type: 'number' },
              { label: 'Março', value: '12000', type: 'number' }
            ],
            expectedOutput: 'Total: 45000, Média: 15000'
          }
        ],
        duration: 20,
        difficulty: 'intermediário'
      }
    ]
  },
  {
    id: 'gerenciamento',
    title: 'Capítulo 4: Gerenciamento de Dados',
    description: 'Ordenar, filtrar e validar dados eficientemente',
    icon: '🗂️',
    color: 'from-indigo-500 to-indigo-600',
    lessons: [
      {
        id: 'ordenar-filtrar',
        title: 'Ordenando e Filtrando Dados',
        objective: 'Organizar e visualizar dados de forma eficiente',
        content: `**Ordenar dados**:
1. Selecione os dados
2. Vá em Dados > Ordenar
3. Escolha a coluna e ordem (crescente/decrescente)

**Filtrar dados**:
1. Selecione os dados
2. Pressione Ctrl+Shift+L ou vá em Dados > Filtro
3. Clique nas setas dos cabeçalhos para filtrar

*Dica visual: consulte a Fig.6 para configuração de ordenação.*

**Filtros automáticos** permitem ver apenas os dados que atendem a critérios específicos.`,
        formulas: [],
        examples: [],
        duration: 15,
        difficulty: 'intermediário'
      },
      {
        id: 'validacao-dados',
        title: 'Validação de Dados e Listas Suspensas',
        objective: 'Controlar a entrada de dados e criar listas dropdown',
        content: `**Validação de dados** evita erros de entrada:

1. Selecione as células
2. Vá em Dados > Validação de Dados
3. Defina critérios (número, data, lista, etc.)

**Listas suspensas**:
- Tipo: Lista
- Fonte: =A1:A10 ou digite valores separados por ponto e vírgula

**Ferramentas de pesquisa**:
- **Localizar**: Ctrl+F
- **Substituir**: Ctrl+H`,
        formulas: [],
        examples: [],
        duration: 18,
        difficulty: 'intermediário'
      }
    ]
  },
  {
    id: 'graficos',
    title: 'Capítulo 5: Gráficos Simples e Visuais',
    description: 'Criar visualizações profissionais dos seus dados',
    icon: '📈',
    color: 'from-pink-500 to-pink-600',
    lessons: [
      {
        id: 'graficos-basicos',
        title: 'Criando Gráficos Básicos',
        objective: 'Transformar dados em visualizações claras e profissionais',
        content: `**Tipos de gráficos mais utilizados**:

**Gráfico de Colunas**: Ideal para comparar valores
**Gráfico de Linhas**: Perfeito para mostrar tendências ao longo do tempo
**Gráfico de Pizza**: Excelente para mostrar proporções

*Dica visual: consulte a Fig.7 para exemplo de gráfico de pizza.*

**Como criar**:
1. Selecione os dados
2. Vá em Inserir > Gráficos
3. Escolha o tipo apropriado`,
        formulas: [],
        examples: [],
        duration: 12,
        difficulty: 'iniciante'
      },
      {
        id: 'personalizar-graficos',
        title: 'Personalizando Gráficos',
        objective: 'Deixar seus gráficos mais atrativos e profissionais',
        content: `**Opções de personalização**:

- **Título**: Adicione títulos descritivos
- **Cores**: Escolha paletas profissionais
- **Legendas**: Posicione adequadamente
- **Eixos**: Configure escalas e rótulos

*Dica visual: consulte as Fig.8-13 para opções de design e tipos.*

**Tipos disponíveis**:
- Barras (Fig.9)
- Linhas (Fig.10)  
- Pizza (Fig.11)
- Dispersão (Fig.12)
- Grelha de opções (Fig.13)`,
        formulas: [],
        examples: [],
        duration: 15,
        difficulty: 'intermediário'
      }
    ]
  },
  {
    id: 'tabelas-dinamicas',
    title: 'Capítulo 6: Trabalhando com Tabelas Dinâmicas',
    description: 'Análise poderosa de grandes volumes de dados',
    icon: '🔄',
    color: 'from-orange-500 to-orange-600',
    lessons: [
      {
        id: 'introducao-tabelas-dinamicas',
        title: 'Introdução às Tabelas Dinâmicas',
        objective: 'Compreender o poder das tabelas dinâmicas para análise',
        content: `**Tabelas Dinâmicas** são uma das ferramentas mais poderosas do Excel:

- Resumem grandes quantidades de dados
- Permitem análises rápidas e flexíveis
- Criam relatórios profissionais automaticamente
- Facilitam a identificação de padrões

**Quando usar**:
- Análise de vendas por região
- Relatórios financeiros
- Controle de estoque
- Análise de performance`,
        formulas: [],
        examples: [],
        duration: 10,
        difficulty: 'intermediário'
      },
      {
        id: 'criando-tabelas-dinamicas',
        title: 'Criando e Personalizando Tabelas Dinâmicas',
        objective: 'Criar relatórios dinâmicos arrastando campos',
        content: `**Como criar uma tabela dinâmica**:

1. Selecione seus dados
2. Vá em Inserir > Tabela Dinâmica
3. Arraste campos para as áreas:
   - **Linhas**: Categorias principais
   - **Colunas**: Subcategorias
   - **Valores**: Dados numéricos a serem analisados
   - **Filtros**: Critérios de filtro

**Dica importante**: Os dados devem estar organizados em formato tabular com cabeçalhos.`,
        formulas: [],
        examples: [],
        duration: 20,
        difficulty: 'avançado'
      }
    ]
  },
  {
    id: 'macros',
    title: 'Capítulo 7: Automatizando Tarefas com Macros',
    description: 'Automatize tarefas repetitivas e ganhe produtividade',
    icon: '🤖',
    color: 'from-teal-500 to-teal-600',
    lessons: [
      {
        id: 'o-que-sao-macros',
        title: 'O que são Macros?',
        objective: 'Entender como as macros podem automatizar seu trabalho',
        content: `**Macros** são sequências de comandos gravados que podem ser executados automaticamente:

- Automatizam tarefas repetitivas
- Poupam tempo significativo
- Reduzem erros humanos
- Aumentam a produtividade

**Exemplos práticos**:
- Formatação automática de relatórios
- Cálculos complexos recorrentes
- Organização de dados
- Criação de botões personalizados`,
        formulas: [],
        examples: [],
        duration: 8,
        difficulty: 'avançado'
      },
      {
        id: 'gravando-macros',
        title: 'Gravando e Executando Macros Simples',
        objective: 'Criar suas primeiras automatizações no Excel',
        content: `**Como gravar uma macro**:

1. Vá em Desenvolvedor > Gravar Macro
2. Dê um nome à macro
3. Execute as ações que deseja automatizar
4. Pare a gravação

**Exemplo prático**: Criar botão "Atualizar"
- Grave as ações de atualização
- Crie um botão na planilha
- Associe a macro ao botão

**Atalho útil**: Alt+F8 para executar macros`,
        formulas: [],
        examples: [],
        duration: 15,
        difficulty: 'avançado'
      }
    ]
  },
  {
    id: 'texto-avancado',
    title: 'Capítulo 8: Funções de Texto Avançadas',
    description: 'CONCATENAR, VLOOKUP/PROCV e manipulação de texto',
    icon: '📝',
    color: 'from-cyan-500 to-cyan-600',
    lessons: [
      {
        id: 'funcoes-texto-intro',
        title: 'Introdução às Funções de Texto',
        objective: 'Dominar a manipulação e limpeza de dados de texto',
        content: `**Funções de texto essenciais**:

- **MAIÚSCULA**: Converte texto para maiúsculas
- **MINÚSCULA**: Converte texto para minúsculas  
- **PRI.MAIÚSCULA**: Primeira letra maiúscula
- **ESQUERDA/DIREITA**: Extrai caracteres específicos
- **SUBSTITUIR**: Troca texto automaticamente

Estas funções são fundamentais para limpeza e organização de dados textuais.`,
        formulas: [
          {
            id: 'maiuscula',
            formula: '=MAIÚSCULA(A1)',
            description: 'Converte texto para maiúsculas',
            example: '"joão" torna-se "JOÃO"'
          },
          {
            id: 'esquerda',
            formula: '=ESQUERDA(A1;3)',
            description: 'Extrai 3 caracteres da esquerda',
            example: '"Excel" retorna "Exc"'
          }
        ],
        examples: [],
        duration: 12,
        difficulty: 'intermediário'
      },
      {
        id: 'concatenar-procv',
        title: 'Função CONCATENAR e VLOOKUP/PROCV',
        objective: 'Juntar textos e fazer pesquisas avançadas',
        content: `**Função CONCATENAR**: Junta textos de várias células

Exemplo: =CONCATENAR(C5;" ";D1)
Se C5="João" e D1="Silva", resultado será "João Silva"

**Função VLOOKUP/PROCV**: Pesquisa valores em tabelas

Sintaxe: =PROCV(valor_procurado; matriz_tabela; núm_índice_col; FALSO)

**Exemplo prático**: 
Procurar ID 102 numa tabela de produtos para retornar "Mouse"
=PROCV(102;A:C;2;FALSO)

Esta função é essencial para cruzar dados entre tabelas.`,
        formulas: [
          {
            id: 'concatenar-exemplo',
            formula: '=CONCATENAR(A1;" ";B1)',
            description: 'Junta nome e sobrenome com espaço',
            example: 'A1="Maria", B1="Santos" = "Maria Santos"'
          },
          {
            id: 'procv-exemplo',
            formula: '=PROCV(A1;Tabela!A:C;2;FALSO)',
            description: 'Procura valor em tabela e retorna da coluna 2',
            example: 'Busca ID e retorna nome correspondente'
          }
        ],
        examples: [
          {
            id: 'busca-produto',
            title: 'Busca de Produto por ID',
            description: 'Encontrar nome do produto usando ID',
            inputs: [
              { label: 'ID do Produto', value: '102', type: 'number' }
            ],
            expectedOutput: 'Produto: Mouse'
          }
        ],
        duration: 18,
        difficulty: 'avançado'
      }
    ]
  }
];

// Função para buscar lições
export const searchLessons = (query: string): Lesson[] => {
  const results: Lesson[] = [];
  const queryLower = query.toLowerCase();
  
  excelModules.forEach(module => {
    module.lessons.forEach(lesson => {
      if (
        lesson.title.toLowerCase().includes(queryLower) ||
        lesson.content.toLowerCase().includes(queryLower) ||
        lesson.objective.toLowerCase().includes(queryLower)
      ) {
        results.push(lesson);
      }
    });
  });
  
  return results;
};

// Função para obter progresso do módulo
export const getModuleProgress = (moduleId: string): number => {
  const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
  const module = excelModules.find(m => m.id === moduleId);
  
  if (!module) return 0;
  
  const totalLessons = module.lessons.length;
  const completedCount = module.lessons.filter(lesson => 
    completedLessons.includes(lesson.id)
  ).length;
  
  return Math.round((completedCount / totalLessons) * 100);
};