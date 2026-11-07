/* =====================================================================
   STACKS (carrossel de ferramentas)
   =====================================================================

   COMO ADICIONAR UMA FERRAMENTA NOVA
   1. Coloque a imagem (PNG com fundo transparente) na pasta img/.
   2. Copie uma linha { ... } da lista abaixo e cole no lugar onde ela deve aparecer.
   3. Troque "name" (nome, usado na acessibilidade) e "src" (caminho da imagem).
   Pronto: o carrossel se reorganiza sozinho, em qualquer tamanho de tela,
   e continua infinito sem buracos.

   COMO REMOVER OU TROCAR A ORDEM
   Apague a linha, ou mude a posição dela na lista.

   DICAS
   - Todas as imagens aparecem com a mesma altura (42px no computador, 32px no celular),
     então ícones horizontais ficam mais largos que os quadrados. Isso é normal.
   - Use nomes de arquivo respeitando maiúsculas/minúsculas (em hospedagem Linux
     "Figma.png" e "figma.png" são arquivos diferentes).
   - A velocidade do carrossel é a mesma não importa quantos ícones existam
     (constante STACKS_SPEED no js/script.js).
   ===================================================================== */

window.STACKS = [
  { name: 'Photoshop',     src: 'img/Photoshop.png' },
  { name: 'Illustrator',   src: 'img/Illustrator.png' },
  { name: 'Lightroom',     src: 'img/Lightroom.png' },
  { name: 'Premiere',      src: 'img/Premiere.png' },
  { name: 'After Effects', src: 'img/After Effects.png' },
  { name: 'Figma',         src: 'img/Figma.png' },
  { name: 'Visual Studio', src: 'img/Visual Studio.png' },
  { name: 'JavaScript',    src: 'img/Js.png' },
  { name: 'Canva',         src: 'img/Canva.png' },
  { name: 'ChatGPT',       src: 'img/Chat GPT.png' },
  { name: 'Veo 3',         src: 'img/Veo 3.png' },
  { name: 'DeepSeek',      src: 'img/Deepseek.png' },
  { name: 'Claude',        src: 'img/Claude.png' },
  { name: 'Gemini',        src: 'img/Gemini.png' },
  { name: 'Lovable',       src: 'img/lovable.png' }

  /* ↓ Para adicionar outra ferramenta, coloque uma vírgula depois da linha acima
       e cole aqui uma nova linha: { name: 'Nome', src: 'img/Arquivo.png' } */
];
