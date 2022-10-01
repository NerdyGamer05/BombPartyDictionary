const input = document.querySelector('input');

input.addEventListener('input', displayWords);

async function displayWords(syllable) {
  syllable = syllable.target.value.replace(/\s/g, '').toLowerCase();
  
  if (syllable === "") {
    document.getElementById('long').innerHTML = "";
    return;
  }
  
  const words = await fetch('words.txt')
    .then(response => response.text())
    .then(data => data.split('\n'));
  
  const goodWords = words.filter(x => x.includes(syllable) && x.length <= 15).sort((a,b) => b.length - a.length);
  
  if (goodWords.length === 0) {
    console.log("Invalid syllable provided.")
    document.getElementById('long').innerText = "Invalid syllable provided."
    return;
  }
  
  const output = [
    goodWords.slice(0, 500),
    goodWords.reverse().slice(0, 100)
  ]

  // let shortStr = "";
  let longStr = "";
  
  for (let i = 0; i < output[0].length - 1; i += 2) {
    longStr += `${output[0][i]}${'&#160;'.repeat(3)}${output[0][i+1]}\n${'&#160;'.repeat(3)}`;
    // shortStr += `${output[1][i]}${'&#160;'.repeat(3)}${output[1][i+1]}\n${'&#160;'.repeat(3)}`
  }

  // document.getElementById('short').innerHTML = shortStr;
  document.getElementById('long').innerHTML = longStr;
    
}