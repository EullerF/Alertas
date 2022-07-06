import React from "react";
import { useState, useEffect, Fragment  } from 'react';
import Form from "../Form";
import Group from "../Group";
import List from "../List";
import PropTypes from 'prop-types'
import { Box, Tabs as TabsComponent, Tab, Typography } from '@material-ui/core'
import { Paper } from './style'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={4}>{children}</Box>
    </Typography>
  )
}

TabPanel.defaultProps = {
  value: 0
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number,
  index: PropTypes.number.isRequired
}

function CardAdmin ({User}) {
  const [value, setValue] = useState(0)

  const [newGroup, setNewGroup] = useState(0);
  
  const attGroup = () => {
    setNewGroup(newGroup + 1);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

    return(
        <div className="card" style={{borderRadius:'10px', marginTop:'15px'}}>
            <div className="card-header">
            </div>
            <div className="card-body">
                <h5 className="card-title text-center">Alerts </h5>
            </div>
            <Fragment>
                <Paper>
                    <TabsComponent
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                    <Tab label="Cadastro de Mensagens" />
                    <Tab label="Lista"  />
                    <Tab label="Administrar Grupos" />
                    <Tab label="Cadastro de Usuários" />
                    </TabsComponent>
                </Paper>
                    <TabPanel value={value} index={0}>
                        <div className="card-footer text-muted">
                        <Form Att={newGroup}/>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center', padding: '20px 20px 20px 20px'}}>
                        <List val={true}></List>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className="card-footer text-muted">
                        <Group attGroup={attGroup}/>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div className="card-footer text-muted">
                        Em construção
                        </div>
                    </TabPanel>
              </Fragment>
        </div>
    )
    }
export default CardAdmin;