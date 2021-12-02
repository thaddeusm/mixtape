import * as Vibrant from 'node-vibrant';

module.exports = async (req, res) => {
    const photoURL = req.body.photoURL;

    Vibrant.from(photoURL).getPalette()
        .then((palette) => {
            let obj = {};

            for (var key in palette) {
                if (palette.hasOwnProperty(key)) {
                    obj[key] = palette[key].getHex();
                }
            }

            return res.status(200).json(obj);
        }).catch((err) => {
            return res.status(403).json({message: 'error'});
        });
}
