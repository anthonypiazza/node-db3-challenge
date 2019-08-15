const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development)

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find(){
    return db('schemes');
    //returns entire array of schemes
}

function findById(id){
    return db('schemes')
    //returns entire array of schemes
        .where({ id })
        //returns array of objects with matching ID        
        .first()
        .then(scheme =>{
            if(scheme){
                //return user if found
                return scheme;
            }else{
                //return null if not found
                return null;
            }
        });
        //destructures array and retrieves first record from array
}


function add(scheme){
    return db('schemes')
    //returns entire array of schemes
        .insert(scheme)
        //adds scheme to array = returns ID of newly added scheme
        .then(ids => findById(ids[0]))
        //formats response as value in id key -- destructures number in array [0] to retrieve as a number value
}

function update(changes, id){
    return db('schemes')
    //returns entire array of schemes
        .where({ id })
        //filters array for id value match
        .update(changes)
        //updates match body, returns number of entries updated (integer)
        // .then(ids => {
        //     return changes;
        // })
        // .then(num => ({ scheme_name: changes.scheme_name }))
        //successful promise call that returns specific data shape in response body

}

function remove(id){
    return db('schemes')
        .where({ id })
        .del()
        .then(res => {
            if(res){
                return ({ id: Number(id) });
            }else{
                return null;
            }
        })
        // .then(res => ({ id: Number(id), scheme_name: schemeName }))
}

function findSteps(id){
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .where('steps.scheme_id', '=', id )
        .select('schemes.id','schemes.scheme_name', 'steps.step_number', 'steps.instructions')      
        .orderBy('steps.step_number');
}