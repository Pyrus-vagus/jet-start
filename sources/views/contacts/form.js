import { JetView } from "webix-jet";
import { contacts } from "../../models/contacts";

import { countries } from "../../models/countries";
import { statuses } from "../../models/statuses";

export default class FormView extends JetView {
  config() {
    const _ = this.app.getService("locale")._;
    return {
      rows: [
        {
          view: "form",
          localId: "form",
          elements: [
            { type: "section", template: _("Edit Contacts") },
            { view: "text", name: "Name", value: "", label: _("Name") },
            { view: "text", name: "Email", value: "", label: _("Email") },
            {
              view: "combo",
              name: "Country",
              value: "1",
              label: _("Country"),
              options: {
                view: "suggest",
                filter: function (item, value) {
                  if (
                    item.Name.toString()
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) === 0
                  )
                    return true;
                  return false;
                },
                body: {
                  data: countries,
                  template: (o) => o.Name,
                },
              },
            },
            {
              view: "combo",
              name: "Status",
              value: "",
              label: "Status",
              options: {
                view: "suggest",
                filter: function (item, value) {
                  if (
                    item.Name.toString()
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) === 0
                  )
                    return true;
                  return false;
                },
                body: {
                  data: statuses,
                  template: (o) => o.Name,
                },
              },
            },
            { view: "button", value: _("Submit"), localId: "button" },
          ],
        },
        {},
      ],
    };
  }
  init() {
    this.$$("button").attachEvent("onItemClick", () => {
      const form = this.$$("form");
      if (form.isDirty()) {
        const newData = form.getValues();
        if (newData.id) {
          contacts.updateItem(newData.id, newData);
        }
        this.webix.message("Information is updated!");
      }
    });
  }
  urlChange() {
    contacts.waitData.then(() => {
      const id = this.getParam("id", true) || contacts.getFirstId();
      if (id && contacts.exists(id)) {
        const values = contacts.getItem(id);
        this.$$("form").setValues(values);
      } else {
        this.$$("form").clear();
      }
    });
  }
}
