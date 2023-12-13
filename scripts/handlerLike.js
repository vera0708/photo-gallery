import { API_URL_PHOTOS } from "./const.js";

export const handlerLike = (btnLike) => {
    console.log('btnLike from hendler.js: ', btnLike);
    const url = new URL(`${API_URL_PHOTOS}/${btnLike.id}/like`);

    const toggleLike = (data) => {
        console.log('data: ', data);
        if (data.photo.liked_by_user) {
            btnLike.classList.remove('photo__like_o');
        } else {
            btnLike.classList.add('photo__like_o');
        };

        btnLike.likedbyUser = data.photo.liked_by_user;
        btnLike.textContent = data.photo.likes;
    };

    fetch(url, {
        method: btnLike.likedbyUser ? 'DELETE' : 'POST',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Bearer')}`,
        },
    }).then(response => response.json())
        .then(toggleLike);


}