/* eslint-disable qwik/jsx-img */
import {
  $,
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik'
import { useNavigate } from '@builder.io/qwik-city'

interface Props {
  id: number | string
  size?: number
  isBack?: boolean
  isVisible?: boolean
  clickeable?: boolean
}

export const PokemonImage = component$(
  ({
    id,
    size = 200,
    isBack = false,
    isVisible = true,
    clickeable = false,
  }: Props) => {
    const nav = useNavigate()

    const navigateToPokemon = $((id: number | string) => {
      nav(`/pokemon/${id}`)
    })

    const imgLoaded = useSignal(false)
    useTask$(({ track }) => {
      track(() => id)

      imgLoaded.value = false
    })

    const imageUrl = useComputed$(() => {
      return isBack
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    })

    return (
      <div
        class='flex items-center justify-center'
        style={{ height: `${size}px`, width: `${size}px` }}
      >
        <img
          src={imageUrl.value}
          alt='Pokemon Sprite'
          onLoad$={() => (imgLoaded.value = true)}
          onClick$={() => {
            clickeable && navigateToPokemon(id)
          }}
          height={size}
          width={size}
          class={[
            {
              hidden: !imgLoaded.value,
              'brightness-0': !isVisible,
            },
            'translate-all',
          ]}
        />
        {!imgLoaded.value && <span>Loading...</span>}
      </div>
    )
  }
)
