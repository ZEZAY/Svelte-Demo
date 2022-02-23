# Svelte Demo - Todo App

This project is a todo application, as well as tutorial for SvelteKit framework.

video course: [Full Stack Web Development in the Cloud](https://youtu.be/OUzaUJ3gEug)

original source code:
[gitpod-io/full-stack-web-development](https://github.com/gitpod-io/full-stack-web-development)

## Architecture

The diagram below outlines the high-level architecture and the hosting providers for the web application, API and database.

![image](https://user-images.githubusercontent.com/788827/145879564-e7dc42d6-3055-492b-95d7-902e9a5fad96.png)

## Ephemeral developer environments

The entire course is developed using [Gitpod](https://www.gitpod.io/). For each task, we use an ephemeral developer environment that we dispose of as soon as the task is completed. Environments are fully automated and we never run `npm install` or `npm run dev` manually. We also don't have any code, dependencies, etc installed locally.

## Technology stack

The course leverages the following technologies

**Web application**

[Svelte](https://svelte.dev/) is a compiler to develop highly performant web applications with great developer experience. The application is styled with plain CSS.

**API**

[SvelteKit](https://kit.svelte.dev/) is the library & application framework powered by Svelte. It provides routing, server-side rendering and also enables us to develop a web application that works if Javascript is disabled.

[Prisma](https://www.prisma.io/) is the object-relational mapping (ORM) library that let's us interact with the database. Based on models we define, Prisma generates the database schema and keeps the databsae in sync with our model(s). In addition, it generates a Typescript client we import into our code so that we have type safety when we work with database objects.

**Database**

[Postgres](https://www.postgresql.org/) is our database of choice for the course. However, thanks to Prisma's support for various other databases, it is a matter of changing configuration values to leverage a different database.

**Deployment**

The web application and API are hosted on [Vercel](https://vercel.com/) whereas the database lives on [Railway](https://railway.app/).

## Setup

```bash
# initial SvelteKit framework project
npm init svelte@next .
# choose:
# Skeleton project
# TypeScript -> Yes
# ESLint -> No
# Prettier -> No
```

```bash
npm install
```

Run Server

```bash
npm run dev
```

## Gitpod Configuration

create [.gitpot.yml](.gitpot.yml)

document [here!](https://www.gitpod.io/docs/config-gitpod-file)

## Frontend

### Components file

- in [src/lib](src/lib), create an `.svelte` file (filename = component name)
- import that component to another svelte file (maybe in src/routes)

for example:

create [lib/todo-item.svelte](src/lib/todo-item.svelte), then in [routes/index.svelte](src/routes/index.svelte)

```html
<script>
  // import that component file
  import TodoItem from "$lib/todo-item.svelte";
</script>

<!-- use component -->
<TodoItem />
```

### Override app.html

- in [src/app.html](src/app.html), call %svelte.`tag`%
- replace the `tag` with --head, options, window, body, self, component, or fragment
- in svelte file, add your code under \<svelte:`tag`\> tag

for example:

given %svelte.head% in app.html, then in [routes/index.svelte](src/routes/index.svelte)

```html
<!-- override app.html (base) -->
<svelte:head>
  <title>This is a title</title>
</svelte:head>
```

### Define variable

- in svelte file, define const variables in script
- use {variables_name} in the context

```html
<script>
  // define variables
  const title = "Todos";
</script>

<!-- use variable -->
<h1>{title}</h1>
```

### Stylesheet

- create css file, then import in script
- to apply to every svelte files in routes
  - create [routes/\_\_layout.svelte](src/routes/__layout.svelte)
  - import that stylesheet
  - also call \<slot /\> (recall layout of svelte file)

note. use `:global`, when you want to apply style to all children's in that class

## Config Endpoint

since form in html, only allow GET, POST action

in [svelte.config.js](svelte.config.js)

```js
// add to kit
methodOverride: {
  allowed: ["PUT", "PATCH", "DELETE"];
}
```

then in html form, send POST method to an URL with `_method` param [delete, put, ...]

## Create new Endpoint

in [src/routes](src/routes)

### html endpoint

- create an `.svelte` file (filename = endpoint)

for example: [about-us.svelte](src/routes/about-us.svelte) (contain some html tags) -> http://localhost:3000/about-us

### json endpoint

- create a folder (same as the API name)
- then create `index.json.ts` file under the folder

documents for [kit.svelte Endpoints](https://kit.svelte.dev/docs/routing#endpoints-post-put-patch-delete), [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)

for example: [todos/index.json.ts](src/routes/todos/index.json.ts) -> http://localhost:3000/todos.json

### endpoint with uid

- create `.ts` file using `[uid]` in its name

for example: [todos/[uid].json.ts](src/routes/todos/[uid].json.ts)

## Define a type in typescript

- in [src/app.d.ts](src/app.d.ts)

```ts
// create Todo item
type Todo = {
  created_at: Date;
  text: string;
  done: boolean;
};
```

- when using the type

```ts
// let todos = [];      // array
let todos: Todo[] = []; // Todo array

todos.push({
  created_at: new Date(),
  text: data.get("text"),
  done: false,
});
```

## Connecting API to Webpage

in [index.svelte](src/routes/index.svelte), add a ts script with context="module" (so it running only one time)

```html
<script context="module" lang="ts">
  import type { Load } from "@sveltejs/kit";

  export const load = async ({ fetch }) => {
    const res = await fetch("/todos.json");
    if (res.ok) {
      const todos = await res.json();
      // props -> return to this page body (below)
      return { props: { todos } };
    }

    const { message } = await res.json();
    return {
      error: new Error(message),
    };
  };
</script>
```

in the old script, edit lang to "ts", export the props from new script

```html
<script lang="ts">
  // ...
  export let todos: Todo[];
</script>
```

looping items in the body

```html
{#each todos as todo}
<!-- use variable -->
<TodoItem todo="{todo}" />
<!-- or (when same name) -->
<TodoItem {todo} />
{/each}
```

in [lib/todo-item.svelte](src/lib/todo-item.svelte), add a ts script to get an item from other page

```html
<script lang="ts">
  export let todo: Todo;
</script>

<!-- using same as other normal variables -->
<!-- ex. {todo.text}, {todo.done}, ... -->
```

## Enhance HTML forms

pls, look up git commit!

- create [lib/actions/form.ts](src/lib/actions/form.ts)
- update [todos/\_api.ts](src/routes/todos/_api.ts), to check if headers accept "application/json"
- in [index.svelte](src/routes/index.svelte)

  - add `import { enhance } from "$lib/actions/form"` to module script
  - add processNewTodoResult, processUpdatedTodoResult to another script

    ```ts
    const processNewTodoResult = async (
      res: Response,
      form: HTMLFormElement
    ) => {
      const newTodo = await res.json();
      todos = [...todos, newTodo];
      form.reset();
    };

    const processUpdatedTodoResult = async (res: Response) => {
      const updatedTodo = await res.json();
      todos = todos.map((t) => {
        if (t.uid === updatedTodo.uid) return updatedTodo;
        return t;
      });
    };
    ```

  - in `new` forms, add `use:enhance={{ result:processNewTodoResult }}`
  - in update `TodoItem` to

    ```svelte
    <TodoItem
      {todo}
      processDeletedTodoResult={() => {
        todos = todos.filter((t) => t.uid !== todo.uid);
      }}
      {processUpdatedTodoResult}
    />
    ```

- in [lib/todo-item.svelte](src/lib/todo-item.svelte)

  - add into script

    ```ts
    import { enhance } from "$lib/actions/form";

    export let processDeletedTodoResult: (res: Response) => void;
    export let processUpdatedTodoResult: (res: Response) => void;
    ```

  - in `update text` forms, add `use:enhance={{ result:processUpdatedTodoResult }}`
  - in `delete` forms, add `use:enhance={{ result:processDeletedTodoResult }}`
