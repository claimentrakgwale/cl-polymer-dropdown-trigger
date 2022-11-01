import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { __decorate } from "cl-polymer-element-helpers/cl-helpers.js";
import { property, observe, computed, customElement } from "@polymer/decorators";

import "@polymer/paper-ripple/paper-ripple.js";
import "@polymer/iron-icon/iron-icon.js";
import "@polymer/iron-a11y-keys";
import "@polymer/paper-tooltip/paper-tooltip.js";

import "cl-polymer-element-helpers/ct-element-style.js";

let clPolymerDropdownTriggerTemplate;
let clPolymerDropdownTriggerTemplateDefault;
let clPolymerDropdownTriggerBase = mixinBehaviors([], PolymerElement);
class clPolymerDropdownTrigger extends clPolymerDropdownTriggerBase {
    constructor () {
        super();
        this.label = "";
        this.icon = "icons:arrow-drop-down";
        this.leftIcon = "";
        this.disabled = false;
        this.dark = false;
        this.compact = false;
        this.underline = false;
        this.borderless = false;
        this.isError = false;
        this.skipFocus = false;
        this.flexibleHeight = false;
        this.leftJustify = false;
        this.showIconOnHover = false;
        this.openHelpTooltipInPlace = false;
        this.isRtl = false;
        this.shouldHideArrow = false;
        this.shouldHideRipple = false;
    }

  	ready () {
        super.ready();
        this.dropdown = this
    }
    
    connectedCallback () {
        super.connectedCallback();
        this.addEventListener("tap", this.onTap.bind(this));
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        this.removeEventListener("tap", this.onTap.bind(this));
    }

    onTap(a) {
        this.disabled && a.stopPropagation()
    }

    onDisabledChange () {
        this.disabled || this.skipFocus ? this.removeAttribute("tabindex") : this.setAttribute("tabindex", "0")
    }
    
    onEnter() {
        this.disabled || this.async(this.click, 1)
    }
    
    get renderData () {
        let a = this.borderless, 
        b = this.explanatoryText, 
        c = this.icon, 
        e = this.label, 
        h = this.markerColor, 
        k = this.leftIcon, 
        l = this.underline, 
        n = this.isError && !this.disabled, 
        q = n ? "invalid" : "";
        n = [e && "has-label", !c && "hide-icon", n && "invalid", a && "borderless", !a && l && "underline"].filter(Boolean).join(" ");
        /*a = _g.Ht(!h || a || l ? {} : {
            "background-color": h
        });*/
        return {
            label: e,
            explanatoryText: b,
            icon: c,
            leftIcon: k,
            containerCssClass: n,
            underContainerTextCssClass: q/*,
            colorMarkerStyle: a*/
        };
    }

    get hideHelpTooltip () {
        return !this.helpTooltip && !this.openHelpTooltipInPlace
    }

    get helpTooltipLinks () {
        let a, b;
        return null != (b = null == (a = this.helpTooltip) ? void 0 : a.links) ? b : [] 
    }

    get helpTooltipParagraphs () {
        let a, b;
        return null != (b = null == (a = this.helpTooltip) ? void 0 : a.paragraphs) ? b : []
    }

    getUpdatedIconReference ( icon ) {
        return void 0 === icon || null === icon ? this.icon : icon;
    }

  	static get template() {
    	if (void 0 === clPolymerDropdownTriggerTemplate || null === clPolymerDropdownTriggerTemplate) {
            
            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                } 

                .container {
                    display: flex;
                    justify-content: space-between;
                    box-sizing: border-box;
                    position: relative;
                    background: var(--cl-container-background,initial);
                    border: var(--cl-container-border);
                    border-radius: var(--cl-container-border-radius);
                    padding: 0;
                    padding-right: var(--cl-polymer-dropdown-trigger-right-padding,0);
                    padding-left: var(--cl-polymer-dropdown-trigger-left-padding, var(--form-field-horizontal-padding));
                    height: var(--cl-polymer-dropdown-trigger-container-height,48px);
                    cursor: var(--cl-polymer-dropdown-trigger-container-cursor,pointer);
                } 

                .container .color-marker {
                    position: absolute;
                    border-radius: var(--cl-container-border-radius) 0 0 var(--cl-container-border-radius);
                    left: -1px;
                    top: -1px;
                    height: calc(100% + 2px);
                    width: 4px;
                } 

                .container.hide-icon {
                    padding-right: var(--form-field-horizontal-padding);
                } 

                .container.has-label {
                    height: var(--cl-polymer-dropdown-trigger-container-height,56px);
                } 

                .left-icon {
                    align-self: center;
                    padding-right: 8px;
                } 

                .left-container {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                } 

                .label-area {
                    display: flex;
                    flex: none;
                    align-items: flex-end;
                } 

                .label-text {
                    font-family: var(--cl-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    margin-top: calc(20px - var(--cl-font-caption1-baseline-top));
                    color: var(--cl-secondary-text-color);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    min-width: 0;
                    margin-top: 7px;
                } 

                .container.borderless .label-text,
                .container.underline .label-text {
                    font-family: var(--cl-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    margin-top: calc(20px - var(--cl-font-caption1-baseline-top));
                    color: var(--cl-secondary-text-color);
                } 

                #help-icon {
                    flex: none;
                    margin-left: 4px;
                } 

                .container.hide-icon .right-container {
                    display: none;
                } 

                .right-container iron-icon {
                    height: 100%;
                    color: var(--cl-polymer-dropdown-trigger-icon-color,var(--icon-color));
                    margin-left: var(--cl-polymer-dropdown-trigger-icon-margin-left,16px);
                    margin-right: 12px;
                } 

                iron-a11y-keys {
                    display: none;
                } 

                paper-ripple {
                    color: var(--cl-polymer-dropdown-trigger-paper-ripple-color,var(--cl-secondary-text-color));
                } 

                #under-container-message {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-family: var(--cl-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--cl-primary-font-smoothing);
                    letter-spacing: 0.011em;
                    font-size: 12px;
                    line-height: 16px;
                    display: var(--cl-under-container-message-style-display,block);
                    padding-top: calc(16px - var(--cl-font-caption1-baseline-top));
                    padding-bottom: calc(4px - var(--cl-font-caption1-baseline-top));
                    height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--cl-secondary-text-color);
                } 

