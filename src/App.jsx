import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media(min-width: 992px)
  {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`


const Imagen = styled.img`
max-width: 400px;
width: 80%;
margin: 100px auto 0 auto;
display: block;
`


//style component para los h1
const Heading = styled.h1`
//insertar el tipo de letra
font-family: 'Lato',sans-serif;
//color de letra
color: #FFF;
//centrar el texto
text-align: center;
//ancho del texto
font-weight: 700;
margin-top: 80px;
margin-bottom: 50px;
font-size: 34px;

//linea de abajo de instante
&::after
{
  content: '';
  width: 100px;
  height: 6px;
  background-color: #66A2FE;
  display: block;
  margin: 10px auto 0 auto;
}

`

function App() {

  const [monedas, setMonedas]= useState({});
  const [resultado, setResultado]= useState({});
  const [cargando, setCargando]= useState(false);

  useEffect(()=>{
    if(Object.keys(monedas).length>0)
    {
      //aparece cargando
      setCargando(true);
      setResultado({});

      //comienza a consumir api para cargar contenido
      const cotizarCripto = async()=>
      {
        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        //de forma dinamica estara buscando esos valores para mostrarlos
        //cuando ponen el setResultado, directamente cuando se consulta la info, se guarda en el state
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);
        //cuando se acabe el proceso se borra el cargando
        setCargando(false);
      }
      cotizarCripto()

    }
  },[monedas])
  

  return (
    <>
      <Contenedor>

        <Imagen
          src={ImagenCripto}
          alt='Imagenes criptomonedas'
        />

        <div>

         <Heading>Cotiza Criptomonedas al Instante</Heading>

         <Formulario 
          setMonedas={setMonedas}
         />

         {cargando && <Spinner /> }
         {resultado.PRICE && <Resultado resultado={resultado} />}

        </div>

      </Contenedor>
    </>
  )
}

export default App
