import { JetView } from "webix-jet";

export default class SettingsView extends JetView {
  config() {
    const segmented = {
      view: "segmented",
      value:"en", inputWidth:250, options:[
        { id:"en", value:"En" },
        { id:"ru", value:"Ru"},
        
      ]
    };
    return segmented;
  }
 
}
