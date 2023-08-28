/* eslint-disable qwik/jsx-img */
import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';

interface Props {
	id: number;
	size?: number;
	isBack?: boolean;
	isVisible?: boolean;
	clickeable?: boolean;
}

export const PokemonImage = component$(
	({
		id,
		size = 200,
		isBack = false,
		isVisible = true,
		clickeable = false,
	}: Props) => {
		const baseURL =
			'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
		const endURL = `/${id}.png`;
		const withBack = `${baseURL + '/back' + endURL}`;
		const fullURL = !isBack ? baseURL + endURL : withBack;
		const nav = useNavigate();

		const navigateToPokemon = $((id: number | string) => {
			nav(`/pokemon/${id}`);
		});

		const imgLoaded = useSignal(false);
		useTask$(({ track }) => {
			track(() => id);

			imgLoaded.value = false;
		});

		return (
			<div
				class="flex items-center justify-center"
				style={{ height: `${size}px`, width: `${size}px` }}
			>
				<img
					src={`${fullURL}`}
					alt="Pokemon Sprite"
					style={{ width: `${size}px` }}
					onLoad$={() => (imgLoaded.value = true)}
					onClick$={() => {
						clickeable && navigateToPokemon(id);
					}}
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
		);
	}
);
