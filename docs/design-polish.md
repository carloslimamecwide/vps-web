# Polimento visual do devops.guia

Direção validada em 17 de novembro de 2026. Aplicação em modo de polimento:
mantêm-se o tema escuro, o âmbar, a IBM Plex, as cinco áreas e a ordem do conteúdo.

- Produto: guia prático de DevOps para quem está a começar
- Caráter: didático, técnico, tranquilo
- Mundo: manual de laboratório e terminal
- Momentos: comandos legíveis e progresso em âmbar
- Assinatura: numeração consistente nos capítulos e na navegação

## Auditoria

- Barra lateral, breadcrumb e etiquetas: texto pequeno, maiúsculas e tracking excessivo
- Índice e metadados: contraste insuficiente para uma leitura confortável
- Linhas, controlos e blocos de código: espaçamentos e dimensões irregulares
- Lista “Como usar”: o flex dividia títulos e explicações em colunas involuntárias
- Conteúdo: itálicos e tracking negativo em títulos pequenos
- Movimento: transições genéricas e animações de largura nas barras de progresso
- Menu móvel e cabeçalhos expansíveis: controlos sem símbolo visível
- Aprendizagem: o botão de reposição estava recortado dentro da barra de progresso

## Passes aplicados

1. **Espaçamento.** Normalização em passos de 4 px, com nudges de 2 px nos
   controlos pequenos. Navegação com linhas de 36 px em desktop e 44 px em móvel;
   separação de 40–48 px entre os blocos de leitura.
2. **Cor.** Mantida a rampa escura quente e o acento âmbar. Texto secundário e
   metadados mais claros; superfícies e bordas discretas. O verde mantém significado
   nos comandos e no estado concluído.
3. **Ícones.** Menu, fechar e chevron com o mesmo traço de 1,5 px e caixa de 18 px.
   Os indicadores expansíveis passam a mostrar o estado de abertura.
4. **Texto.** Mantidos o conteúdo pedagógico e os nomes do produto. Etiquetas sem
   transformação em maiúsculas; descrições curtas do mapa sem ponto final.
5. **Tipografia.** IBM Plex Sans e Mono preservadas. Título de 44/48 px em desktop
   e 36/40 px em móvel; corpo da introdução a 16/28 px. Metadados com pelo menos
   12 px, números tabulares, pesos entre 400 e 600, sem itálicos de ênfase.
6. **Layout.** Mantida a estrutura de barra lateral e área de leitura. A lista
   “Como usar” tem uma coluna própria para a numeração e outra para todo o texto.
   Grelhas, comandos e tabelas adaptam-se à largura disponível.
7. **Detalhes.** Raios coerentes nos controlos, estados de foco e hover, menu móvel
   identificado e fecho com Escape. O botão de reposição sai de dentro da barra.
8. **Visual.** O conteúdo técnico, os comandos e o progresso continuam a ser os
   momentos visuais. Não se acrescentaram imagens nem foi escrito um prompt de imagem.
9. **Movimento.** Uma curva de easing, feedback por cor e uma entrada curta dos
   painéis. Removidas transições genéricas e animações de largura; respeitada a
   preferência de movimento reduzido.

## Verificação

- `npm run lint`, `npm run typecheck` e `npm run build`: concluídos sem erros
- Cinco áreas verificadas a 320, 390, 768, 1024 e 1440 px, sem overflow da página
- Abertura de secções, navegação pelo índice, progresso após recarregar e feedback
  de cópia verificados num contexto de navegador isolado
- Menu móvel, fecho por Escape e reposição do foco verificados
- Comparação visual em desktop e móvel, sem acrescentar imagens
- Contraste dos metadados na superfície elevada: 5,09:1; texto secundário no
  painel: 8,52:1; botão principal: 9,79:1

Método: [unslop](https://heydamir.design/unslop), criado por Damir Sokolovsky
([@heydamir](https://x.com/heydamir)), CC BY 4.0.
