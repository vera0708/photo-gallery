import { createElem } from "./createElem.js";

const loadImg = (url, description) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.width = '200';
        img.src = url;
        img.alt = description ? description : '';
        img.addEventListener('load', () => {
            resolve(img);
        });
        img.addEventListener('error', (err) => {
            reject(new Error(err));
        });
    });
};

export const createCardPhoto = async (data) => {
    const card = createElem('li', {
        className: 'card'
    });

    const cardItem = createElem('a', {
        className: 'grid-item',
        id: data.id,
        href: `page.html?photo=${data.id}`
    });

    const photo = await loadImg(data.urls.small, data.description);

    const author = createElem('a', {
        className: 'card__author',
        href: data.user.links.html,
    });

    const authorAvatar = createElem('img', {
        className: 'author__photo',
        width: '32',
        height: '32',
        src: data.user.profile_image.medium,
        alt: data.user.bio,
        title: data.user.name,
    });

    author.append(authorAvatar);

    const likeBtn = createElem('button', {
        className: 'card__photo-like',
        textContent: data.likes,
    });


    const downloadLink = createElem('a', {
        className: 'card__download',
        href: data.links.download,
        download: true,
        target: '_blank',
    });

    cardItem.append(photo, author, likeBtn, downloadLink)
    card.append(cardItem);
    return card;
};
