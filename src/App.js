import './styles.css';
import { useEffect, useState } from "react"
import Welcome from './welcome';
import ID from './Id';
import Artefact from "./Artefact"
import {price} from './price';
import Modal from './Modal';


const App = () => {
    const [data, setData] = useState("")
    const [error, setError] = useState(null)
    const [show, setShow] = useState(false)
    const [userInput, setUserInput] = useState("546303")
    const [basket, setBasket] = useState([])

    const getter = async () => {
        try {
            let response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${userInput}`)
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            let newData = await response.json()
            let updatedData = await price(newData)
            setData(updatedData);
        } catch (error) {
            setError("Error could not fetch the data")
            console.log(error.message)
        }
    }

    const handleBasket = (item) => {
        basket.find(basketItem => basketItem.objectID === item.objectID) == undefined ? 
        setBasket([...basket, item]) : 
        console.log("item already in basket")
    }

    const removeHandler = (index) => {
        let newArr = [...basket]
        newArr.splice(index, 1)
        setBasket(newArr)
      }

    useEffect(() => {
        getter()
    }, [])
    if (!data) {
        return <h1>loading...</h1>
    }
    if (error) {
        return <h1>Their has been an error sorry</h1>
    }

    return (
        <div>
            <Welcome />
            <ID />
            <button onClick={() => setShow(true)}>Show basket</button><br/><br/>
            <input
                type="text"
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
            />
            <button onClick={getter}>Enter</button>
            <Artefact data={data} handleBasket={handleBasket}/>
            <Modal title="The Basket" onClose={() => setShow(false)} show={show}>
                <p>These are the items you have put in your basket</p>
                {basket.map((item) => {
                    return(
                        <div>
                        <p>{item.objectName}</p>
                        <p>{item.price}</p>
                        <button onClick={removeHandler}>Delete</button>
                        </div>
                        )})}
            </Modal>
        </div>
    )
}
export default App