import React, {Component} from "react";
import axios from "axios";
import {Card, Header, Form, Input, Icon} from "semantic-ui-react";

let endpoint = "http://localhost:9000";

class ToDoList extends Component{
    constructor(props){
        super(props);

        this.state = {
            task:"",
            items:[],
        };
    }

    componentDidMount(){
        this.getTask();
    }
    onChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value,
        });
    };

    onSubmit = () => {
        let {task} = this.state;

        if (task){
            axios.post(endpoint + "/api/tasks", 
                {task,},
                {headers:{
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
    ).then((res) => {
        this.getTask();
        this.setState({
            task:"",
        });
        console.log(res);
        });
        }
    }

    getTask = () => {
        axios.get(endpoint + "/api/tasks").then((res)=>{
            if(res.data){
                this.setState({
                    items: res.data.map((item)=>{
                        let color = "yellow";
                        let style = {
                            wordWrap: "break-word",
                        };

                        if(item.status){
                            color = "green";
                            style["textDecorationLine"] = "line-through";
                        }
                        return(
                            <Card key={item._id} color={color} fluid className="rough">
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>
                                </Card.Content>

                                <Card.Meta textAlign="right">
                                {!item.status && (
                                    <>
                                    <Icon
                                    name="check circle"
                                    color="blue"
                                    onClick={() => this.updateTask(item._id)}
                                    />
                                    <span onClick={() => this.updateTask(item._id)} style={{paddingRight: 10, cursor: "pointer"}}>Done</span>
                                    </>)}
                                    {item.status && (
                                    <><Icon
                                    name="undo"
                                    color="yellow"
                                    onClick={() => this.undoTask(item._id)}
                                    />
                                    <span onClick={() => this.undoTask(item._id)} style={{paddingRight: 10, cursor: "pointer"}}>Undo</span>
                                    </>)}<Icon
                                    name="delete"
                                    color="red"
                                    onClick={() => this.deleteTask(item._id)}
                                    />
                                    <span onClick={() => this.deleteTask(item._id)} style={{paddingRight: 10, cursor: "pointer"}}>Delete</span>
                                </Card.Meta>
                            </Card>
                        );
                    }),
                });
            }else{
                this.setState({
                    items:[],
                });
            }
        });
    };

    updateTask = (id) => {
        axios.put(endpoint + "/api/tasks/complete/" + id, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    undoTask = (id) =>{
        axios.put(endpoint + "/api/tasks/undo/" + id, {
            headers:{
                "Content-Type": "applications/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    deleteTask = (id) =>{
        axios.delete(endpoint + "/api/tasks/delete/" + id, {
            headers:{
                "Content-Type": "applications/x-www-form-urlencoded",
            },
        }).then((res)=>{
            console.log(res);
            this.getTask();
        });
    }

    render(){
        return(
            <div>
                <div className="row">
                    <Header className="header" as="h2" color="yellow">
                        TO-DO LIST
                    </Header>
                </div>
                <div className="row">
                    <Form onSubmit={this.onSubmit}>
                        <Input
                        type="text"
                        name="task"
                        onChange={this.onChange}
                        value={this.state.task}
                        fluid
                        placeholder="Create Task"
                        />
                        {/*<Button type="submit" color="yellow">Create Task</Button>*/}
                    </Form>
                </div>
                <div className="row">
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default ToDoList;