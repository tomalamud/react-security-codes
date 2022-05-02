import React from "react";


function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    confirmed: false,
    deleted: false,
  });
  
  const SECURITY_CODE = 'paradigma';
  
  console.log(state)

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          setState({ ...state, error: true, loading: false});
        } else if ((state.value === SECURITY_CODE) && state.error) {
          setState({ ...state, error: false, loading: false, confirmed: true});
        } else {
          setState({ ...state, loading: false, confirmed: true  })
        }
      }, 1000)
    }
  }, [state.loading]);

  if (!state.confirmed && !state.deleted) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Porfavor, escribe el código de seguridad</p>
        
        {state.error && (
          <p>Hubo un error, el código es incorrecto</p>
        )}
  
        {state.loading && (
          <p>Cargando...</p>
        )}
        
        <input 
          placeholder="Código de seguridad"
          value={state.value}
          onChange={(event) => {
            setState({...state, value: event.target.value})
          }}
        />
        <button onClick={() => {
          setState({...state, loading: true})
        }}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <p>Pedimos confirmación ¿Estás seguro?</p>
        <button onClick={()=> {
          setState({...state, deleted: true})
        }}
        >Si</button>
        <button onClick={()=> {
          setState({...state, confirmed: false, value: ''})
        }}>No</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Eliminado con éxito</p>
        <button onClick={()=> {
          setState({
            ...state, 
            confirmed: false, 
            deleted: false, 
            value: '',
          })
        }}>Resetear</button>
      </div>
    )
  }
}

export { UseState }