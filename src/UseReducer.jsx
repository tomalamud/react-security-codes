// crear un objeto con todoslos métodos del reducer y volverlo más declarativo.
import React from "react";

const SECURITY_CODE = 'paradigma';
const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state)
  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          dispatch({ type: actionTypes.error });
        } else if ((state.value === SECURITY_CODE) && state.error) {
          dispatch({ type: actionTypes.confrimPrevError });
        } else {
          dispatch({ type: actionTypes.confirm });
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
            dispatch({ type: actionTypes.write, payload: event.target.value });
          }}
        />
        <button onClick={() => {
          dispatch({ type: actionTypes.loading });
        }}>Comprobar</button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <div>
        <p>Pedimos confirmación ¿Estás seguro?</p>
        <button onClick={() => {
          dispatch({ type: actionTypes.delete });
        }}>Si</button>
        <button onClick={() => {
          dispatch({ type: actionTypes.reset });
        }}>No</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Eliminado con éxito</p>
        <button onClick={() => {
          dispatch({ type: actionTypes.reset });
        }}>Resetear</button>
      </div>
    );
  };
};

export { UseReducer };

// REDUCER WITH IF
// const IfReducer = (state, action) => {
//   if (action.type === 'ERROR') {
//     return {
//       ...state,
//       error: true,
//       loading: false,
//     };
//   } else if (action.type === 'CHECK') {
//     return {
//       ...state,
//       loading: true,
//     };
//   } else {
//     return {
//       ...state,
//     }
//   }
// };

// REDUCER SWITCH
// const switchReducer = (state, action) => {
//   switch (action.type) {
//     case 'ERROR':
//       return {
//         ...state,
//         error: true,
//         loading: false,
//       };
//     case 'CHECK':
//       return {
//         ...state,
//         loading: true,
//       };
//     default:
//       return {
//         ...state,
//       }
//   }
// }

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  confrimPrevError: 'CONFIRM_PREV_ERROR',
  write: 'WRITE',
  loading: 'LOADING',
  reset: 'RESET',
  delete: 'DELETE',
}

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false,
  },
  [actionTypes.confirm]: {
    ...state,
    loading: false,
    confirmed: true,
  },
  [actionTypes.confrimPrevError]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true,
  },
  [actionTypes.write]: {
    ...state,
    value: payload,
  },
  [actionTypes.loading]: {
    ...state,
    loading: true,
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true,
  },
  [actionTypes.reset]: {
    confirmed: false, 
    delete: false, 
    value: '',
  },
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}