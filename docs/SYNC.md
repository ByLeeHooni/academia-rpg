# Sincronização em tempo real (Supabase)

Quando alguém altera uma ficha, quem está na mesma sala vê a mudança na hora, sem recarregar. Sem esta configuração o site continua funcionando no modo local.

## Configurar (cerca de 5 minutos, plano gratuito)

1. Crie um projeto em <https://supabase.com>.
2. Em **SQL Editor**, cole e execute o conteúdo de [`supabase/schema.sql`](../supabase/schema.sql).
3. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public**.
4. Edite [`js/config.js`](../js/config.js):
   ```js
   window.ACADEMIA_CONFIG = { supabaseUrl: "https://SEU-PROJETO.supabase.co", supabaseKey: "SUA-CHAVE-ANON" };
   ```
5. Publique (commit na `main`). No topo do site aparecerá o campo **Sala**: todos digitam o mesmo código e passam a compartilhar tudo.

## Como funciona

- Uma tabela `docs (room, key, data)`: cada ficha é uma linha (`char:<id>`), mais `meta` (campanhas, ameaças, biblioteca, patentes), `pend` (avisos do Mestre) e `log`.
- Cada alteração envia só o que mudou. As demais pessoas recebem por Realtime e a tela é atualizada, mantendo o cursor de quem está digitando.
- O log de atividades é **mesclado** entre pessoas; o resto vale a última alteração.
- Ao entrar numa sala que já tem dados, os dados locais são substituídos pelos da sala (cópia guardada em `acad2_antes_da_sala` no navegador).
- Quem trabalha sem internet continua; as alterações sobem quando a conexão volta.

## Segurança

A chave `anon` é pública e as políticas do `schema.sql` liberam leitura e escrita. Quem souber o código de uma sala consegue ler e editar. **Use códigos longos e difíceis de adivinhar.** Para proteger de verdade (login, Mestre por campanha), o próximo passo é o Supabase Auth com políticas por usuário.

## Limites conhecidos

- Duas pessoas editando o **mesmo campo** ao mesmo tempo: vale a última alteração.
- O fundo, o som e o modo (Mestre/Jogador) são locais de cada pessoa.
