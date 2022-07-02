class Component{
  static #classNode=0;
  static #contextNode=0;
  static #contextMap=new Map();
  #element;#class;#state={};props={}; #json;
  constructor(el,props){
    console.log(props)
    this.#element=document.querySelectorAll(`[component="${el}"]`); 
    Component.#classNode++; this.#class='ComponentNode_'+Component.#classNode; document[this.#class]=this;
    this.#json=props;
    if(props) this.props=JSON.parse(props);
    this.componentDidMount();
    this._reRender();
  }
  _reRender(){
    this.#element.forEach((element)=>{  
      if(this.#json===undefined){ element.innerHTML=this.render();
      }else if(this.#json===element.getAttribute('props')){ element.innerHTML=this.render(); }
    })
  }
  setState(newState){ this.#state={...this.#state,...newState}; this._reRender(); }
  set state(newState){ this.#state=newState; this._reRender(); }
  get state(){ return this.#state; }
  get class(){ return this.#class; }
  componentDidMount(){}
  render(){ return /*html*/`<div></div>` }
  static run(){
    const components=document.querySelectorAll(`[component]`);
    components.forEach((component)=>{
      const className=component.getAttribute('component');
      let props=component.getAttribute('props');
      try { eval('new '+className+'("'+className+'",`'+props+'`);');
      } catch (error) { console.error(error.message); alert('Error: '+error.message)
      }
    })
  }
  static createContext(initialData){
    Component.#contextNode++; const node='ContextNode_'+Component.#contextNode; Component.#contextMap.set(node,initialData);
    const getter=()=>Component.#contextMap.get(node), setter=(newValue)=>Component.#contextMap.set(node,newValue);
    return [getter,setter,node];
  }
}