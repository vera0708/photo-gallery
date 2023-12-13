import { createElem } from "./createElem.js";

// const loadImg = (url, className) => {
//     return new Promise((resolve) => {
//         const img = new Image();
//         img.className = className;
//         img.style.maxHeight = '80vh';
//         img.src = url;
//         img.addEventListener('load', () => {
//             resolve(img);
//         });
//         img.addEventListener('error', (err) => {
//             console.error('err: ', err);
// reject(new Error(err));
//         });
//     });
// };

export const renderPhoto = async (photoWrapper, photo) => {
    const picture = createElem('img', {
        className: 'photo__picture',
        src: photo.urls.regular,
        // src: photo.urls.raw, max качество, но в 5 раз больше
        style: 'max-height: 80vh',
        alt: photo.description || photo.alt_description,
    });

    const author = createElem('a', {
        className: 'photo__author',
        href: photo.user.links.html,
    });

    const authorAvatar = createElem('img', {
        src: photo.user.profile_image.medium,
        alt: photo.user.bio,
        title: photo.user.username,
    });

    const authorName = createElem('span', {
        textContent: `${photo.user.first_name} ${photo.user.last_name}`
    });
    author.append(authorAvatar, authorName);

    const control = createElem('div', {
        className: 'photo__control',
    });

    const btnLike = createElem('button', {
        className: 'photo__like',
        id: photo.id,
        textContent: photo.likes,
        likedByUser: photo.liked_by_user,
    });

    if (!btnLike.likedByUser) {
        btnLike.classList.add('photo__like_o');
    }
    const linkDownload = createElem('a', {
        className: 'photo__download',
        href: photo.links.download,
        download: true,
        target: '_blank',
    });

    control.append(btnLike, linkDownload);
    photoWrapper.append(picture, author, control);

    return btnLike;
};
