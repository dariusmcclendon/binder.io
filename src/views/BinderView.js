//Tabbed Binder Viewing page
import CreateBinderForm from '../components/CreateBinder'
import NoteCards from '../components/NoteCards'
import EditBinderButton from '../components/EditBinder'
import {React, useState, useEffect} from 'react'
import {Tab, Tabs, Container, Button} from 'react-bootstrap'

export default function DocumentView(props){
    //state variable for the binders array
    const [binders, setBinders] = useState([])
    const [update, setUpdate] = useState(false)
    //variable to store and populate the tabs for the page. Each tab should include the title of the binder, and it should pass the binderId to the NoteCards and delete button components.
    const tabs = binders.map((binder)=>{
        return (
            <Tab key={binder.binderId} title={binder.binderTitle} eventKey={`binder${binder.binderId}`}>
                <NoteCards binderId={binder.binderId}/>
                <EditBinderButton binder={binder} update={update} setUpdate={setUpdate}/>
                <Button className="mb-3" size="sm" variant="danger" onClick={() => deleteBinder(binder.binderId)}>Delete Binder</Button>
            </Tab>
        )
    })

    const deleteBinder = async (binderId) => {
        await fetch(`https://binder-io-api.herokuapp.com/userbinders/${binderId}`,
            {method : 'DELETE',
            headers:{"Content-Type":"application/json"}                        
        })
        setUpdate(!update)
    }

    //useEffect, run getBinders function
    useEffect(()=>{
        const fetchData = async ()=>{
            let response = await fetch(`https://binder-io-api.herokuapp.com/userbinders/user/${props.userId}`)
            let data = await response.json()
            setBinders(data)
        }
       fetchData()
    }, [update])
    
    return (
        <div>
            <Container>
                <h2>Binder Viewer</h2>
                <Tabs>
                        <Tab eventKey={'#newBinder'} title="Add">
                            <CreateBinderForm userId={props.userId} update={update} setUpdate={setUpdate}/>
                        </Tab>
                        {tabs}
                </Tabs>
            </Container>
            
        </div>
    )
    }
    
