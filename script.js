async function displayWords(syllable) {
  const words = await fetch('words.txt')
    .then(response => response.text())
    .then(data => data.split('\n'));
  
  const goodWords = words.filter(x => x.includes(syllable.value) && x.length <= 15 && x.length >= 4).sort((a,b) => b.length - a.length);

  console.log(syllable.value);
  
  if (goodWords.length === 0) {
    console.log("Invalid syllable provided.")
    document.getElementById('outputText').innerText = "Invalid syllable provided."
    return;
  }
  
  const output = [
    goodWords.slice(0, 20),
    goodWords.reverse().slice(0, 20)
  ]
  
  const spaceLen = output[0][0].length;
  let outputStr = "";
  
  for (let i = 0; i < output[0].length; i++) {
    outputStr += `${output[0][i]}${" ".repeat(spaceLen - output[0][i].length + 10)}${output[1][i]}\n`;
  }

  document.getElementById('outputText').innerText = outputStr;
    
}