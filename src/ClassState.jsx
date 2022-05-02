import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      loading: false,
    };
  }
  // UNSAFE_componentWillMount() {
  //   console.log('mount') 
  // }
  // componentDidMount() {
  //   console.log('did') 
  // }
  componentDidUpdate() {
    console.log('actualización');
    if (this.state.loading) {
      setTimeout(() => {
        console.log("haciendo la validacion")
        if (this.state.value !== SECURITY_CODE) {
          this.setState({error: true});
        } else if ((this.state.value === SECURITY_CODE) && this.state.error) {
          this.setState({error: false});
          this.setState({loading: false});
        }
        this.setState({loading: false});
      }, 1000)
    }
  }
  
  render() {
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Porfavor, escribe el código de seguridad</p>
        {error && (
          <p>Hubo un error</p>
        )}
        {loading && (
          <Loading/>
        )}
        <input 
          placeholder="Código de seguridad"
          value={value}
          onChange={(event) => {
            this.setState({value: event.target.value})
          }}
        />
        <button 
          onClick={() => this.setState(prevState => ({loading: !prevState.loading}))}
        >Comprobar</button>
      </div>
    );
  };
};

export { ClassState };