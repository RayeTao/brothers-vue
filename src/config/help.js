function saveObject(key,obj) {
  localStorage.setItem(key,JSON.stringify(obj))

}

function getObjectByKey(key) {
  try{
    var obj = localStorage.getItem(key);
    return JSON.parse(obj)
  }catch (e){
    return null;
  }

}

function removeObject(key) {
 localStorage.removeItem(key)
}
export {
  saveObject,getObjectByKey,removeObject
}
