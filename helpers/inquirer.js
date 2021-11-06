const inquirer = require('inquirer');
require('colors');

const preguntas =[
    {   
        type:'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${"1.".magenta} Crear Tarea`
            },
            {
                value: '2',
                name: `${"2.".magenta} Listar Tarea`
            },
            {
                value: '3',
                name: `${"3.".magenta} Listar Tareas completadas`
            },
            {
                value: '4',
                name: `${"4.".magenta} Listar Tareas pendientes`
            },
            {
                value: '5',
                name: `${"5.".magenta} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${"6.".magenta} Borrar Tarea`
            },
            {
                value: '0',
                name: `${"0.".magenta} Salir`
            }
        ]
    }
]
const inquirerMenu = async()=>{
    //console.clear();
    console.log("==================".green);
    console.log("  Seelecione una opcion".white);
    console.log("==================".green);
    const { opcion } =await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async ()=>{
  await inquirer.prompt([{
        type:'input',
        name: 'enter',
        message: `\nPresione ${'ENTER'.green} para continuar\n`,
    }]);  
}


const leerInput = async ( message ) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt(question);
    return desc;

}




const listadoTareaBorrar = async (tareas = []) =>{        
    if(tareas){
        let choices_tareas = tareas.map(item =>{       
            return {
                value: item.id,                
                name: item.desc
            }
        });
    choices_tareas.unshift({value:0, name:"Cancelar".grey});
    const preguntas = [{
        type:'rawlist',
        name: 'id_tarea',
        message: '¿Cual deseas borrar?',
        choices: choices_tareas     
    }]
    const {id_tarea }= await inquirer.prompt(preguntas);
    if(id_tarea==0){
        return null;
    }    
    const {desc }= tareas.find(e=> e.id==id_tarea);
    let mensaje =`¿Estas Seguro que deseas borrar la tarea ${desc.toUpperCase().red}?`;
    let confirm =await confirmar(mensaje);
    
    if(confirm){
        return id_tarea;
    }
    return null;
  }
}




const mostrarListadoCheckList = async (tareas = []) =>{        
    if(tareas){
        let choices = tareas.map(item =>{       
            return {
                value: item.id,                
                name: item.desc,
                checked: item.completadoEn ? true : false
            }
        });

    const preguntas = [{
        type:'checkbox',
        name: 'ids',
        message: 'Marca la tarea terminada',
        choices     
    }]
    const {ids }= await inquirer.prompt(preguntas);            
    return ids;    
  }
}







const confirmar = async ( message )=>{
    const question_confirm = [{
        type:'confirm',
        name: 'confirm',
        message: message
    }]    
    const {confirm }= await inquirer.prompt(question_confirm);
    return confirm;
}


module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareaBorrar,
    confirmar,
    mostrarListadoCheckList
}