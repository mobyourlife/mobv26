# Mob Your Life v2.6

**Codinome:** Jet Turtle.

A manutenção na versão anterior do Mob Your Life está insustentável. Os scripts Grunt do Kraken presentes no Core 2.5 apresentam erros frequentes, as views em Jade e os controllers mal estruturados do Chest 2.0 são nojentos, e a API 1.0 é subutilizada. A integração com a Realtime Updates foi um fiasco devido a sua instabilidade, mas isto não quer dizer que não temos como tirar proveito desta API.

O objetivo do projeto Jet Turtle é tornar todo processo mais inteligente. Não há necessidade de ficar consultando a API do Facebook em todo momento para verificar atualizações, assim como é possível armazenar o conteúdo mais recente em cache em arquivos JSON no S3 para que o site seja disponibilizado normalmente mesmo em down-time do back-end.

## Principais requisitos

* Testes automatizados básicos.
* Front-end completamente estática com back-end isolado.
* App cache manifest para HTML5.
* Cache dos dados mais recentes no local storage.
* Eager Loading dos dados mais recentes de todas as páginas para tornar a experiência de navegação muito mais rápida.
* Preload das imagens.
* Builds personalizadas do Bootstrap para minimizar o tamanho das páginas.
* Serviço de Lazy Sync que irá sincronizar com o Facebook sob demanda para evitar sobrecarga de processamento.
* Página de saúde dos serviços.
* Gravação de eventos de logs, principalmente erros.
* Geração de métricas e dashboard com visualização das mesmas.
* Envio automatizado de SMS em caso de falhas graves.
* Configuração do Monitis para redundância do monitoramento.

## Arquitetura

O lema da arquitetura do Jet Turtle é dividir para conquistar. Porém, esta divisão deve ter ordem:

* Desacoplar completamente o front-end do back-end.
* Desacoplar os serviços por contexto de responsabilidades. Um serviço será formado por um conjunto de controllers com um contexto em comum.
* Concentrar as regras de negócio em uma biblioteca comum a todos os serviços.
* Concentrar as definições de dados em uma biblioteca comum a todos os serviços.

## Serviços

Ideia para divisão dos serviços:

* **Garden:** Página de marketing do Mob Your Life. É responsável por chamar a atenção dos visitantes a entrarem no sistema. Não tem nenhuma funcionalidade além de marketing.
* **Health:** Página de saúde dos serviços. É responsável por exibir o estado dos serviços, incluindo uptime, downtime e manutenções programadas.
* **API:** Serviço de interface para manipulação de dados. É responsável por servir todas as formas permitidas de manipulação de dados, implementando as regras de negócio do projeto.
* **ngLib:** Biblioteca para consumo da API. É responsável por servir de interface direta com as aplicações AngularJS.
* **Login:** Serviço exclusivo para login social. É responsável por se comunicar com as redes sociais integradas para autenticar e autorizar os usuários, para então retornar ao serviço anterior.
* **Dashboard:** Página de cadastro e operações administrativas. É responsável por administrar os sites, domínios e cobranças de cada usuário, além de enviar chamados de suporte.
* **Living:** Site dos usuários. É responsável por renderizar o site de cada um dos usuários conforme as configurações e conteúdo disponível.
* **Background:** Serviço de agendamento de tarefas. É responsável por avaliar condições do banco de dados e disparar tarefas específicas para cada condição. As tarefas vão desde enviar emails transacionais logo após o cadastro de um usuário até sincronizar as pequenas e grandes partes do Facebook.
* **Cache:** Serviço de geração de cache. É responsável por selecionar o conteúdo necessário do banco de dados para gerar arquivos estáticos em JSON e enviá-los para o S3.
* **Static:** Armazenamento estático no S3. É responsável por hospedar todos os recursos estáticos dos sites dos usuários, para reduzir o acesso ao banco de dados e à API do Facebook. Armazena os documentos de domínios, descrições das fanpages, feeds, álbuns, fotos, vídeos, e tudo mais o que estiver sincronizado, além de cópia das imagens de todos os posts sincronizados. Todo o conteúdo está pronto ser consultado rapidamente a qualquer momento.