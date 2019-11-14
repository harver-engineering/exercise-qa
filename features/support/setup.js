const { setWorldConstructor, After, AfterAll, Before, BeforeAll, Given, When, Then } = require('cucumber');
const { registerHooks, World: BatWorld, registerSteps } = require('@harver/bat');

setWorldConstructor(BatWorld);
registerHooks({ After, AfterAll, Before, BeforeAll });
registerSteps({ Given, When, Then });