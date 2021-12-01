import { writable } from 'svelte/store';

export const music = writable({});

export const queue = writable([]);

export const state = writable('');

export const artworkColors = writable({
	DarkMuted: "#FFFFFF",
	DarkVibrant: "#FFFFFF",
	LightMuted: "#FFFFFF",
	LightVibrant: "#FFFFFF",
	Muted: "#FFFFFF",
	Vibrant: "#FFFFFF"
});
