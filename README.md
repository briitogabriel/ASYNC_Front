## Async Medical

> Projeto desenvolvido usando React, Bootstrap e Json-Server.

O Async é um software de gestão médica desenvolvida para auxiliar na administração e organização de hospitais.

##### Objetivo principal

O objetivo principal é oferecer uma plataforma que simplifique processos de atendimento, gerenciamento de consultas, exames e prontuários de paciente.

##### Funcionalidades Principais

- Cadastro e gerenciamento de pacientes
- Cadastro e gerenciamento de exames
- Cadastro e gerenciamento de consultas
- Cadastro e gerenciamento de dietas
- Cadastro e gerenciamento de exercicios
- Cadastro e gerenciamento de medicamentos
- Dashboard com estatísticas da quantidade de pacientes cadastrados, consultas e exames realizados
- Página e listagem de prontuários

## Pré Requisitos

- NodeJS 18

## Instalação

1. Clone o repositório: `git@github.com:FullStack-Trindade/M3P-FrontEnd-Squad4.git`
2. Acesse o diretório do projeto: `cd M3P-FrontEnd-Squad4`
3. Instale as dependências: `npm install`
4. Renomeie o arquivo `.env.example` para `.env` e insira as configurações de rota do backend conforme preferência
5. Inicie o projeto com o comando: `npm run dev`

## Uso

Após a instalação e configuração, acesse a aplicação pelo navegador usando o endereço `http://localhost:5173/usuarios/login`. Faça o login com as credenciais padrão (e-mail: `admin@asynclab.com`, senha: `admin123`)

## Melhorias a serem aplicadas
- Deveríamos implementar a inclusão da Foto do paciente para agilizar atendimentos emergenciais em que o paciente não estivesse responsivo;
- Juntamente com a foto, implementar uma busca por reconhecimento facial onde pudesse ser usado um scanner pra buscar no sistema o paciente a ser atendido;
- Feedback de atendimento para médicos, onde os pacientes pudessem registrar elogios/reclamações de seus respectivos atendimentos e assim deixar o registro para futuros pacientes.
- Feedback de atendimento para pacientes, onde os médicos pudessem relatar uma breve descrição do atendimento, se o paciente foi receptivo ao tratamento, se foi dificil indicar tratamento pelo comportamento do paciente e assim ser possível que o próximo médico a atende-la esteja pronto e preparado para as dificuldades que possam vir a acontecer.
