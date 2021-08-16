import { JetView } from "webix-jet";

import { countries } from "../../models/countries";
import { statuses } from "../../models/statuses";

export default class FormView extends JetView {
  config() {
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

    return form;
  }
}
