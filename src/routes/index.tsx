/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
	const pokemonId = useSignal(1); // Primitivos
	const isBack = useSignal<boolean | undefined>(false);
	const isVisible = useSignal<boolean | undefined>(false);

	const changePokemonId = $((value: number) => {
		if (pokemonId.value + value <= 0) return;

		pokemonId.value += value;
	});

	return (
		<>
			<span class="text-2xl">Simple finder</span>
			<span class="text-9xl"> {pokemonId} </span>
			<PokemonImage
				id={pokemonId.value}
				isBack={isBack.value}
				isVisible={isVisible.value}
				clickeable
			/>
			<div class="mt-2">
				<button
					onClick$={() => changePokemonId(-1)}
					class={`btn btn-primary mr-2 ${pokemonId.value === 1 && 'disabled'}`}
					disabled={pokemonId.value === 1}
				>
					{'<'} Previous
				</button>
				<button
					onClick$={() => changePokemonId(1)}
					class="btn btn-primary mr-2"
				>
					Next {'>'}
				</button>
				<button
					onClick$={() => (isBack.value = !isBack.value)}
					class="btn btn-primary mr-2"
				>
					Flip
				</button>
				<button
					onClick$={() => (isVisible.value = !isVisible.value)}
					class="btn btn-primary "
				>
					{isVisible.value ? 'Hide' : 'Reveal'}
				</button>
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'PokeQwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site of pokemons',
		},
	],
};
