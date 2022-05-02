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
  
  const onConfirm = () => {
    setState({ ...state, loading: false, confirmed: true  });
  };
  const onError = () => {
    setState({ ...state, error: true, loading: false});
  };
  const onConfirmPrevError = () => {
    setState({ ...state, error: false, loading: false, confirmed: true});
  };
  const onListen = (event) => {
    setState({...state, value: event.target.value});
  };
  const onDelete = () => {
    setState({...state, deleted: true});
  };
  const onRestart = () => {
    setState({...state, confirmed: false, delete: false, value: ''});
  };
  const onLoading = () => {
    setState({...state, loading: true});
  };

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError()
        } else if ((state.value === SECURITY_CODE) && state.error) {
          onConfirmPrevError()
        } else {
          onConfirm()
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
            onListen(event);
          }}
        />
        <button onClick={onLoading}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <p>Pedimos confirmación ¿Estás seguro?</p>
        <button onClick={onDelete}>Si</button>
        <button onClick={onRestart}>No</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Eliminado con éxito</p>
        <button onClick={onRestart}>Resetear</button>
      </div>
    );
  };
};

export { UseState };