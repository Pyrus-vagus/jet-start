import { JetView } from "webix-jet";
import { contacts } from "../../models/contacts";

import { countries } from "../../models/countries";
import { statuses } from "../../models/statuses";

export default class FormView extends JetView {
  config() {
    return {
      rows: [
        {
          view: "form",
          localId: "form",
          elements: [
            { type: "section", template: "Edit Contacts" },
            { view: "text", name: "Name", value: "", label: "Name" },
            { view: "text", name: "Email", value: "", label: "Email" },
            {
              view: "combo",
              name: "Country",
              value: "1",
              label: "Country",
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
                  template: "#Name#",
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
                  template: "#Name#",
                },
              },
            },
            { view: "button", value: "Submit", localId: "button" },
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
        newData.id ? contacts.updateItem(newData.id, newData) : "";
        this.webix.message("Information is updated!");
      }
    });
  }
  urlChange() {
    const id = this.getParam("id", true) || contacts.getFirstId();
    if (id && contacts.exists(id)) {
      const values = contacts.getItem(id);
      this.$$("form").setValues(values);
    }
  }
}
