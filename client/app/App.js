import { AuthController } from './Controllers/AuthController.js';
import { BirdsController } from './Controllers/BirdsController.js';

class App {
  authController = new AuthController();

  birdsController = new BirdsController();
}

// @ts-ignore
window.app = new App()
