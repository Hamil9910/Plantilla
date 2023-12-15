import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { List, ListItem, ListItemText } from '@material-ui/core/';
import Button from '@material-ui/core/Button';

export class Confirm extends Component {
  
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: { enfermedad_id, enfermedad_selected, enfermedad_opcion, enfermedad_checkopts,enfermedad_nombre, enfermedad_descripcion, enfermedad_file }
    } = this.props;
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Confirm Data" />
            <h2>Chequeo de Final ingreso</h2>
            <List>
              <ListItem>
                <ListItemText primary="ID enfermedad" secondary={enfermedad_id} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Tipo de Enfermedad" secondary={enfermedad_selected} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Enfermedad Hereditaria" secondary={enfermedad_opcion} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Adquisicion de Enfermedad" secondary={enfermedad_checkopts} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Nombre Enfermedad" secondary={enfermedad_nombre} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Descripcion de La Enfermedad" secondary={enfermedad_descripcion} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Documento adjunto" secondary={enfermedad_file} />
              </ListItem>
            </List>
            <br />

            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Atras</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Confirmar & Continuar</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

export default Confirm;
