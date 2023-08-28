import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
	return (
		<>
			<h1>Hola Client</h1>
		</>
	);
});

export const head: DocumentHead = {
	title: 'List - Client',
	meta: [
		{
			name: 'description',
			content: 'Qwik site of pokemons in Client mode',
		},
	],
};