                .invalid {
                    border-color: var(--cl-primary-error-color);
                } 

                .container.invalid .label-text {
                    color: var(--cl-primary-error-color);
                } 

                #under-container-message.invalid {
                    color: var(--cl-primary-error-color);
                } 

                :host:focus {
                    outline: none;
                } 

                :host([keyboard-focus]) .label-text {
                    color: var(--cl-focus);
                } 

                .container:not(.invalid):hover {
                    border-color: var(--cl-icon-inactive);
                } 

                :host([keyboard-focus]) .container {
                    border-color: var(--cl-focus);
                } 

                :host([keyboard-focus]) .right-container iron-icon,
                .container:hover .right-container iron-icon {
                    color: var(--cl-polymer-dropdown-trigger-icon-hover-color,var(--icon-focused-color));
                } 

                :host([compact]) .container {
                    height: 40px;
                } 

                :host([flexible-height]) .container {
                    height: initial;
                } 

                :host([flexible-height]) .right-container iron-icon {
                    margin-top: 8px;
                    height: initial;
                } 

                .underline.container {
                    padding: 0;
                    border-top: none;
                    border-left: none;
                    border-right: none;
                    border-radius: 0;
                } 

                .underline .right-container iron-icon {
                    margin-right: 4px;
                } 

                .borderless.container {
                    padding: 0;
                    padding-right: var(--cl-polymer-dropdown-trigger-right-padding,0);
                    padding-left: var(--cl-polymer-dropdown-trigger-left-padding,0);
                    border: none;
                    border-radius: 0;
                } 

                .borderless .right-container iron-icon {
                    margin-right: 4px;
                } 

                :host([keyboard-focus]) .borderless.container {
                    border-bottom: var(--cl-container-border);
                    border-color: var(--cl-focus);
                } 

                :host([disabled]) .label-text,
                :host([disabled]) .left-container iron-icon,
                :host([disabled]) .right-container iron-icon,
                :host([disabled]) .container:hover .right-container iron-icon {
                    color: var(--cl-text-disabled);
                } 

                :host([disabled]) .container:hover {
                    cursor: default;
                    border-color: var(--cl-container-border-color);
                } 

                :host([disabled]) .container {
                    background-color: var(--cl-polymer-dropdown-trigger-disabled-background-color,var(--cl-spec-secondary-background-color));
                } 

                :host([disabled]) paper-ripple {
                    display: none;
                } 

                :host([dark]) .label-text,
                :host([dark]) .right-container iron-icon {
                    color: var(--cl-polymer-dropdown-trigger-color-dark,var(--cl-secondary-text-color-inverse));
                } 

                :host([dark]) .container {
                    border-color: var(--cl-polymer-dropdown-trigger-container-border-color-inverse,var(--cl-container-border-color-inverse));
                } 

                :host([dark]) .container:hover {
                    border-color: var(--cl-icon-inactive);
                } 

                :host([disabled][dark]) .container {
                    background-color: var(--cl-polymer-dropdown-trigger-disabled-background-color,var(--cl-spec-secondary-background-color-inverse));
                } 

                :host([keyboard-focus][dark]) .right-container iron-icon,
                :host([dark]) .container:hover .right-container iron-icon {
                    color: var(--cl-polymer-dropdown-trigger-color-focus-dark,var(--cl-primary-text-color-inverse));
                } 

                :host([disabled][dark]) .label-text,
                :host([disabled][dark]) .left-container iron-icon,
                :host([disabled][dark]) .right-container iron-icon,
                :host([disabled][dark]) .container:hover .right-container iron-icon {
                    color: var(--cl-text-disabled-inverse);
                } 

                :host([left-justify]) .container {
                    justify-content: flex-start;
                } 

                :host([left-justify]) .left-container {
                    flex: 0 1 auto;
                } 

                :host([left-justify]) .right-container {
                    margin-left: var(--cl-polymer-dropdown-trigger-icon-margin-left,8px);
                } 

                :host([show-icon-on-hover]) .left-icon,
                :host([show-icon-on-hover]) .right-container {
                    display: none;
                } 

                :host([show-icon-on-hover]) .container:hover .left-icon,
                :host([show-icon-on-hover]) .container:hover .right-container,
                :host([show-icon-on-hover]):focus .left-icon,
                :host([show-icon-on-hover]):focus .right-container {
                    display: block;
                }
            </style>
            <iron-a11y-keys keys="enter" target="[[dropdown]]" on-keys-pressed="onEnter"></iron-a11y-keys>
            <div class$="[[renderData.containerCssClass]] container" rtl$="[[isRtl]]">
                <div class="color-marker " style$="[[renderData.colorMarkerStyle]]"></div>

                <template is="dom-if" restamp="" if="[[renderData.leftIcon]]">
                    <iron-icon class="left-icon" icon="[[getUpdatedIconReference(renderData.leftIcon)]]"></iron-icon>
                </template>
                <div class="left-container">
                    <template is="dom-if" restamp="" if="[[renderData.label]]">
                        <div class="label-area">
                            <div class="label-text">[[renderData.label]]</div>
                            <template is="dom-if" restamp="" if="[[!hideHelpTooltip]]" >
                                <iron-icon id="help-icon" class="help-outline-icon" compact="" icon="[[getUpdatedIconReference('icons:help-outline')]]" tabindex="0"></iron-icon>

                                <paper-tooltip for="help-icon" help-context="[[helpContext]]" open-in-place="[[openHelpTooltipInPlace]]" position="top" type="explanatory">
                                    <paper-tooltip-body links="[[helpTooltipLinks]]" paragraphs="[[helpTooltipParagraphs]]">
                                        <slot name="help-tooltip"></slot>
                                    </paper-tooltip-body>
                                </paper-tooltip>
                            </template>
                        </div>
                    </template>
                    <slot></slot>
                </div>
                <template is="dom-if" if="[[!shouldHideArrow]]">
                    <div class="right-container">
                        <iron-icon icon="[[getUpdatedIconReference(renderData.icon)]]" ></iron-icon>
                    </div>
                </template>
                <template is="dom-if" if="[[!shouldHideRipple]]">
                    <paper-ripple></paper-ripple>
                </template>
            </div>
            <template is="dom-if" if="[[renderData.explanatoryText]]" >
                <div id="under-container-message" class$="[[renderData.underContainerTextCssClass]] under-container-message">[[renderData.explanatoryText]]</div>
                <paper-tooltip for="under-container-message" position="bottom" truncation="" ></paper-tooltip>
            </template>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemp;
            if (void 0 == clPolymerDropdownTriggerTemplateDefault || null == clPolymerDropdownTriggerTemplateDefault) {
                defaultTemp = clDefaultTemplate();
                clPolymerDropdownTriggerTemplateDefault = defaultTemp
            }
            defaultTemp = clPolymerDropdownTriggerTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemp.content.cloneNode(true), template.content.firstChild);

            return clPolymerDropdownTriggerTemplate = template;
        }

        return clPolymerDropdownTriggerTemplate;
  	}
}

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "label", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "icon", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "leftIcon", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "disabled", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "dark", 
    void 0
);

