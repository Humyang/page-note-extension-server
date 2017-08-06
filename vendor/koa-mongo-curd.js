let DBName = ''

// 增
async function add(data,collection_name,opt){
    let insert_obj = objectAssign(
        {title,floder_uid,selfuid,isMove:false},
        this.login_status)

    let res = await this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .insert(insert_obj)
}
// 删

// 改
async function find(query,collection_name,opt){
	let res = await this.mongo
                        .db(CONFIG.dbName)
                        .collection(MODULE_CONFIG.COLLECTION)
                        .find(query_obj,{content:0})
                        .sort({_id:-1})
                        .toArray()
}

// 查

/*
oper{
	type:"" //find,findOne,update,insert,
	set:{}
	options:{
	 {'upsert':true}
	} //
}
*/
async function db(ctx,config,,data){
	// let obj = Object.assign({},uid:ctx.LOGIN_STATUS.uid,data)
	
	return [ctx.mongo
            .db(DBName)
            .collection(collection_name),obj]
}