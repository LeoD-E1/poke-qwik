import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';

// RouteLoader$ permite cargar o ejecutar alguna funcion antes que se renderize el componente
export const usePokemonId = routeLoader$<number>(({ params, redirect }) => {
	// console.log(params)
	const id = Number(params.id)
	if ( isNaN(id) ) redirect(301, '/')
	if (id > 1000) redirect(301, '/')
	if (id <= 0) redirect(301, '/')
	
	return id
})

export default component$(() => {
	const pokemonID = usePokemonId()
	return (
		<>
			<PokemonImage id={pokemonID.value} />
		</>
	);
});