__decorate(
    [
        property({ type: Object })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "helpTooltip", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "helpContext", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "compact", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "underline", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "borderless", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "explanatoryText", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "isError", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "skipFocus", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "flexibleHeight", 
    void 0
);

__decorate(
    [
        property({ type: String, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "markerColor", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "showIconOnHover", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "openHelpTooltipInPlace", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "isRtl", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "shouldHideArrow", 
    void 0
);

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    clPolymerDropdownTrigger.prototype, 
    "shouldHideRipple", 
    void 0
);

__decorate(
    [
        property({ type: Object }),
        computed("label", "icon", "leftIcon", "borderless", "underline", "isError", "disabled", "explanatoryText", "markerColor")
    ], 
    clPolymerDropdownTrigger.prototype, 
    "renderData", 
    null
);

__decorate(
    [
        property({ type: Function }),
        observe("disabled", "skipFocus")
    ], 
    clPolymerDropdownTrigger.prototype, 
    "onDisabledChange", 
    null
);

__decorate(
    [
        property({ type: Boolean }),
        computed("helpTooltip", "openHelpTooltipInPlace")
    ], 
    clPolymerDropdownTrigger.prototype, 
    "hideHelpTooltip", 
    null
);

__decorate(
    [
        property({ type: Array }),
        computed("helpTooltip")
    ], 
    clPolymerDropdownTrigger.prototype, 
    "helpTooltipLinks", 
    null
);

__decorate(
    [
        property({ type: Array }),
        computed("helpTooltip")
    ], 
    clPolymerDropdownTrigger.prototype, 
    "helpTooltipParagraphs", 
    null
);

clPolymerDropdownTrigger = __decorate([
    customElement("cl-polymer-dropdown-trigger")
], clPolymerDropdownTrigger);

export { clPolymerDropdownTrigger };