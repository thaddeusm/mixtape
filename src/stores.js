import { writable } from 'svelte/store';

export const music = writable({});

export const playing = writable(false);

export const queue = writable([]);

export const queuePosition = writable(0);

export const mixMeta = writable({
	'title': 'Mixtape',
	'description': 'Mixtape description...'
});

export const authorized = writable(false);

export const mode = writable('play');

export const artwork = writable('');

export const artworkColors = writable({
	DarkMuted: '#1e1e1e',
	DarkVibrant: '#454545',
	LightMuted: '#ffffff',
	LightVibrant: '#efefef',
	Muted: '#90a4ae',
	Vibrant: '#cfd8dc'
});

export const colorPreference = writable('light');
