import Chatter from "./components/Chatter";
import {useState} from "react";

function App() {
  const [size, setSize] = useState(6)

  const handleSizeChange = (event) => {
    let newSize = parseInt(event.target.value)
    if (newSize < 2) {
      newSize = 2
    }
    if (newSize > 10) {
      newSize = 10
    }
    setSize(newSize)
  }

  return (
    <>
      <h1>3xtr</h1>
      <section>
        <label>
          N: <input type="number" min={2} max={10} size={1} value={size} onChange={handleSizeChange}/>
        </label>
      </section>
      <Chatter size={size}/>
    </>
  );
}

export default App;
