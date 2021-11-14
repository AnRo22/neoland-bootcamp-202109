import React from 'react'
import { useState } from "react";
import { searchVehicles, retrieveVehicle, profileCall, FavVehicle, retrieveFav, addVehicleToCart, retrieveCartVehicles, removeVehicleFromCart, } from "../logic";
import Detail from "./Detail";
import Search from "./Search";
import Results from "./Result";
import Profile from "./Profile";
import { UnregisterCall } from "../logic";
import Favs from "./Favs";
import Cart from "./Cart";



function Home({ user, onLanding, setSpinner, onFeedback }) {

    const [vehicles, setVehicles] = useState([])

    const [vehicle, setVehicle] = useState(null)

    const [view, setView] = useState('search')

    const [query, setQuery] = useState(null)

    const [favs, setFavs] = useState([])

    const[cart, setCart] = useState([])

    const onSearch = (query) => {
        setVehicle(null)
        setVehicles([])
        setQuery(query)
        setSpinner(true)
        try {
            searchVehicles(query, (error, vehicles) => {
                if (error) {
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                    
                    return
                }
                setVehicles(vehicles)
                setSpinner(false)
            })
        } catch ({ message }) {
            setSpinner(false)
        
          
        }
    }

    const goToItem = (id) => {
        setSpinner(true)
        try {
            retrieveVehicle(id, (error, vehicle) => {
                if (error) {
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                   
                    

                    return
                }
                setVehicle(vehicle)
                setView('search')
                setSpinner(false)

            })
        } catch (error) {
            onFeedback({level:'error', message:error.message})
            setSpinner(false)
          
        }
    }

    const onFav = (id) => {
        setSpinner(true)

        try {
            FavVehicle(id, sessionStorage.token, error => {
                if (error) {
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                    
                }
                if (vehicle && vehicle.id === id) {
                    setVehicle({ ...vehicle, siFav: !vehicle.siFav })
                }

                if (vehicles.length) {
                    setVehicles(vehicles.map(vehicle => {
                        if (vehicle.id === id) {
                            return { ...vehicle, siFav: !vehicle.siFav }
                        }
                        return vehicle
                    }))
                }
                if (favs.length) {
                    setFavs(favs.filter(vehicle => vehicle.id !== id))
                }

                setSpinner(false)
            })
        } catch ({ message }) {
            setSpinner(false)
            
        }
    }

    const goToFavs = () => {
        setSpinner(true)
        try {
            retrieveFav(sessionStorage.token, (error, favs) => {
                if (error) {
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                    return
                }
                setFavs(favs)
                setView('favs')
                setSpinner(false)
            })
        } catch ({ message }) {
            setSpinner(false)
        }
    }

    const onPasswordUpdate = (oldPassword, newPassword) => {
        setSpinner(true)
        try {
            profileCall(oldPassword, newPassword, sessionStorage.token, error => {
                if (error) {
                    onFeedback({level:'error', message:'Contraseña incorrecto'})
                    setSpinner(false)
                    return
                }
                onFeedback({level:'success', message:'Cambio de contraseña correcto'})
                onPasswordUpdate();
                setSpinner(false)
            })
        } catch ({ message }) {
            setSpinner(false)
            onFeedback(message,'warn')
        }
    }

    const onUnregister = password => {
        setSpinner(true)

        try {
            setSpinner(true)
            UnregisterCall(sessionStorage.token, password,
                error => {
                    if (error) {
                        onFeedback({level:'error', message:error.message}) 
                        setSpinner(false)
                    }
                })
        } catch (error) {
            onFeedback({level:'error', message:error.message})
            setSpinner(false)

        }
    }


    const addToCart = id => {
        setSpinner(true)

        try{
            addVehicleToCart(sessionStorage.token, id, error => {
                if (error) {
                    setSpinner()
                    onFeedback(error.message)

                    return
                }

                setCart(cart.map(vehicle => {
                    if(vehicle.id === id)
                    return { ...vehicle, qty: vehicle.qty + 1}

                    return vehicle
                }))
                setSpinner(false)
            })
        } catch({message}) {
            setSpinner(false)
            
        }
    }
    
    const goToCart = () => {
        setSpinner(true)

        try {
            retrieveCartVehicles(sessionStorage.token, (error,vehicles)=> {
                if(error) {
                    setSpinner()

                    

                    return
                }

                setCart(vehicles)
                setView('cart')
                setSpinner(false)
            })
        } catch ({message}) {
            setSpinner(false)
            onFeedback({level:'warn', message:'warn'})
        }
    }

    const removeFromCart = id => {
        setSpinner(true)

        try {
            removeVehicleFromCart(sessionStorage.token, id ,error => {
                if(error) {
                    onFeedback({level:'error', message:error.message})
                    setSpinner(false)
                    
                   
                    return
                }
                setCart(cart.reduce((accum,vehicle)=> {

                    if(vehicle.id ===id) {
                        if(vehicle.qty < 2)

                        return accum

                        vehicle = {...vehicle, qty: vehicle.qty - 1}
                    }

                    accum.push(vehicle)

                    return accum
                }, []))

                setSpinner(false)
            
            })
        } catch ({message}) {
            setSpinner(false)
            onFeedback({level:'warn', message: 'warn'})
        }
    }

    const goToSearch = () => setView('search')
    const goToProfile = () => setView('profile')

    const clearVehicle = () => setVehicle(null)

    return <div>
        <h1 className="home__title">Home</h1>
        <nav className="nav__buttons">
            <button className='button' onClick={goToProfile} >Profile</button>
            <button className='button' onClick={onLanding} >Logout</button>
            <button className='button' onClick={goToFavs}>Favorites</button>
            <button className="button button" onClick={goToCart}>🛒</button>
        </nav>
        <h2 className="home__subtitle">Hello {user.name}!!!</h2>
        <div className="home__container">
        {
            view === 'search' && <>
                <Search onSearch={onSearch} query={query} />

                {!vehicle && <Results items={vehicles}
                    onItem={goToItem} onFav={onFav} />
                }

                {vehicle && <Detail item={vehicle} onBack=
                    {clearVehicle} onFav={onFav} onAddToCart={addToCart}/>
                }
            </>
        }
        {
            view === 'profile' && <>
                <Profile onPasswordUpdate={onPasswordUpdate} onBack={goToSearch} onUnregister={onUnregister}/>
            </>
        }
        {
            view === 'favs' && <Favs items={favs} onBack={goToSearch} onItem={goToItem} onFav={onFav} />
        }

        {
            view === 'cart' && <Cart items={cart} onBack={goToSearch} onItem={goToItem} onAdd={addToCart} onRemove={removeFromCart}/>
        }
        </div>
    </div>
}


export default Home