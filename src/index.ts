import App from './app';

import router from './routes/routes';

const app = new App();

app.initializeRouter(router);

app.initializeServer(3000);
