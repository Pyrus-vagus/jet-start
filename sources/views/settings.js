import { JetView } from "webix-jet";
export default class SettingsView extends JetView {
  config() {
    const _ = this.app.getService("locale")._;
    const lang = this.app.getService("locale").getLang();

    return {
      type: "space",
      rows: [
        { template: _("Settings"), type: "header" },
        {
          name: "lang",
          view: "segmented",
          inputWidth: 250,
          options: [
            { id: "en", value: "En" },
            { id: "ru", value: "Ru" },
          ],
          click: () => this.toggleLanguage(),
          value: lang,
        },
        {},
      ],
    };
  }
  toggleLanguage() {
    const langs = this.app.getService("locale");
    const value = this.getRoot().queryView({ name: "lang" }).getValue();
    langs.setLang(value);
  }
}
