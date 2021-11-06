require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareaBorrar,
        confirmar,
        mostrarListadoCheckList 
} = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');


const main= async()=>{
    let opt = '';
    const tareas = new Tareas();    
    const tareasDB = leerDB();
    if(tareasDB){
      tareas.cargarTareasFromArray(tareasDB);
    }

    do{
      //Imprimir el menu
      opt =await  inquirerMenu();
      
      switch (opt) {
          case '1':
            //Crear tarea            
            const desc = await leerInput('Descripcion:');
            tareas.crearTarea(desc);
          break;
          case '2':
            //console.log( tareas.listadoArr);
            tareas.listadoCompleto();
          break;
          case '3':
            tareas.listadoPendientesCompletadas(true);
          break;
          case '4':
            tareas.listadoPendientesCompletadas(false);
          break;
          case '5':                        
            const ids = await mostrarListadoCheckList(tareas.listadoArr);
            console.log(ids);
            //tareas.toggleCompletadas(ids);
            tareas.toggleCompletadasClase(ids);
          break;
          case '6':                        
            const id_tarea= await listadoTareaBorrar(tareas.listadoArr);
            tareas.borrarTarea(id_tarea);
          break;    
      }
    
      guardarDB(JSON.stringify(tareas.listadoArr));
      await pausa();


    }while(opt !== '0');
    //pausa();
}

main();