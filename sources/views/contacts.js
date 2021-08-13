import { JetView } from "webix-jet";
import { contacts } from "models/contacts";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

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
    const form = {
      type: "clean",
      rows: [
        {
          view: "form",
          elements: [
            { type: "section", template: "Edit Contacts" },
            { view: "text", name: "name", value: "", label: "Name" },
            { view: "text", name: "email", value: "", label: "Email" },
            { view: "button", value: "Submit" },
          ],
        },
        {},
      ],
    };
    const contactsUi = {
      cols: [list, form],
      css: "webix_shadow_medium",
    };
    return contactsUi;
  }
  init() {
    this.$$("list").parse(contacts);
  }
}
