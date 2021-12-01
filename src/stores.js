import { writable } from 'svelte/store';

export const queue = writable([]);

export const state = writable('');

export const colorPreference = writable('');

export const artworkColors = writable({
	DarkMuted: "#FFFFFF",
	DarkVibrant: "#FFFFFF",
	LightMuted: "#FFFFFF",
	LightVibrant: "#FFFFFF",
	Muted: "#FFFFFF",
	Vibrant: "#FFFFFF"
});
