# 🎭 Academia RPG

Plataforma de **fichas e gestão de RPG de mesa** com estética inspirada em *Danganronpa*: interface sombria, futurista, com detalhes em neon (rosa, roxo e azul) e clima de investigação e julgamento.

Sem regras presas a um sistema específico: atributos, status, perícias, poderes e itens são todos configuráveis.

## Recursos

| Área | O que faz |
|---|---|
| **ID Cards** | Lista de ID Cards (fichas) com foto, Talento Supremo, classe e busca |
| **Ficha** | Dados básicos, hexágono de 6 atributos (CRI, MAN, COM, PER, INT, PRE) editáveis e barras de status (HP, Stamina, Mental) com botões «‹›» |
| **Perícias** | Atributo relacionado, treino, bônus e rolagem de D20 com um clique |
| **Talentos, Evidências, Itens** | Listas em sanfona; o botão “Adicionar da Biblioteca” copia o que o Mestre cadastrou |
| **Biblioteca (só Mestre)** | Cadastro de talentos, evidências e itens disponíveis para todas as fichas |
| **Combate** | Dados (D4–D20 e personalizado), histórico e ordem de turno |
| **Investigação / Julgamento** | Pistas, evidências, suspeitos, argumentos e provas |
| **Campanhas, Ameaças, Homebrew, Patente** | Gestão de campanhas, NPCs e monstros, patentes |
| **Permissões** | Mestre vê segredos e cria conteúdo; Jogador edita só a própria ficha |
| **Qualidade de vida** | Salvamento automático, histórico de versões, busca, sons opcionais e layout responsivo |

## Como usar

É um site estático em um único arquivo, sem build.

1. Abra `index.html` no navegador, ou
2. Publique pelo GitHub Pages (Settings → Pages → branch `main`).

Os dados ficam salvos no `localStorage` do navegador.

## Estado atual e limitações

- Permissões Mestre/Jogador são um alternador na interface; **não há login nem sincronização** entre usuários ainda.
- Veja o plano em [docs/ROADMAP.md](docs/ROADMAP.md).

## Licença

MIT. Veja [LICENSE](LICENSE). Projeto de fãs, sem afiliação com os criadores de Danganronpa.
