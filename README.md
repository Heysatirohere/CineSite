# CineLite - Desafio Técnico Frontend

Aplicação web de catálogo de filmes que permite buscar e visualizar detalhes de filmes utilizando a API do The Movie Database (TMDB). Projeto desenvolvido como parte do desafio técnico para  Frontend.

**[➡️ Acesse o Deploy Funcional Online!](https://cinesite.netlify.app/)**

---

## 🚀 Como rodar o projeto localmente

Siga os passos abaixo para executar o CineLite em sua máquina:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Heysatirohere/CineSite.git
    # (Ou o link do seu repositório)
    cd CineSite/cinelite
    # (Navegue para a pasta do projeto)
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    * Crie um arquivo chamado `.env` na raiz da pasta `cinelite`.
    * Adicione sua Chave da API (API Key) do The Movie Database (TMDB) e a URL base da API:
    ```env
    VITE_API_KEY=SUA_CHAVE_DE_API_AQUI
    VITE_API_URL=https://api.themoviedb.org/3
    ```
    *(Você pode obter uma chave gratuitamente no site do [TMDB](https://www.themoviedb.org/)).*

4.  **Execute a aplicação em modo de desenvolvimento:**
    ```bash
    npm run dev
    ```


---

## 🛠️ Stack Utilizada

* **Framework/Biblioteca Principal:** React (com Vite para build)
* **Roteamento:** React Router DOM
* **Estilização:** CSS Modules
* **Busca de Dados (Data Fetching):** TanStack Query (React Query)
* **Requisições HTTP:** Axios
* **Animações:** Framer Motion
* **API:** The Movie Database (TMDB)
* **Deploy:** Netlify

---

## 🧠 Decisões Técnicas Principais

* **Vite:** Escolhido como build tool pela sua velocidade de desenvolvimento (HMR rápido) e setup simplificado para React.
* **CSS Modules:** Adotados para componentização de estilos, evitando conflitos de nomes e mantendo o CSS organizado junto à lógica do componente (na pasta `Styles`), facilitando a manutenção e a aplicação de temas.
* **Debounce na Busca:** Implementado através de um hook customizado (`useDebounce`) para otimizar a experiência de busca no dropdown de sugestões, evitando requisições excessivas à API a cada tecla digitada.
* **Framer Motion:** Utilizado para adicionar transições suaves (fade-in/out) entre as páginas, melhorando a experiência do usuário e cobrindo o diferencial de animações.
* **Variáveis CSS e `data-theme`:** O sistema de tema Claro/Escuro foi implementado usando variáveis CSS globais definidas no `:root` e sobrescritas por um seletor de atributo `[data-theme='dark']` no `body`, permitindo a troca de tema de forma eficiente e com transições CSS.
* **`useSearchParams` (React Router):** Adotado para persistir o estado da página da paginação na URL, melhorando a experiência do usuário ao navegar para frente e para trás no histórico do navegador.

---

## ✨ Pontos de Melhoria e Aprendizados

Este desafio foi uma ótima oportunidade de aprendizado, especialmente em áreas que eu não havia explorado profundamente antes:

* **Animações de Página:** Implementar as transições suaves entre rotas com **Framer Motion** foi um aprendizado chave, configurando `AnimatePresence` e `variants` para melhorar a experiência do usuário.
* **Otimização de Busca (Debounce):** Criar e aplicar o hook customizado `useDebounce` foi a primeira vez que implementei essa técnica para evitar requisições excessivas à API durante a digitação.
* **Manipulação de Commits no Git:** Precisei aplicar um commit específico de um branch para outro, o que me levou a aprender e utilizar o comando `git cherry-pick` pela primeira vez, uma ferramenta útil para gerenciamento granular do histórico.

**Possíveis Próximos Passos (Pontos de Melhoria):**

* **Testes:** Adicionar testes unitários (especialmente para o `useDebounce`) e de integração aumentaria a confiança no código.
* **Componentização:** Refinar a `DetailsPage` em componentes menores.
* **Tratamento de Erros:** Detalhar as mensagens de erro da API.
* **Otimização de Imagens:** Implementar lazy loading.

---

**[Tratamento da API Key]: A chave da TMDB é de acesso público/leitura e é exposta no cliente. Para ocultá-la em um ambiente de produção real, seria necessário implementar uma camada de proxy/servidor serverless (ex: Netlify Functions) para fazer o fetch no backend.**
