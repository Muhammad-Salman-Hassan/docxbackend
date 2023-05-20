const generatedIds = new Set();

function generateUnique4DigitId() {
  let id;
  do {
    id = Math.floor(1000 + Math.random() * 9000).toString();
  } while (generatedIds.has(id));
  
  generatedIds.add(id);
  return id;
}
module.exports={
    generateUnique4DigitId
}