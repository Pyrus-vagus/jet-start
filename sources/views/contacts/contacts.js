import { JetView } from "webix-jet";
import FormView from "./form";
import { contacts } from "../../models/contacts";
import { countries } from "../../models/countries";
export default class ContactsView extends JetView {
  config() {
    const list = {
      view: "list",
      localId: "list",
      select: true,
      template: function (obj) {
        return `${obj.Name}, ${obj.Email}, from ${
          countries.getItem(obj.Country).Name
        }`;
      },
      on: {
        onAfterSelect: (id) => {
          this.setParam("id", id, true);
        },
      },
    };
    return {
      cols: [list, { $subview: "contacts.form" }],
      css: "webix_shadow_medium",
    };
  }
  init() {
    this.$$("list").parse(contacts);
    this.$$("list").select(this.$$("list").getFirstId());
  }
  urlChange() {
    contacts.waitData.then(() => {
      const id = this.getParam("id") || contacts.getFirstId();
      if (contacts.exist(id)) {
        this.$$("list").select(id);
        this.$$("list").showItem(id);
      }
    });
  }
}
