import {useState} from "react";
import {useTrigram} from "./hooks/useNgram";

function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [grams, feed] = useTrigram()

  function handleSubmit(event) {
    event.preventDefault()
    setMessages(prevMessages => [...prevMessages, message])
    feed(message)
    setMessage('')
  }

  function handleChange(event) {
    setMessage(event.target.value)
  }

  return (
    <>
      <h1>3xtr</h1>
      <section>
        <ul>{messages.map((m, i) => <li key={i}>{m}</li>)}</ul>
      </section>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea value={message} onChange={handleChange}/>
        </div>
        <div>
          <button>Send</button>
        </div>
      </form>
      <table>
        <thead>
        <tr>
          <th>3-gram</th>
          <th>Weight</th>
        </tr>
        </thead>
        <tbody>
        {Object.entries(grams).map(v => (
            <tr key={v[0]}>
              <th>{v[0]}</th>
              <td>{v[1]}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
