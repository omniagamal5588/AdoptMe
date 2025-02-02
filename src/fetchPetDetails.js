// fetchPetDetails.js
export default async function fetchPetDetails({ queryKey }) {
  const id = queryKey[1];
  console.log("queryKey is",queryKey);
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  if (!res.ok) {
    throw new Error(`details/${id} fetch not ok`);
  }
  return res.json();
}
