import { getData, getPhoto } from "./getData.js";
import { renderGallery } from "./renderGallery.js";
import { renderPhoto } from "./renderPhoto.js";
import { autorization } from "./autorization.js";
import { handlerLike } from "./handlerLike.js";

const init = async ({
    selectorGalleryWrapper,
    selectorPhotoWrapper,
    selectorAuthButton }) => {
    const galleryWrapper = document.querySelector(selectorGalleryWrapper);
    const photoWrapper = document.querySelector(selectorPhotoWrapper);
    const authBtn = document.querySelector(selectorAuthButton);

    autorization(authBtn);

    if (galleryWrapper) {
        const photos = await getData({ count: 30 });
        // const photos = await getData('data.json');
        renderGallery(galleryWrapper, photos);
    }
    if (photoWrapper) {
        const url = new URL(location.href)
        const idPhoto = url.searchParams.get('photo');

        if (idPhoto) {
            const photo = await getPhoto({ idPhoto });
            console.log('photo: ', photo);

            // const photo = await getData('photo.json');
            const btnLike = await renderPhoto(photoWrapper, photo);
            console.log('btnLike: ', btnLike);

            btnLike.addEventListener('click', () => {
                if (localStorage.getItem('Bearer')) {
                    console.log('Bearer');
                    handlerLike(btnLike);
                }
            });
        }
    }
};

init({
    selectorGalleryWrapper: '.gallery__wrapper',
    selectorPhotoWrapper: '.photo__wrapper',
    selectorAuthButton: '.header__login-button',
});

/*
href: "http://127.0.0.1:5500/page.html?photo=QIW5zKkr0_I"
origin: "http://127.0.0.1:5500"
password: ""
pathname: "/page.html"
port: "5500"
protocol: "http:"
search: "?photo=QIW5zKkr0_I"
 */