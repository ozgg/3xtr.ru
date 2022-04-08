import {useState} from "react";
import useNgram from "./hooks/useNgram";

function App() {
  const size = 6
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [grams, feed, build] = useNgram(size)

  const spacer = Array(size - 2).fill(' ').join('')
  const prepareMessage = (input: string): string => (
      input.toLowerCase()
          .replace(/[^-\p{L}\d'`.?!]/gu, ' ') // Leave only letters and sentence ends
          .replace(/\s\s+/g, ' ') // Compact spaces
          .replace(/[.?!]+/g, spacer) // Separate sentences
          .replace(/^\s*(\S.+)/g, spacer + ' $1')
          .replace(/(\S)\s*$/, '$1 ' + spacer)
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessages(prevMessages => [...prevMessages, message.slice(0, 1000)])
    feed(prepareMessage(message))
    setMessages(prevMessages => [...prevMessages, build()])
    setMessage('')
  }

  const handleChange = (event) => {
    setMessage(event.target.value)
  }

  return (
    <>
      <h1>3xtr</h1>
      <section>
        <ul>{messages.slice(-20).map((m, i) => <li key={i}>{m}</li>)}</ul>
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
          <th>{size}-gram</th>
          <th>Weight</th>
        </tr>
        </thead>
        <tbody>
        {Object.entries(grams).slice(0, 100).map(v => (
            <tr key={v[0]}>
              <th><span>{v[0].replaceAll(' ', '_')}</span></th>
              <td>{v[1]}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
