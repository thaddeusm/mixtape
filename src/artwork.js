import { artwork, artworkColors } from './stores.js';

let artwork_value;
let artwork_colors_value;

const unsubscribeArtwork = artwork.subscribe(value => {
  artwork_value = value;
});

const unsubscribeArtworkColors = artworkColors.subscribe(value => {
  artwork_colors_value = value;
});

export const getImageColors = async () => {
  let data = {
    photoURL: artwork_value
  };

  let res;
  try {
    res = await fetch('/api/parseImageColors.js', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'cache-control': 'no-cache'
      },
      body: JSON.stringify(data)
    });

    artworkColors.set(await res.json());
  } catch(err) {
    console.log(err);
  }
}

export const getArtwork = async (artworkUrl) => {
  let arr;

  if (artworkUrl.indexOf('{w}x{h}') == -1) {
    arr = artworkUrl.split('2000x2000bb.jpg');
  } else {
    arr = artworkUrl.split('{w}x{h}');
  }

  return arr[0] + '500x500cc.jpeg';
}

export const getThumbnail = async (artworkUrl) => {
  let arr;

  if (artworkUrl.indexOf('{w}x{h}') == -1) {
    arr = artworkUrl.split('2000x2000bb.jpg');
  } else {
    arr = artworkUrl.split('{w}x{h}');
  }

  return arr[0] + '55x55cc.jpeg';
}

export const setArtwork = async (artworkUrl) => {
  artwork.set(await getArtwork(artworkUrl));
}
