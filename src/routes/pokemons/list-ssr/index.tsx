import { component$, useComputed$ } from '@builder.io/qwik';
import { Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { PokemonListResponse, Result } from '~/interfaces';

export const usePokemonList = routeLoader$<Result[]>( async ({ query, redirect, pathname}) => {
	const offset = Number(query.get('offset') || '0')
	console.log(offset)
	
	if (offset < 0 ) throw redirect(301, pathname)
	if ( isNaN(offset) ) throw redirect(301, pathname)
	if (offset > 100) throw redirect(301, pathname)
	
	const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
	const data = await resp.json() as PokemonListResponse

	return data.results
})

export default component$(() => {

	const pokemons = usePokemonList()
	const location = useLocation()

	const currentOffset = useComputed$<number>(() => {
		const offsetString = new URLSearchParams(location.url.search)
		const offset = Number(offsetString.get('offset'))
		return offset
	})

	return (
		<>
			<div class='flex flex-col'>
				<span class='my-5 text-5xl'>Status</span>
				<span>Current offset: {currentOffset.value} </span>
				<span>Is navigating: {location.isNavigating ? 'Yes' : 'No'}</span>
			</div>

			<div class='mt-10'>
				<Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class='btn btn-primary mr-2'>Previous</Link>
				<Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class='btn btn-primary mr-2'>Next</Link>
			</div>

			<div class="grid grid-cols-6 mt-5 gap-1">
				{
					pokemons.value.map(({name}) => (
						<div key={name}class='m-5 flex flex-col justify-center items-center'>
							<span class='capitalize'> {name} </span>
						</div>
					))
				}
			</div>
		</>
	);
});

export const head: DocumentHead = {
	title: 'List - SSR',
	meta: [
		{
			name: 'description',
			content: 'Qwik site of pokemons in SSR mode',
		},
	],
};
