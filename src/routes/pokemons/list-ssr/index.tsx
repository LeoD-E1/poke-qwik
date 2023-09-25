import { component$, useComputed$ } from '@builder.io/qwik'
import {
  Link,
  type DocumentHead,
  routeLoader$,
  useLocation,
} from '@builder.io/qwik-city'
import { PokemonImage } from '~/components/pokemons/pokemon-image'
import { getSmallPokemons } from '~/helpers/get-small-pokemons'
import type { SmallPokemon } from '~/interfaces'

export const usePokemonList = routeLoader$<SmallPokemon[]>(
  async ({ query, redirect, pathname }) => {
    const offset = Number(query.get('offset') || '0')
    console.log(offset)

    if (offset < 0) throw redirect(301, pathname)
    if (isNaN(offset)) throw redirect(301, pathname)
    if (offset > 100) throw redirect(301, pathname)

    return getSmallPokemons(offset)
  }
)

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
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`}
          class='btn btn-primary mr-2'
        >
          Previous
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`}
          class='btn btn-primary mr-2'
        >
          Next
        </Link>
      </div>

      <div class='grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5 gap-1'>
        {pokemons.value.map(({ name, id }) => (
          <div key={name} class='m-5 flex flex-col justify-center items-center'>
            <PokemonImage id={id} />
            <span class='capitalize'> {name} </span>
          </div>
        ))}
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: 'List - SSR',
  meta: [
    {
      name: 'description',
      content: 'Qwik site of pokemons in SSR mode',
    },
  ],
}
