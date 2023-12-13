export const createElem = (tag, attrs) => {
    const elem = document.createElement(tag);
    Object.assign(elem, attrs);
    return elem;
};