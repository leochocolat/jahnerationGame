import SelectPlayer from './components/SelectPlayer';
import TextureLoader from './modules/TextureLoader'
import Pixi from './components/Pixi';

document.addEventListener('DOMContentLoaded', () => {
    new SelectPlayer()
        ._selectPlayer(0)
});