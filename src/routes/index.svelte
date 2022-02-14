<script>
  // import that component file
  import TodoItem from "$lib/todo-item.svelte";

  // define variables
  const title = "Todo"
</script>

<!-- override app.html (base) -->
<svelte:head>
    <title>{title}</title>
</svelte:head>

<!-- use variable -->
<h1>{title}</h1>

<form action="" method="">
  <input type="text" name="text" aria-label="Add a todo" placeholder="+ tap to add a todo"/>
</form>

<!-- use component -->
<TodoItem />
<TodoItem />
<TodoItem />
