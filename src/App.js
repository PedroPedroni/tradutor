import './App.css';
import { useEffect, useState } from 'react';
import { axios } from 'axios';
function App() {
  const [opçoes, atualizarOpçoes] = useState({});
  const [idiomaOrigem, AtualizarIdiomaOrigem] = useState('en');
  const [idiomaDestino, atualizarIdiomaDestino] = useState('en');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    axios.get('https://libretranslate.de/languages', { headers: { 'accept': "application/json" } })
      .then((response) => { atualizarOpçoes(response.data) })


  }, []);

  const traduzir = () => {
    const parametros = new URLSearchParams();
    parametros.append('q', input);
    parametros.append('source', idiomaOrigem);
    parametros.append('target', idiomaDestino);
    parametros.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    axios.post("https://libretranslate.de/translate", parametros, {
      headers: {
        'accept': "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => { setOutput(response.data.translatedText) })
  }





  return (
    <div className="App">
      <div>
        de:({idiomaOrigem})
        <select onChange={(selecao) => AtualizarIdiomaOrigem(selecao.target.value)}>
          {opçoes.map((idioma) => (
            <option key={idioma.code} value={idioma.code}>{idioma.name}</option>
          ))}
        </select>

        para:({idiomaDestino})
        <select onChange={(selecao) => atualizarIdiomaDestino(selecao.target.value)}>
          {opçoes.map((idioma) => (
            <option key={idioma.code} value={idioma.code}>{idioma.name}</option>
          ))}
        </select>




      </div>

      <div><textarea cols="60" rows="20" onInput={(selecao) => setInput(selecao.target.value)}></textarea></div>

      <div><textarea cols="60" rows="20" value={output}></textarea></div>

      <div><button onClick={selecao => traduzir()}>Traduzir</button></div>

    </div>
  )
}

export default App;
