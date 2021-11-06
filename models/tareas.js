const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor(){
        this._listado = {};
    }
    toggleCompletadas(array_ids = []){
        Object.keys(this._listado).forEach(key =>{
            this._listado[key].completadoEn = null

            array_ids.forEach(tarea_id =>{
                if(key ==tarea_id){
                    this._listado[tarea_id].completadoEn = new Date().toISOString()
                    console.log(this._listado[tarea_id].desc);
                }                
            });            
        });                
        this.listadoCompleto()
    }


    toggleCompletadasClase(array_ids = []){
        
        array_ids.forEach(tarea_id =>{
            const tarea =this._listado[tarea_id];
            tarea.completadoEn = new Date().toISOString();
        }); 
        
        this.listadoArr.forEach(tarea =>{
            if(!array_ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
        this.listadoCompleto();
    }


    borrarTarea(id = ''){
        if(id){            
            if(this._listado[id]){
                delete this._listado[id];
                console.log("Tarea borrada");
            }            
        }
        
    }

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return  listado;
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;            
        });
    }    

    crearTarea( desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        console.log('\n');
        this.listadoArr.forEach((tarea, key) =>{
            
            const index = `${key+1}`.green;
            const {completadoEn, desc} = tarea;                        
            const estado = (completadoEn) ? "Completado".green : "Pendiente".red
            console.log(`${index}. ${desc} :: ${estado}`)            
        })        
    }

    listadoPendientesCompletadas(completadas = true){
        console.log('\n');
        let index = 0;
        this.listadoArr.forEach((tarea)=>{            
        const {completadoEn, desc} = tarea;
        const estado = (completadoEn) ? "Completado".green : "Pendiente".red

            if(completadas){
                if(completadoEn){  
                    index++;              
                    console.log(`${(index+".").green} ${desc} :: ${completadoEn.green}`);
                }            
            }else{
                if(!completadoEn){      
                    index++;                            
                    console.log(`${(index+".").green} ${desc} :: ${estado}`);            
                }
            }
            
        })
    }


}

module.exports = Tareas;