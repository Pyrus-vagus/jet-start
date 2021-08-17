import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp {
  constructor(config) {
    const defaults = {
      id: APPNAME,
      version: VERSION,
      router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
      debug: !PRODUCTION,
      start: "/top/data.data",
    };
    super({ ...defaults, ...config });
  }
}
const app = new MyApp();
app.use(plugins.Locale);
if (!BUILD_AS_MODULE) {
  webix.ready(() => app.render());
}
