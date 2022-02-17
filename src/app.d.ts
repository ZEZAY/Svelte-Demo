/// <reference types="@sveltejs/kit" />

type Todo = {
	created_at: Date;
	text: string;
	done: boolean;
}

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {}

	interface Platform {}

	interface Session {}

	interface Stuff {}
}
