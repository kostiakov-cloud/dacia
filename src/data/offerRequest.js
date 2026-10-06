import { tr } from '../i18n';
/** /offer-request ("Получите предложение") content. The operator name is generic (no Daac / Hermes). */
export const offerRequestIntro = {
  title: tr('Получите предложение'),
  subtitle: tr('Соответствующее вашему бюджету, или выгодное предложение по финансированию'),
};

export const offerRequestModels = ['Duster', 'Logan', 'Sandero', 'Sandero Stepway', 'Bigster', 'Jogger'];

/** ?model=<key> (links from the /offers page) pre-selects a model. */
export const offerRequestModelByKey = {
  duster: 'Duster',
  logan: 'Logan',
  sandero: 'Sandero',
  'sandero-stepway': 'Sandero Stepway',
  bigster: 'Bigster',
  jogger: 'Jogger',
};

export const offerRequestCommentMax = 500;

export const offerRequestConsentText = [
  tr('Я выражаю согласие оператора персональных данных на полную или частичную обработку моих персональных данных, указанных выше, с целью проверки достоверности предоставленной информации, а также моего уведомления и передачи информации, взаимодействия, хранения данных в базе данных Продавца и его партнеров, в порядке и на условиях, предусмотренных Законом No. 133 «О защите персональных данных» от 08.07.2011.'),
  tr('В целях общения относительно качества товаров и услуг, а также информации, связанной с эксплуатацией автомобиля, я разрешаю связываться со мной по телефону, электронной почте и в мессенджерах.'),
];
