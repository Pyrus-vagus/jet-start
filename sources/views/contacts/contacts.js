import { JetView } from "webix-jet";
import FormView from "./form";
import { contacts } from "../../models/contacts";
import { countries } from "../../models/countries";
import { statuses } from "../../models/statuses";
export default class ContactsView extends JetView {
  config() {
    const button = {
      view: "button",
      localId: "button",
      value: "Add New",
    };
    const list = {
      view: "list",
      localId: "list",
      select: true,
      template: function (obj) {
        return `${obj.Name}, ${obj.Email}, from ${
          countries.getItem(obj.Country).Name
        } <div class = 'webix_icon fas fa-times'></div>`;
      },
      on: {
        onAfterSelect: (id) => {
          this.setParam("id", id, true);
        },
      },
      onClick: {
        "fa-times": function (e, id) {
          contacts.remove(id);
          return false;
        },
      },
    };
    return {
      cols: [{ rows: [list, button] }, { $subview: "contacts.form" }],
      css: "webix_shadow_medium",
    };
  }
  init() {
    this.$$("list").parse(contacts);
    this.$$("button").attachEvent("onItemClick", () => {
      const nC = countries.data.count();
      const country = Math.floor(Math.random() * (nC - 1 + 1)) + 1;
      const nS = statuses.data.count();
      const status = Math.floor(Math.random() * (nS - 1 + 1)) + 1;
      contacts.add({
        Name: "New",
        Email: "new@email.com",
        Country: country,
        Status: status,
      });
    });
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
