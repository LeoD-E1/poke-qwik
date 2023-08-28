import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

export default component$(() => {
	const loc = useLocation();
	return (
		<>
			<PokemonImage id={Number(loc.params.id)} />
		</>
	);
});
