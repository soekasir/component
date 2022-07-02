const [color,setColor]=Component.createContext('red');

class Test extends Component{

  constructor(el){
    super(el);
    this.state={
      say:'hy'
    };
  }

  componentDidMount(){
    console.log('Test1');
  }

  sayHello=()=>{
    setColor('blue');
    this.setState({
      say:'hello'
    });
  }

  render(){
    return( /*html*/`
      <div onclick="${this.class}.sayHello()" style="background-color:${color()};">
        ${this.state.say}
      </div>
    `)
  }
}

class Test2 extends Component{

  constructor(el,props){
    super(el,props);
    this.setState({
      text:'test2'
    });
  }

  componentDidMount(){
    console.log('Test2, nama bunganya:',this.props.bunga);
  }

  handleChange(e){
    this.setState({text:e.value});
  }

  render(){
    return( /*html*/`
      <div>
        ${this.state.text}
      </div>
      <input onchange="${this.class}.handleChange(this)" value="${this.state.text}"/>
    `)
  }
}
