"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var angular2_polymer_1 = require("@vaadin/angular2-polymer");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule],
        declarations: [
            app_component_1.AppComponent,
            angular2_polymer_1.PolymerElement('paper-input'),
            angular2_polymer_1.PolymerElement('paper-button'),
            angular2_polymer_1.PolymerElement('paper-textarea'),
            angular2_polymer_1.PolymerElement('paper-dialog'),
            angular2_polymer_1.PolymerElement('paper-dialog-scrollable'),
            angular2_polymer_1.PolymerElement('paper-toast'),
            angular2_polymer_1.PolymerElement('paper-spinner'),
            angular2_polymer_1.PolymerElement('paper-icon-button'),
            angular2_polymer_1.PolymerElement('iron-icon'),
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map