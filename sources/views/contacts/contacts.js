import { JetView } from "webix-jet";
import FormView from "./form";
import { contacts } from "../../models/contacts";
import { countries } from "../../models/countries";
export default class ContactsView extends JetView {
  config() {
    const list = {
      view: "list",
      id: "list",
      select: true,
      template: function (obj) {
        return `${obj.Name}, ${obj.Email}, from ${
          countries.getItem(obj.Country).Name
        }`;
      },
    };
    return {
      cols: [list, FormView],
      css: "webix_shadow_medium",
    };
  }
  init() {
    this.$$("list").parse(contacts);
  }
}
