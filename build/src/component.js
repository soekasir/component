var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Component_instances, _a, _Component_classNode, _Component_contextNode, _Component_contextMap, _Component_contextClassMap, _Component_element, _Component_class, _Component_state, _Component_reRender;
class Component {
    constructor(el, props) {
        var _b, _c;
        _Component_instances.add(this);
        _Component_element.set(this, void 0);
        _Component_class.set(this, void 0);
        _Component_state.set(this, {});
        this.props = {};
        const ele = el.split('$-$');
        if (ele[1])
            __classPrivateFieldSet(this, _Component_element, document.querySelector(`[c-15tdsah="${ele[1]}"]`), "f");
        if (!ele[1])
            __classPrivateFieldSet(this, _Component_element, document.getElementById(el), "f");
        __classPrivateFieldSet(_b = Component, _a, (_c = __classPrivateFieldGet(_b, _a, "f", _Component_classNode), _c++, _c), "f", _Component_classNode);
        __classPrivateFieldSet(this, _Component_class, 'ComponentNode_' + __classPrivateFieldGet(Component, _a, "f", _Component_classNode), "f");
        document[__classPrivateFieldGet(this, _Component_class, "f")] = this;
        if (typeof props === "string")
            this.props = JSON.parse(props);
        if (typeof props === "object")
            this.props = props;
        __classPrivateFieldGet(this, _Component_instances, "m", _Component_reRender).call(this);
        this.componentDidMount();
    }
    setState(newState) {
        __classPrivateFieldSet(this, _Component_state, Object.assign(Object.assign({}, __classPrivateFieldGet(this, _Component_state, "f")), newState), "f");
        __classPrivateFieldGet(this, _Component_instances, "m", _Component_reRender).call(this);
    }
    set state(newState) {
        __classPrivateFieldSet(this, _Component_state, newState, "f");
        __classPrivateFieldGet(this, _Component_instances, "m", _Component_reRender).call(this);
    }
    get state() {
        return __classPrivateFieldGet(this, _Component_state, "f");
    }
    get class() {
        return __classPrivateFieldGet(this, _Component_class, "f");
    }
    componentDidMount() { }
    render() {
        return /*html*/ `<div></div>`;
    }
    static run() {
        const components = document.querySelectorAll('[component]');
        let count = 0;
        components.forEach((component) => {
            count++;
            component.setAttribute('c-15tdsah', '' + count);
            const className = component.getAttribute('component');
            const attributes = component.attributes;
            let props = "{";
            const propsMap = [];
            for (let i = 0; i < attributes.length; i++) {
                const split = attributes[i].name.split('-');
                const key = split[1];
                if (split[0] && split[0] === "props") {
                    propsMap.push(key, attributes[i].value);
                }
            }
            propsMap.forEach((v, i) => {
                if (i % 2 === 0) {
                    props += `"${v}":"`;
                }
                if (i % 2 !== 0) {
                    props += `${v}"`;
                    if (i !== propsMap.length - 1)
                        props += ',';
                }
            });
            props += "}";
            try {
                eval('new ' + className + '("' + className + '$-$' + count + '",`' + props + '`);');
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static createContext(initialData) {
        var _b, _c;
        __classPrivateFieldSet(_b = Component, _a, (_c = __classPrivateFieldGet(_b, _a, "f", _Component_contextNode), _c++, _c), "f", _Component_contextNode);
        const node = 'ContextNode_' + __classPrivateFieldGet(Component, _a, "f", _Component_contextNode);
        __classPrivateFieldGet(Component, _a, "f", _Component_contextMap).set(node, initialData);
        const getter = () => __classPrivateFieldGet(Component, _a, "f", _Component_contextMap).get(node);
        const setter = (newValue) => {
            var _b;
            __classPrivateFieldGet(Component, _a, "f", _Component_contextMap).set(node, newValue);
            (_b = __classPrivateFieldGet(Component, _a, "f", _Component_contextClassMap).get(node)) === null || _b === void 0 ? void 0 : _b.forEach((theClass) => {
                __classPrivateFieldGet(theClass, _Component_instances, "m", _Component_reRender).call(theClass);
            });
        };
        const useColor = (theClass) => {
            if (__classPrivateFieldGet(Component, _a, "f", _Component_contextClassMap).has(node)) {
                const arr = __classPrivateFieldGet(Component, _a, "f", _Component_contextClassMap).get(node);
                if (arr) {
                    arr.push(theClass);
                    __classPrivateFieldGet(Component, _a, "f", _Component_contextClassMap).set(node, arr);
                }
            }
            else {
                __classPrivateFieldGet(Component, _a, "f", _Component_contextClassMap).set(node, [theClass]);
            }
        };
        return [getter, setter, useColor, node];
    }
}
_a = Component, _Component_element = new WeakMap(), _Component_class = new WeakMap(), _Component_state = new WeakMap(), _Component_instances = new WeakSet(), _Component_reRender = function _Component_reRender() {
    if (__classPrivateFieldGet(this, _Component_element, "f"))
        __classPrivateFieldGet(this, _Component_element, "f").innerHTML = this.render();
};
_Component_classNode = { value: 0 };
_Component_contextNode = { value: 0 };
_Component_contextMap = { value: new Map() };
_Component_contextClassMap = { value: new Map() };
