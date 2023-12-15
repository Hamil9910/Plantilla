import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dropzone from 'react-dropzone';


export class Enfermedades extends Component {

  state = {
    checkboxValues: {
      herenciaPaterna: false,
      herenciaMaterna: false,
      otro: false,
    },
    uploadedFiles: [], // Para almacenar la información de los archivos subidos
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  handleChange = (input) => (event) => {
    if (input === 'herenciaPaterna' || input === 'herenciaMaterna' || input === 'otro') {
      const updatedCheckboxValues = {
        ...this.state.checkboxValues,
        [input]: event.target.checked,
      };
      this.setState({ checkboxValues: updatedCheckboxValues });
  
      const enfermedad_checkopts = [];
      if (updatedCheckboxValues.herenciaPaterna) enfermedad_checkopts.push('Herencia Paterna');
      if (updatedCheckboxValues.herenciaMaterna) enfermedad_checkopts.push('Herencia Materna');
      if (updatedCheckboxValues.otro) enfermedad_checkopts.push('Otros');
      this.props.handleChange('enfermedad_checkopts')({
        target: { value: enfermedad_checkopts.join(', ') },
      });
    } else {
      this.props.handleChange(input)(event);
    }
  };
  

  handleDrop = (acceptedFiles) => {
    // Manejar la lógica después de soltar el archivo, por ejemplo, guardar el archivo en la carpeta "documents"
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

    // Almacena el nombre del primer archivo en el estado 'enfermedad_file'
  if (newFiles.length > 0) {
    this.props.handleChange('enfermedad_file')({
      target: { value: newFiles[0].name },
    });
  }

    this.setState((prevState) => ({
      uploadedFiles: [...prevState.uploadedFiles, ...newFiles],
    }));

    // Usa this.props.handleChange para actualizar el estado en el componente principal
    this.props.handleChange('uploadedFiles')({
      target: { value: newFiles },
    });
  };

  handleRemoveFile = (index) => {
    this.setState((prevState) => {
      const updatedFiles = [...prevState.uploadedFiles];
      updatedFiles.splice(index, 1);
      return { uploadedFiles: updatedFiles };
    });
  };

  render() {
    const { values, handleChange } = this.props;
    const { uploadedFiles } = this.state;  // <-- Agrega esta línea
    return (
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter User Details" />
            <h2>Ingreso de Enfermedades</h2>
            <TextField
              placeholder="Ingresa el Id de la enfermedad"
              label="ID enfermedad"
              onChange={handleChange('enfermedad_id')}
              defaultValue={values.enfermedad_id}
              margin="normal"
              fullWidth
            />
            <br />
            <br />
            {/* Menú desplegable */}
            <InputLabel id="tipo-enfermedad">Tipo de Enfermedad</InputLabel>
            <br/>
            <Select
              value={values.enfermedad_selected}  // Asegúrate de tener un estado para la opción seleccionada
              onChange={handleChange('enfermedad_selected')}  // Asegúrate de tener una función handleChange que maneje el cambio de la opción
              defaultValue="Sin seleccion..." // Asegúrate de tener el valor correcto
              fullWidth >

              <MenuItem value="Sin seleccion...">Seleccione su tipo de enfermedad...</MenuItem>
              <MenuItem value="Infecciosa">Infecciosa</MenuItem>
              <MenuItem value="Cardiovascular">Cardiovascular</MenuItem>
              <MenuItem value="Respiratoria">Respiratoria</MenuItem>
              <MenuItem value="Endocrina">Endocrina</MenuItem>
              {/* Agrega más elementos MenuItem según sea necesario */}
            </Select>
            {/* Fin del menú desplegable */}
            <br />
            <br />
            {/* Radio buttons */}
            <InputLabel id="tipo-enfermedad">Enfermedad Hereditaria</InputLabel>
            <br />
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="enfermedad_opcion"
                name="enfermedad_opcion"
                value={values.opcion}
                onChange={handleChange('enfermedad_opcion')}
                row
              >
                <FormControlLabel
                  value="si"
                  control={<Radio color="primary" />}
                  label="si"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="no"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            {/* Fin de los radio buttons */}
            <br />
            {/* Checkboxes */}
            <InputLabel id="adquisicion-enfermedad">Adquisición de Enfermedad</InputLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.herenciaPaterna}
                  onChange={this.handleChange('herenciaPaterna')}
                  color="primary"
                />
              }
              label="Herencia Paterna"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.herenciaMaterna}
                  onChange={this.handleChange('herenciaMaterna')}
                  color="primary"
                />
              }
              label="Herencia Materna"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.otro}
                  onChange={this.handleChange('otro')}
                  color="primary"
                />
              }
              label="Otros"
            />
            {/* Fin de los checkboxes */}
            <br />
            <TextField
              placeholder="Ingresa el nombre de la enfermedad"
              label="Nombre Enfermedad"
              onChange={handleChange('enfermedad_nombre')}
              defaultValue={values.enfermedad_nombre}
              margin="normal"
              fullWidth
            />            
            <br />
            <TextField
              placeholder="Ingrese una descripcion de la enfermedad"
              label="Descripcion de La Enfermedad"
              onChange={handleChange('enfermedad_descripcion')}
              defaultValue={values.enfermedad_descripcion}
              margin="normal"
              fullWidth
            />
            <br />      
            <br />
            {/* Zona de arrastrar y soltar */}
            <Dropzone onDrop={this.handleDrop} accept=".pdf">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} style={dropzoneStyle}>
                  <input {...getInputProps()} />
                  <p>Arrastra y suelta archivos PDF aquí, o haz clic para seleccionar archivos.</p>
                </div>
              )}
            </Dropzone>

            {/* Mostrar nombres de archivos subidos */}
            {uploadedFiles.length > 0 && (
              <div>
                <h4>Archivos Subidos:</h4>
                <ul>
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>
                      {file.name} ({file.size} bytes)
                      <Button
                        color="secondary"
                        onClick={() => this.handleRemoveFile(index)}
                      >
                        Eliminar
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* FIN de la Zona de arrastrar y soltar */}
            <br />
            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continuar</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    );
  }
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

export default Enfermedades; 
