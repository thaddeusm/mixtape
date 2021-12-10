import { writable } from 'svelte/store';

export const music = writable({});

export const playing = writable(false);

export const queue = writable([]);

export const queuePosition = writable(0);

export const mixMeta = writable({
	'title': 'Mixtape',
	'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, enim mattis commodo blandit, lectus ex volutpat nibh, id porttitor arcu orci a tortor. Fusce malesuada, ante ac congue rhoncus, urna eros suscipit nunc, eget luctus nisi ipsum id neque. Cras feugiat a orci sit amet volutpat. Sed ut ante tellus. In id auctor lectus, at blandit diam. Aliquam nec nisi dictum, aliquet tortor in, maximus mi. Quisque pulvinar posuere ipsum feugiat fermentum. Quisque eu lorem neque. Fusce sit amet tellus ut elit iaculis laoreet. Suspendisse potenti. Aenean venenatis hendrerit ipsum at gravida.'
});

export const authorized = writable(false);

export const mode = writable('view');

export const artworkColors = writable({
	DarkMuted: '#FFFFFF',
	DarkVibrant: '#FFFFFF',
	LightMuted: '#FFFFFF',
	LightVibrant: '#FFFFFF',
	Muted: '#FFFFFF',
	Vibrant: '#FFFFFF'
});

export const colorPreference = writable('light');
