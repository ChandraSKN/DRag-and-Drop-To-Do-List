import React, { Fragment, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from 'lodash';
import toDo from "./Gallery/to_do.jpg";
import Tooltip from '@mui/material/Tooltip';
import deletetask from './Gallery/delete.png'

import { v4 } from "uuid";

import hand from "./Gallery/hand_icon.jpg";

import { Card, Row, Col } from 'react-bootstrap';

function App() {

  const [titles, setTitles] = useState("");
  const [descrip, setDescrip] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tasks1 = {
    id: v4(),
    name: "To_Do_task",
    description: "Upload everything in github"
  }
  const tasks2 = {
    id: v4(),
    name: "To_Do_inprogess_task",
    description: "Upload everything in github"
  }
  const tasks3 = {
    id: v4(),
    name: "To_Do_Complete_Task",
    description: "Upload everything in github"
  }
  const tasks4 = {
    id: v4(),
    name: "To_Do_notrequired_task",
    description: "Upload everything in github"
  }

  const [task, setTask] = useState({
    "todo": {
      title: "ToDo",
      descriptiom: "ToDo_Description",
      tasks: [tasks1]
    },
    "in-progress": {
      title: "InProgress",
      descriptiom: "ToDo_InProgress_Description",
      tasks: [tasks2]
    },
    "Completed": {
      title: "Completed",
      descriptiom: "ToDo_Completed_Description",
      tasks: [tasks3]
    },
    "Not-Required": {
      title: "NotRequired",
      descriptiom: "ToDo_NotRequired_Description",
      tasks: [tasks4]
    }
  })

  const handleDragEnd = ({ destination, source }) => {

    console.log("from", source)
    console.log("to", destination)
    if (!destination) {
      return
    }
    if (destination.index == source.index && destination.droppableId == source.droppableId) {
      return
    }

    const taskCopy = { ...task[source.droppableId].tasks[source.index] }

    setTask(prev => {
      prev = { ...prev }
      prev[source.droppableId].tasks.splice(source.index, 1)

      prev[destination.droppableId].tasks.splice(destination.index, 0, taskCopy)

      return prev


    })
  }

  const deleteTasks = () => {
    // setTask(prev => {
    //   return{
    //     ...prev,

    //   }
    // })
  }
  const addTask = () => {
    setTask(prev => {
      return {
        ...prev,
        todo: {
          title: "title",
          tasks: [
            {
              id: v4(),
              name: titles,
              description: descrip
            },
            ...prev.todo.tasks]

        }
      }
    })
    setTitles("");
    setDescrip("");
    setOpen(false);
  }

  return (
    <Fragment>
      <div >
        <div className='header'>
          <center>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add task
            </Button>
          </center>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Your Task Here</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Row>
                  <Col>
                    <p style={{ fontWeight: 'bold' }}>Title:</p>
                    <input type="text" value={titles} onChange={(e) => setTitles(e.target.value)} />
                  </Col>
                  <Col>
                    <p style={{ fontWeight: 'bold' }}>Description:</p>
                    <input type="text" value={descrip} onChange={(e) => setDescrip(e.target.value)} />
                  </Col>
                </Row>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={addTask}>Add</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>

      <div className="main">

        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(task, (data, key) => {
            return (
              <div key={key} className={"column"}>
                <center>
                  <h2 className={'columnTitle'}>{data.title}</h2>
                </center>
                <Droppable droppableId={key}>
                  {(provided,snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style ={{
                          background: snapshot.isDraggingOver ? 'lightblue' : '#246EE9',
                          padding: 4,
                          width: 300,
                          minHeight:500
                        }}
                        // className={"droppable-col"}
                      >

                        {data.tasks.map((el, index) => {
                          return (

                            <Draggable key={el.id} index={index} draggableId={el.id}>
                              {(provided,snapshot) => {
                                return (

                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style = {{
                                      userSelect: 'none',
                                      padding:16,
                                      margin: '0 0 8px 0',
                                      minHeight: '50px',
                                      backgroundColor: snapshot.isDragging ? '#3EB489' : '#456C86',
                                      color:'white',
                                      ...provided.draggableProps.style
                                    }

                                    }
                                  >
                                    <Row>
                                      <Col>
                                      
                                        <p style={{ fontWeight: 'bold' }}>Title:</p>
                                        {el.name}
                                        
                                      </Col>
                                      <br></br>
                                      <Col>
                                        <p style={{ fontWeight: 'bold' }}>Description:</p>
                                        {el.description}
                                      </Col>

                                    </Row>
                                    <Row>
                                      <Col>
                                        
                                        <div {...provided.dragHandleProps}>
                                        <Tooltip title="Hold it to Drop it">
                                        <img src={hand} className="img" alt="hand"></img> 
                                        </Tooltip> 
                                        </div>
                                        <img src={deletetask} className="img" alt="deleteTask" onClick={deleteTasks}></img>
                                      </Col>
                                    </Row>


                                  </div>


                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </div>


            )
          })}
        </DragDropContext>
      </div>
    </Fragment>
  );
}

export default App;
