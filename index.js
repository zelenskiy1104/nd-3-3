const ChatApp = require('./ChatApp');

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');

let chatOnMessage = (message) => {
  console.log(message);
};

// Добавим "готовлюсь к ответу"
let prepairing = () => {
  console.log('Готовлюсь к ответу');
};
webinarChat.prependListener('message', prepairing);
//

// Для ВК установим максимальное кол-во обработчиков - 2
vkChat.setMaxListeners(2);
// ... и проверим ...
//vkChat.on('message', () => console.log('first'));
//vkChat.on('message', () => console.log('second'));
//vkChat.on('message', () => console.log('third'));
// ... ругается!

// Добавим "Готовлюсь к ответу" для ВК
vkChat.prependListener('message', prepairing);

// Для ВК добавляем обработчик close
vkChat.on('closed', () => console.log('Чат вконтакте закрылся :('));

webinarChat.on('message', chatOnMessage);
facebookChat.on('message', chatOnMessage);
vkChat.on('message', chatOnMessage);

// Закрыть вконтакте (добавил вызов метода close сюда, чтоб 10 секунд мы могли наблюдать поведение ВКчата)
setTimeout( ()=> {
    vkChat.close();
}, 10000 );

// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
  facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

// Отписать от вебинара chatOnMessage
setTimeout( ()=> {
  webinarChat.removeListener('message', chatOnMessage);
}, 30000 );
