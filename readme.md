
## Usage/Examples
see example html code [here](https://github.com/soekasir/components-html/blob/main/dist/component.html)

let say we have html like this
```html
    <!-- component Test -->
    <div component="Test"></div>
    <br/>
    <!-- component InputColor, here we use component byId -->
    <div id="InputColor"></div>
    <br>
    <!-- component Test2 with props log -->
    <div component="Test2" props-log="apa yah?"></div>
```

and components to fill it:
```javascript
//context that we need to use globally cross component
const [getColor,setColor,useColor]=Component.createContext('red');


class Test extends Component{

  constructor(el){
    super(el);
    this.state={
      say:'hy, click to change color!'
    };
    // bcs we will use getColor, so lets useColor
    // by calling this function, we tell components to re-render if color context been changed
    useColor(this);
  }

  sayHello=()=>{
    setColor('blue');
    this.setState({
      say:'hello world!'
    });
  }

  render(){
    return( /*html*/`
      <div onclick="${this.class}.sayHello()" style="background-color:${getColor()};">
        ${this.state.say}
      </div>
    `)
  }
}

class InputColor extends Component{
  constructor(el){
    super(el)
  }

  handleChange(e){
      //bcs we only set the color, and this component dont need to re-render,
      //so we not need to use function useColor in constructor 
    setColor(e.value)
  }
  
  render(){
    return( /*html*/`
      <input onchange="${this.class}.handleChange(this)" value="input color to change it!"/>
    `)
  }
}

class Test2 extends Component{

  constructor(el,props){
    super(el,props);
    this.state={
      text:'test2'
    };
  }

  componentDidMount(){
    console.log('Test2: ',this.props.log);
  }

  handleChange(e){
    this.setState({text:e.value});
  }

  render(){
    return( /*html*/`
      <div>
        text become:
        ${this.state.text}
      </div>
      <!-- onchange="${this.class}.handleChange(this)" -->
      <input onchange="${this.class}.handleChange(this)" value="${this.state.text}"/>
    `)
  }
}

//invoke component by their attribute id
new InputColor("InputColor");
//invoke component that use html attribute component
Component.run();
```

and that it, just like we use reactJs but with html instead of jsx
