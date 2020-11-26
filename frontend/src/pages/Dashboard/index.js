import React, {useEffect,useState} from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './styles.css'
import socketio from 'socket.io-client'

export default function Dashboard() {

    const [spots,setSpots] = useState([]) //armazena a info do spot no state

    useEffect(() => {
        const user_id = localStorage.getItem('user')
        const socket = socketio('http://localhost:3333', {
            query: { user_id },
        })

    },[])

    useEffect(() => {
        async function loadSpots(){
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard',{
                headers : { user_id }
            })
                setSpots(response.data)
        }

        loadSpots()
        
    }, [])

    return( 
    <>
        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{ backgroundImage : `url(${spot.thumbnail_url})` }}></header>
                    <strong>{spot.company}</strong>
                    <span>{spot.price ? `R$${spot.price}/dia` : 'Gratuito'}</span>
                </li>
            ))}
        </ul>
        <Link to="/new">
            <button className="btn"> Cadastrar novo spot </button>
        </Link>
    </>)
}