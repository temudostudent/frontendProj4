import React from 'react'
import { userStore } from "../Stores/UserStore"
import { useState, useEffect } from 'react'

function Activity(){
    const username  = userStore((state) => state.username)
    const [activities, setActivities] = useState([])
    const [inputs, setInputs] = useState({});
    const [newactivity, setNewActivity] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/project_backend/rest/users/tasks',
                {
                    method:'GET',
                    headers:{
                        'Accept':'application/json',
                        'token': 'WvHHLG00AWT3VWuIC-Y1hZYhmrKKPqxT'
                    }
                }
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setActivities(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Optionally handle error state or display an error message
            }
        };

        fetchData();
    }, [newactivity]); // Empty dependency array ensures the effect runs only once



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
    
        setInputs(values => ({ ...values, [name]: value }))
      }
    
      const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch(`http://localhost:8080/project_backend/rest/users/admin/addTaskd`,
          {
            method: 'POST',
            headers:
            {
              'Accept': '*/*',
              'Content-Type': 'application/json',
              'token':'WvHHLG00AWT3VWuIC-Y1hZYhmrKKPqxT'

            },
            body: JSON.stringify(inputs)
    
          }
        ).then(function (response) {
          if (response.status === 200) {
            setNewActivity(inputs);
          } else {
            alert('something went wrong :(');
          }
        });
      }
    

    return(
        <div className="Activity" id="activity-outer-container">
            <div className="page-wrap" id="activity-page-wrap">
                <div> 
                    <h1>My Activities</h1>
                    <p>Welcome {username}</p>
                </div>
                <div>
                    <table className="tables" cellPadding="0" cellSpacing="0" >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(activity => 
                                <tr key = {activity.category_id}>
                                    <td>{activity.category_id}</td>
                                    <td>{activity.title}</td>
                                    <td>{activity.description}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <h1>Add a New Activity</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Activity Title:
                        <input
                            type="text"
                            name="title"
                            defaultValue=""
                            onChange={handleChange}
                        />
                        </label>
                        <label>Activity Description:
                        <input
                            type="text"
                            name="description"
                            defaultValue=""
                            onChange={handleChange}
                        />
                        </label>
                        <input type="submit" value="Add" />
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Activity