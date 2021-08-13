import { JetView } from "webix-jet";
import { countries } from "models/countries";
import { statuses } from "models/statuses";

export default class DataView extends JetView {
  config() {
    const countriesCell = {
      header: "Countries",
      body: {
        rows: [
          {
            view: "button",
            value: "Add new",
            click: function () {
              countries.add(
                {
                  Name: "New Country",
                },
                0
              );
            },
          },
          {
            view: "datatable",
            editable: true,
            editaction: "dblclick",
            columns: [
              {
                id: "Name",
                header: "Country",
                fillspace: true,
                editor: "text",
              },
              { template: "{common.trashIcon()}" },
            ],
            id: "countries",
            onClick: {
              "wxi-trash": function (e, id) {
                countries.remove(id);
                return false;
              },
            },
          },
        ],
      },
    };
    const statusesCell = {
      header: "Statuses",
      body: {
        rows: [
          {
            view: "button",
            value: "Add new",
            click: function () {
              statuses.add(
                {
                  Name: "New Status",
                },
                0
              );
            },
          },
          {
            view: "datatable",
            editable: true,
            editaction: "dblclick",
            columns: [
              { id: "Name", header: "Status", fillspace: true, editor: "text" },
              {
                id: "Icon",
                header: "",
                template: "<span class='webix_icon fas fa-#Icon# '></span>",
                editor: "richselect",
                collection: ["cogs", "user"],
                suggest: {
                  body: {
                    template:
                      "<span class='webix_icon fas fa-#value# '></span>",
                  },
                },
              },
              { template: "{common.trashIcon()}" },
            ],
            id: "statuses",
            onClick: {
              "wxi-trash": function (e, id) {
                statuses.remove(id);
                return false;
              },
            },
          },
        ],
      },
    };
    const multiview = {
      type: "clean",
      view: "tabview",
      cells: [countriesCell, statusesCell],
    };
    return multiview;
  }
  init() {
    this.$$("countries").parse(countries);
    this.$$("statuses").parse(statuses);
  }
}
