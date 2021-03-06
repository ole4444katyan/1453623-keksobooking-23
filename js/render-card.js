//Генерация разметки объявлений

import { getEndings } from './utils/utils.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const signaturesTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const fillFeatures = (features, block) => {
  if (features) {
    const classes = features.map((feature) => `popup__feature--${feature}`);

    classes.forEach((feature) => {
      const item = document.createElement('li');
      item.classList.add('popup__feature');
      item.classList.add((feature));
      block.appendChild(item);
    });
  }

};

const fillPhotos = (photos, block) => {

  if (photos) {

    photos.forEach((photo) => {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = '45';
      img.height = '40';
      img.alt = 'Фотография жилья';
      img.src = photo;
      block.appendChild(img);
    });
  }
};


const renderCard = ({
  author,
  offer,
}) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos,
  } = offer;

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = signaturesTypes[type];
  cardElement.querySelector('.popup__text--capacity').textContent = rooms + getEndings(rooms, [' комната для ', ' комнаты для ', ' комнат для ']) + guests + getEndings(guests, [' гостя', ' гостей', ' гостей']);
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardElement.querySelector('.popup__description').textContent = description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  const featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  fillFeatures(features, featuresList);

  const photosList = cardElement.querySelector('.popup__photos');
  photosList.innerHTML = '';
  fillPhotos(photos, photosList);

  return cardElement;
};


export { renderCard };

