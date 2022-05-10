function ReadClass(Class){
    let NewClass = {};
    Class.properties.forEach((property)=>{
        let {Name,Property}= ReadProperty(property);
        NewClass[Name] = Property + '';
    });
    Class.functions.forEach(func=>{
        let {Name,Property}= ReadMethod(func);
        NewClass[Name] = Property + '';
    });
    return {Name:Class.name,Property:NewClass};
}
function ReadProperty(property){

    return {Name:property.name,Property:ReadType(property.type)};
}
function ReadMethod(method){
    let ReturnString = "(";
    let First = true;
    method.arguments.forEach((Arg)=>{
        if (!First) {
            ReturnString+=', ';
        }
        let {Name,Property} = ReadProperty(Arg);
        ReturnString += Name + ': ' + Property;
        First = false;
    });
    ReturnString += '): ' + ReadType(method.return_type);
    return {Name:method.name,Property:ReturnString};
}
function ReadType(type){
    return type.name;
}
function ReadModule(Module) {
    let NewModule = {};
    Module.classes.forEach((TheClass)=>{
        let {Name,Property} = ReadClass(TheClass);
        NewModule[Name] = Property;
    });
    return NewModule;
}

exports.default = (Test) => JSON.stringify(ReadModule(Test),null,"  ");