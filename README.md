# 🎭 Academia RPG

Plataforma de **fichas e gestão de RPG de mesa** com estética inspirada em *Danganronpa* (preto e branco, com Monokumas ao fundo). Sem regras presas a um sistema: atributos, barras de status, perícias, talentos, evidências e itens são configuráveis.

## Recursos

| Área | O que faz |
|---|---|
| **ID Cards** | Fichas com foto, Talento Supremo, Status de Vida, hexágono de atributos (CRI, MAN, COM, PER, INT, PRE), barras animadas e perícias com rolagem de D20 |
| **Abas da ficha** | Confronto (dados e ataques), Talentos, Evidências, Itens, Amizade, Julgamento e Perfil |
| **Amizade** | Até 10 corações por vínculo; o Mestre define as habilidades de cada ficha e libera (ou recusa) quando o jogador atinge os corações; o nome só aparece depois de liberada |
| **Campanhas** | Capa, descrição, jogadores, combates, Escudo do Mestre e **Log** agrupado (só Mestre) com filtros |
| **Biblioteca (Mestre)** | Talentos Supremos, talentos, evidências e itens que os jogadores adicionam às fichas |
| **Tempo real** | Alterações aparecem para os outros sem recarregar a página (veja [docs/SYNC.md](docs/SYNC.md)) |

## Estrutura

```
index.html          página única que carrega os arquivos abaixo
css/                base.css · theme.css · components.css
js/
  config.js         chaves da sincronização (opcional)
  utils.js          DOM, escape, campos, sons, notificações, dados, menus suspensos
  data.js           atributos, ficha padrão, listas editáveis, rótulos
  state.js          estado, salvamento, versões, migrações, log de atividades, acesso
  ui-ficha.js       ficha: sanfonas, abas, amizade/corações, janela da biblioteca
  ui-campaign.js    campanha: log agrupado, avisos do Mestre
  pages.js          páginas (ID Cards, campanhas, ameaças, biblioteca, patentes, ficha)
  render.js         renderização, animações das barras e rotas
  actions.js        ações dos botões e eventos globais
  background.js     fundo animado
  sync.js           sincronização em tempo real (Supabase) e entre abas
  main.js           inicialização
assets/monokuma.png imagem do fundo
supabase/schema.sql tabela usada na sincronização
tools/build.py      gera dist/academia.html (arquivo único)
docs/               ROADMAP.md · SYNC.md
```

Os scripts são clássicos (sem build obrigatório) e compartilham o mesmo escopo; a **ordem** dos `<script>` em `index.html` importa.

## Como usar

- **Publicado:** GitHub Pages, branch `main`.
- **Local:** sirva a pasta (`python3 -m http.server`) e abra `http://localhost:8000`.
- **Arquivo único:** `python3 tools/build.py` gera `dist/academia.html`.

Sem configuração, os dados ficam no `localStorage` do navegador (e sincronizam entre abas do mesmo navegador). Para várias pessoas em dispositivos diferentes, configure o Supabase em [docs/SYNC.md](docs/SYNC.md).

## Limitações

- Não há login: "Mestre" e "Jogador" são modos da interface e a proteção de acesso é visual. Na sincronização, o **código da sala** funciona como senha compartilhada, sem segurança real. Autenticação é o próximo passo ([ROADMAP](docs/ROADMAP.md)).
- Projeto de fãs, sem afiliação com os criadores de Danganronpa.

## Licença

MIT. Veja [LICENSE](LICENSE).
