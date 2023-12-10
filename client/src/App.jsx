import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [userInput, setUserInput] = useState("");


  useEffect(() => {
    //fetch database messages on load
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8001/messages")
        const data = await response.json()
        setData(data);
        console.log("Fetch complete.")
      } catch (error) {
        console.error("Error getting messages:", error)
      }
    }
    fetchData();
  },[]);

  const handleOnChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleOnClick = async (e) => {
    e.preventDefault();
    if (!userInput) {
      return;
    }
      try {
        const fetchOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userInput,
          }),
        }
        const response = await fetch("http://localhost:8001/new", fetchOptions)
        const newData = await response.json();
        //update the data variable with the new data so it is displayed instantly - requires the route to also return the new data once it has added it to the database
        setData(newData) 

      } catch (error) {
        console.error("There was an error posting the message:", error)
      }
  }


  return (
    <div>

      <h1>Docker + MongoDB</h1>

      <div className="card">

          <h1>Welcome,</h1>
          <h3>Current Messages:</h3>     

          {data.map(entry => (
            <p key={entry._id}>{entry.message}</p>
          ))}

      </div>
      <form  onSubmit={handleOnClick}>
        <h3>Add a new message:</h3>
        <input 
          value={userInput} 
          required 
          onChange={handleOnChange}
        />
        <button type="submit">
          Submit
        </button>
      </form>

    </div>
  )
}

export default App
