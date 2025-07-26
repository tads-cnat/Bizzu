// Função da permissions para identificar qundo o path é username 

export const isUsername = (path:string) => {
    let conut = 0;
    for (let i = 0; i < path.length; i++){
        if (path[i] == "/") conut++;
    }
    if (conut == 2) return true;
    return false;

}