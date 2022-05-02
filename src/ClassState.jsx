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
    console.log(this.state.value)
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value === SECURITY_CODE) {
          this.setState({loading: false, error: false});
        } else {
          this.setState({loading: false, error: true});
        }
      }, 1000)
    }
  }
  
  render() {
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Porfavor, escribe el código de seguridad</p>
        {(error && !loading) && (
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
          onClick={() => this.setState({loading: true})}
        >Comprobar</button>
      </div>
    );
  };
};

export { ClassState };