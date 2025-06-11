# ⏱️ Chronos Pomodoro

Aplicação desenvolvida como parte do curso de **React 19** ministrado por
[Luiz Otávio Miranda](https://www.udemy.com/user/luiz-otavio-miranda/) na Udemy. O
**Chronos Pomodoro** é um timer de produtividade baseado na técnica Pomodoro,
com funcionalidades modernas como salvamento em `localStorage`, uso de
`Web Worker`, notificações com `React Toastify`, estilização com `CSS Modules` e
implementado com **TypeScript**.

## 🔗 Produção

Acesse a versão hospedada em produção:

[Chronos Pomodoro](https://chronos-pomodoro-drab.vercel.app/)

---

## 🚀 Funcionalidades

-   ⏳ Timer configurável para ciclos de Pomodoro
-   🔀 Alternância automática entre ciclos de foco e descanso
-   📀 Salvamento automático do estado no `localStorage`
-   🧠 Gerenciamento eficiente de estado com React (`useState`)
-   👷 Execução do temporizador via `Web Worker` para evitar travamentos
-   🔔 Notificações com `React Toastify` (ex: início e fim de ciclos)
-   🎨 Estilização modular com `CSS Modules`
-   💡 Desenvolvido em **TypeScript** para melhor manutenção e segurança de
    tipos

## 🧰 Tecnologias Utilizadas

-   [React 19](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [CSS Modules](https://github.com/css-modules/css-modules)
-   [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
-   [React Toastify](https://fkhadra.github.io/react-toastify/)
-   [localStorage API](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)

## 📦 Instalação

```bash
git clone https://github.com/GabrielHenrique16y/Chronos-pomodoro.git

cd Chronos-pomodoro

npm install

npm run dev
```

> ⚠️ É necessário ter o [Node.js](https://nodejs.org/) e o
> [npm](https://www.npmjs.com/) instalados.

## 📁 Estrutura de Pastas (resumo)

```bash
src/
├— adapters/            
├— assets/            
├— components/       
├— contexts/       
├— models/            
├— pages/            
├— routers/            
├— styles/        
├— templates/            
├— utils/            
├— workers/          
├— App.tsx            
└— main.tsx           
```

## ✅ Aprendizados

Durante o desenvolvimento deste projeto, foram praticados os seguintes
conceitos:

-   Uso prático do React 19 com gerenciamento de estado moderno
-   Modularização e componentização
-   Utilização do `Web Worker` para processos assíncronos
-   Persistência de dados com `localStorage`
-   Notificações e UX com `React Toastify`
-   Tipagem com TypeScript
-   Organização de estilos com `CSS Modules`
-   Roteamento com `React Router`

## 📚 Curso

Projeto desenvolvido durante o curso:
**[Curso de React JS 19 e Next.js 15](https://www.udemy.com/course/curso-de-reactjs-nextjs-completo-do-basico-ao-avancado/)
— por Luiz Otávio Miranda**

## 📝 Licença

Este projeto é apenas para fins de estudo. Consulte a licença do curso original
para mais detalhes.

---

Feito com ❤️ por Gabriel Henrique
