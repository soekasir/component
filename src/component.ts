/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Document {
    [key: string]: any;
  }
}

class Component {
  static #classNode = 0;
  static #contextNode = 0;
  static #contextMap = new Map();
  static #contextClassMap = new Map<string,[any]>();

  #element;
  #class: string;
  #state = {};
  props = {};

  constructor(el: string, props: string) {
    const ele=el.split('$-$');
    if(ele[1]) this.#element = document.querySelector(`[c-15tdsah="${ele[1]}"]`);
    if(!ele[1]) this.#element = document.getElementById(el);
    Component.#classNode++;
    this.#class = 'ComponentNode_' + Component.#classNode;
    document[this.#class] = this;
    if (typeof props==="string") this.props = JSON.parse(props);
    if (typeof props==="object") this.props = props;
    this.#reRender();
    this.componentDidMount();
  }

  #reRender() {
      if(this.#element) this.#element.innerHTML = this.render();
  }

  setState(newState: {}) {
    this.#state = {...this.#state, ...newState};
    this.#reRender();
  }

  set state(newState) {
    this.#state = newState;
    this.#reRender();
  }

  get state() {
    return this.#state;
  }

  get class() {
    return this.#class;
  }

  componentDidMount() {}

  render() {
    return /*html*/ `<div></div>`;
  }

  static run() {

    const components = document.querySelectorAll('[component]');

    let count = 0;
    components.forEach((component: Element) => {
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
        if(i%2===0){
          props += `"${v}":"`;
        }
        if(i%2!==0){
          props += `${v}"`;
          if(i!==propsMap.length-1) props+=',';
        }
      });
      props += "}";
      try {
        eval(
          'new ' + className + '("' + className + '$-$'+ count + '",`' + props + '`);'
        );
      } catch (error: any) {
        console.error(error.message);
      }

    });

  }

  static createContext(initialData: any) {

    Component.#contextNode++;
    const node = 'ContextNode_' + Component.#contextNode;
    Component.#contextMap.set(node, initialData);

    const getter = () => Component.#contextMap.get(node);

    const setter = (newValue: any) => {
      Component.#contextMap.set(node, newValue);
      Component.#contextClassMap.get(node)?.forEach((theClass:Component)=>{
        theClass.#reRender();
      })
    };

    const useColor = (theClass:any) =>{
      if(Component.#contextClassMap.has(node)){
        const arr=Component.#contextClassMap.get(node);
        if(arr) {
          arr.push(theClass);
          Component.#contextClassMap.set(node,arr);
        }
      }else{
        Component.#contextClassMap.set(node,[theClass]);
      }
    }

    return [getter, setter, useColor , node];
  }

}
