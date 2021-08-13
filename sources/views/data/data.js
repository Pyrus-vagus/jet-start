import { JetView } from "webix-jet";
import { countries } from "../../models/countries";
import { statuses } from "../../models/statuses";
import BasicView from "./basicTable";

export default class DataView extends JetView {
  config() {
    const multiview = {
      type: "clean",
      view: "tabview",
      cells: [
        {
          header: "Countries",
          body: new BasicView(this.app, "Countries", countries),
        },
        {
          header: "Statuses",
          body: new BasicView(this.app, "Statuses", statuses),
        },
      ],
    };
    return multiview;
  }
}
