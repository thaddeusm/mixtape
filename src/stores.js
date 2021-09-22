import { writable } from 'svelte/store';

export const artworkColors = writable({
	DarkMuted: "#FFFFFF", 
	DarkVibrant: "#FFFFFF", 
	LightMuted: "#FFFFFF", 
	LightVibrant: "#FFFFFF", 
	Muted: "#FFFFFF", 
	Vibrant: "#FFFFFF"
});