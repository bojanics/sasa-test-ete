var formObj = { "_id": "59edb3ed5b14d40008885e28", "machineName": "qgkvxtidlziticr:form1", "modified": "2018-01-03T12:14:26.019Z", "title": "DefaultForm1", "display": "form", "name": "form1", "path": "form1", "project": "59edb3845b14d40008885e0e", "_vid": 0, "revisions": "", "created": "2017-10-23T09:18:37.370Z", "components": [{ "hideLabel": false, "clearOnHide": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "breadcrumb": "default", "type": "panel", "components": [{ "hideLabel": false, "clearOnHide": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "columns", "columns": [{ "pull": 0, "push": 0, "offset": 0, "width": 6, "components": [{ "customDefaultValue": "value = component.root.header.user.name", "labelPosition": "top", "hideLabel": false, "properties": { "": "" }, "tags": [], "type": "textfield", "conditional": { "eq": "", "when": null, "show": "" }, "validate": { "customPrivate": false, "custom": "", "pattern": "", "maxLength": "", "minLength": "", "required": false }, "clearOnHide": true, "hidden": false, "persistent": true, "unique": false, "protected": false, "defaultValue": "", "multiple": false, "suffix": "", "prefix": "", "placeholder": "Enter your first name...", "key": "panelColumnsFirstname", "label": "Firstname", "inputMask": "", "inputType": "text", "tableView": true, "input": true, "lockKey": true }] }, { "pull": 0, "push": 0, "offset": 0, "width": 6, "components": [{ "hideLabel": false, "customConditional": "", "properties": { "": "" }, "tags": [], "type": "textfield", "conditional": { "eq": "", "when": null, "show": "" }, "validate": { "customPrivate": false, "custom": "", "pattern": "", "maxLength": "", "minLength": "", "required": false }, "clearOnHide": true, "hidden": false, "persistent": true, "unique": false, "protected": false, "defaultValue": "", "multiple": false, "suffix": "", "prefix": "", "placeholder": "Enter your last name...", "key": "panelColumnsLastname", "label": "Lastname", "inputMask": "", "inputType": "text", "tableView": true, "input": true }] }], "key": "panelColumns", "tableView": false, "input": false }, { "hideLabel": false, "clearOnHide": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "columns", "columns": [{ "pull": 0, "push": 0, "offset": 0, "width": 6, "components": [{ "hideLabel": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "number", "validate": { "custom": "", "multiple": "", "integer": "", "step": "any", "max": 9999999999999, "min": 1000000000000, "required": false }, "clearOnHide": true, "hidden": false, "persistent": true, "protected": false, "defaultValue": "", "suffix": "", "prefix": "", "placeholder": "Enter you ID...", "key": "panelColumnsColumnsId", "label": "ID", "inputType": "number", "tableView": true, "input": true }] }, { "pull": 0, "push": 0, "offset": 0, "width": 6, "components": [{ "hideLabel": false, "inputType": "tel", "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "phoneNumber", "validate": { "required": false }, "clearOnHide": true, "defaultValue": "", "hidden": false, "persistent": true, "unique": false, "protected": false, "multiple": false, "suffix": "", "prefix": "", "placeholder": "Enter your phone number...", "key": "panelColumnsColumnsPhone", "label": "Phone", "inputMask": "(999) 999-9999", "tableView": true, "input": true }] }], "key": "panelColumnsColumns", "tableView": false, "input": false }, { "hideLabel": false, "clearOnHide": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "columns", "columns": [{ "pull": 0, "push": 0, "offset": 0, "width": 6, "components": [{ "hideLabel": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "day", "validate": { "custom": "" }, "clearOnHide": true, "hidden": false, "persistent": true, "protected": false, "dayFirst": true, "fields": { "year": { "required": false, "placeholder": "Year of birth, e.g. 1973", "type": "number" }, "month": { "required": false, "placeholder": "Month of birth", "type": "select" }, "day": { "required": false, "placeholder": "Day of birth", "type": "number" } }, "key": "panelColumns2Birth", "label": "Birth", "tableView": true, "input": true }] }, { "pull": 0, "push": 0, "offset": 0, "width": 6, "components": [{ "hideLabel": false, "properties": { "": "" }, "conditional": { "eq": "", "when": null, "show": "" }, "tags": [], "type": "address", "validate": { "required": false }, "map": { "key": "", "region": "" }, "hidden": false, "persistent": true, "unique": false, "clearOnHide": true, "protected": false, "multiple": false, "placeholder": "Enter your address...", "key": "panelColumns2Address", "label": "Address", "tableView": true, "input": true }] }], "key": "panelColumns2", "tableView": false, "input": false }], "tableView": false, "theme": "default", "title": "Panel1", "input": false, "key": "panel" }, { "hideLabel": false, "type": "button", "theme": "primary", "disableOnInvalid": false, "action": "submit", "block": false, "rightIcon": "", "leftIcon": "", "size": "md", "key": "submit", "tableView": false, "label": "Submit", "input": true }], "owner": "59edb36d25c87f0009ad6e8e", "submissionAccess": [], "access": [{ "type": "read_all", "roles": ["59edb3845b14d40008885e0f", "59edb3845b14d40008885e10", "59edb3845b14d40008885e11"] }], "tags": [], "type": "form" };
