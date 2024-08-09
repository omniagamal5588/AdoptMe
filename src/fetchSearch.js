export default async function fetchSearch({queryKey}){
    const {animal,location,breed}=queryKey[1];
    const res =await fetch(`https://pets-v2.dev-apis.com/pets?animal=${animal}&city=${location}&breed=${breed}`);
    if(!res.ok){
        throw new Error(`pet serch not ok `);
    }
    return res.json();
}