import { Component } from "react";
import { searchVehicles, retrieveVehicle, profileCall } from "../logic";
import Detail from "./Detail";
import Search from "./Search";
import Results from "./Result";
import Profile from "./Profile";
import Unregister from "./Unregister";

class Home extends Component {

    // Crea las constantes de la CLASS Home, extiende de Component(react)
    constructor() {
        super()
        this.state = {
            view: 'search',
            query: null,
            vehicles: [],
            vehicle: null,
            favorites: []
        }
    }

    goToItem = id => {
        try {
            retrieveVehicle(id, (error, vehicle) => {
                if (error) return alert(error.message)
                this.setState({ vehicle })
            })
        } catch (error) {
            alert(error.message)
        }
    }

    //Hace la búsqueda
    onSearch = (query) => {
        this.setState({ vehicle: null, vehicles: [], query })
        try {
            searchVehicles(query, (error, vehicles) => {
                if (error) return alert(error.message)
                this.setState({ vehicles })
            })
        } catch ({message}) {
            alert(message)
        }
    }

    // Pinta la vista de búsqueda
    goToSearch = () => this.setState({ view: 'search' })
    clearVehicle = () => this.setState({ vehicle: null })
    goToProfile = () => this.setState({ view: 'profile' })
    clearVehicle = () => this.setState({ vehicle: null })
    onUnregister = () => this.setState({ view: 'unregister' })

    onPasswordUpdate = (oldPassword, newPassword) => {
        const token = sessionStorage.token;
        try {
            profileCall(oldPassword, newPassword, token, error => {
                // CAMBIAR ESTO
                if (error) {alert('Error')}
                alert('Password changed')
                this.props.onLanding();
            })
        } catch ({ message }) {
            alert(message)
        }
    }

    render() {
        const {
            state: { view, query, vehicle, vehicles },
            props: { onLanding, user:{name} },
            goToProfile,
            onSearch,
            goToItem,
            goToSearch,
            clearVehicle,
            onPasswordUpdate,
            onUnregister
        } = this

        return <div>
            <h1>Home</h1>
            <h2>Hello!!! {name}</h2>
            <button className='button' onClick={goToProfile} >Profile</button>
            <button className='button' onClick={onLanding} >Logout</button>
            {
                view === 'search' && <>
                    <Search onSearch={onSearch} query={query} />

                    {!vehicle && <Results items={vehicles}
                        onItem={goToItem} />}

                    {vehicle && <Detail
                        item={vehicle} onBack=
                        {clearVehicle} />}
                </>
            }
            {
                view === 'profile' && <>
                    <Profile onPasswordUpdate={onPasswordUpdate} onBack={goToSearch} onUnregister={onUnregister} />
                </>
            }
        </div>
    }
}

export default Home