import { JetView } from "webix-jet";

export default class BasicView extends JetView {
  constructor(app, name, data) {
    super(app, name);
    this._name = name;
    this._componentData = data;
  }
  config() {
    console.log(this._name);
    const button = {
      view: "button",
      value: "Add New",
      localId: "button",
    };
    const table = {
      view: "datatable",
      editable: true,
      editaction: "dblclick",
      localId: "table",
      id: this._name,
      columns: [
        {
          id: "Name",
          header: this._name,
          fillspace: true,
          editor: "text",
        },
        {
          id: "Icon",
          header: "",
          template: "<span class='webix_icon fas fa-#Icon# '></span>",
          editor: "richselect",
          collection: ["cogs", "user"],
          suggest: {
            body: {
              template: "<span class='webix_icon fas fa-#value# '></span>",
            },
          },
        },
        { template: "{common.trashIcon()}" },
      ],
      onClick: {
        "wxi-trash": function (e, id) {
          this.data.remove(id);
          return false;
        },
      },
    };
    const cell = {
      header: this._name,
      body: {
        rows: [button, table],
      },
    };
    return {
      rows: [button, table],
    };
  }
  init() {
    console.log(this);
    const tableData = this._componentData;
    const table = this.$$("table");
    this.$$("table").parse(this._componentData);
    if (this._name === "Countries") table.hideColumn("Icon");
    this.$$("button").attachEvent("onItemClick", function () {
      tableData.add(
        {
          Name: "New",
        },
        0
      );
    });
  }
}
