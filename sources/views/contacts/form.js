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
            { view: "text", name: "Country", value: "", label: "Country" },
            { view: "text", name: "Status", value: "", label: "Status" },
            { view: "button", value: "Submit" },
          ],
        },
        {},
      ],
    };
  }
  urlChange() {
    const id = this.getParam("id", true);
    if (id && contacts.exists(id)) {
      const values = contacts.getItem(id);
      this.$$("form").setValues(values);
    }
  }
}
