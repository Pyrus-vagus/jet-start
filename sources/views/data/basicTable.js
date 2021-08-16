import { JetView } from "webix-jet";

export default class BasicView extends JetView {
  constructor(app, name, data) {
    super(app, name);
    this._name = name;
    this._componentData = data;
  }
  config() {
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
        {
          template: "{common.trashIcon()}",
          localId: this._name,
          header: this._name,
        },
      ],
      onClick: {
        "wxi-trash": (e, id) => {
          this._componentData.remove(id);
          return false;
        },
      },
    };

    return {
      rows: [button, table],
    };
  }
  init() {
    this.$$("table").parse(this._componentData);
    if (this._name === "Countries") this.$$("table").hideColumn("Icon");
    this.$$("button").attachEvent("onItemClick", () => {
      this._componentData.add(
        {
          Name: "New",
        },
        0
      );
    });
  }
}
