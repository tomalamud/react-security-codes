import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  
  console.log(value)

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setError(true);
        } else if ((value === SECURITY_CODE) && error) {
          setError(prev => !prev);
          setLoading(false);
        }
        setLoading(false);
      }, 1000)
    }
  }, [loading, error]);

  return (
    <div>
      <h2>Eliminar {name}</h2>
      <p>Porfavor, escribe el código de seguridad</p>
      
      {error && (
        <p>Hubo un error, el código es incorrecto</p>
      )}

      {loading && (
        <p>Cargando...</p>
      )}
      
      <input 
        placeholder="Código de seguridad"
        value={value}
        onChange={(evento) => {
          setValue(evento.target.value)
        }}
      />
      <button onClick={() => setLoading(prevState => !prevState)}>Comprobar</button>
    </div>
  );
}

export { UseState }