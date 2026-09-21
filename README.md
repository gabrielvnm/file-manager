# FileManager

Aplicação Full Stack para gerenciamento e compartilhamento de arquivos, construída usando Angular v14, Express e SQLite.

## Deploy

O deploy do projeto foi realizado na plataforma Render, com a criação de um Web Service para o Backend e um Static-Page para o front. A URL do frontend pode ser acessada em https://filemanager-p701.onrender.com/. O plano gratuito do Render tira os serviços do ar após 15 minutos de inatividade, o que pode fazer com que o primeiro acesso ao site tenha diversos erros, pois front e back não são iniciados exatamente ao mesmo tempo, e podem não concluir a inicialização juntos. Caso isso aconteça, aguarde entre um e dois minutos e tente novamente. Isso deve dar tempo o suficiente para os serviços se iniciarem.

Outra consequência dos servidores serem desligados é que a persistência de dados é apenas parcial, mas essa questão pode ser resolvida com um plano de deploy profissional. 

## Funcionalidades

A aplicação permite o upload e download de arquivos no formato JPEG, PNG e PDF, e a adição de comentários à cada arquivo. A lista de arquivos pode ser filtrada por tipo e ordenada por número de comentários ou data de postagem. Para a escala atual do projeto, não foi implementada paginação na lista de arquivos, nem controle de acesso de usuários. Há um limite de tamanho de 50mb por arquivo, e o total de uploads é limitado pela plataforma de deploy escolhida. Por essa razão, foi tomada a decisão de não implementar um limite na própria aplicação. A persistência de dados é parcial, visto que os servidores da plataforma de deploy não permitem que os dados sejam mantidos entre as sessões, mas isso é uma limitação da plataforma ASIDKUJHASIDFUH e não da aplicação.


## Frontend

O frontend foi construído usando Angular v14, e a arquitetura segue algumas diretrizes do Angular por boas práticas. Algumas diretrizes foram intencionalmente evitadas, em virtude do tamanho reduzido do projeto e do prazo informado para a entrega.

## Backend

O backend foi construído usando Express e TypeScript. A arquitetura segue um padrão em camadas, com os endpoints e lógica de negócio divididas em controllers e services, bem como o roteamento e validações de payloads. Isso mantém cada arquivo com um escopo bem determinado, o que garante que possíveis manutenções do código por uma equipe ou a implementação de novas funcionalidades sejam tarefas mais simples e ágeis.

# Banco de dados

O banco de dados escolhido foi o SQLite, conectado ao Express usando a biblioteca better-sqlite3. A modelagem do banco é simples, contendo apenas duas entidades: os arquivos e os comentários, que possuem uma relação de um-para-muitos. Para realizar propriamente o gerenciamento de arquivos pela aplicação, a tabela de arquivos no banco de dados contém apenas os metadados dos arquivos, e não o conteúdo em si. Os arquivos propriamente ditos são gravados na pasta /uploads, após passarem pelo middleware multer, que atribui a eles um UUID, permitindo que sejam conectados aos itens da tabela de arquivos. O banco de dados SQLite também permite o armazenamento de arquivos como Binary Large Objects(Blobs), mas essa opção tornaria o banco de dados exponencialmente maior e mais ineficiente com cada upload. Por essa razão, foi tomada a decisão de manter os arquivos em um local separado.

## Melhorias futuras

Diversas melhorias são possíveis para a aplicação. Algumas das mais óbvias seriam a implementação de controle de acesso de usuários e paginação na lista de arquivos e comentários, duas melhorias que podem ser facilmente implementadas com um pouco mais de tempo de desenvolvimento. Além dessas, adicionar uma funcionalidade drag-n-drop para os arquivos e uma pré-visualização também são passos naturais. No momento, a aplicação pode ser considerada num estágio de protótipo. Para ser utilizada em situações reais de compartilhamento de arquivos entre uma equipe, a primeira necessidade seria modificar a ferramenta de deploy para uma mais robusta. Caso isso venha a acontecer, porém, algumas alterações importantes seriam necessárias, principalmente por questões de segurança.