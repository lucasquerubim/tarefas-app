# Tarefas App 📱

Aplicativo mobile em **React Native + Expo** que consome uma API própria
(backend separado) para realizar o CRUD (Criar, Listar, Editar e Excluir)
de tarefas.

> Esse app depende do backend **tarefas-api**. Repositório do backend:
> `<COLOQUE_AQUI_O_LINK_DO_REPOSITORIO_DA_API>`

## 📂 Estrutura do projeto

```
tarefas-app/
├── App.js                     # Tela principal (lista + lógica do CRUD)
├── src/
│   ├── api/
│   │   └── taskApi.js         # Funções que chamam a API (fetch)
│   └── components/
│       ├── TaskItem.js        # Item da lista (com editar/excluir/concluir)
│       └── TaskForm.js        # Formulário de criar/editar tarefa
├── app.json
├── babel.config.js
└── package.json
```

## ⚙️ Configuração antes de rodar

Antes de iniciar o app, é necessário configurar o endereço do backend:

1. Abra o arquivo `src/api/taskApi.js`.
2. Troque o IP da constante `API_URL` pelo IP da sua máquina na rede local:
   ```js
   const API_URL = 'http://SEU_IP_AQUI:3000/tasks';
   ```
3. Para descobrir seu IP local:
   - **Windows:** `ipconfig` (campo "IPv4 Address")
   - **Mac/Linux:** `ifconfig` ou `ip a`

   > Importante: o celular (Expo Go) e o computador (onde a API está rodando)
   > precisam estar conectados na **mesma rede Wi-Fi**.

## ▶️ Como executar

1. Certifique-se de que o backend (**tarefas-api**) já está rodando
   (`npm start` na pasta da API).

2. Instale as dependências do app (precisa ter [Node.js](https://nodejs.org/) instalado):
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npx expo start
   ```

4. Escaneie o QR Code com o app **Expo Go** (disponível na Play Store / App Store),
   ou pressione `w` no terminal para abrir no navegador.

## ✅ Funcionalidades

- Listar tarefas
- Cadastrar nova tarefa (título + descrição)
- Editar tarefa existente
- Marcar tarefa como concluída
- Excluir tarefa (com confirmação)

## ☁️ Como subir no GitHub

```bash
git init
git add .
git commit -m "App React Native Expo - CRUD de tarefas"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

## 🛠️ Tecnologias

- React Native
- Expo
- Fetch API (requisições HTTP)
