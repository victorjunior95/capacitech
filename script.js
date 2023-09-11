const timestamp = Math.floor(Date.now() / 1000).toString();
console.log(timestamp);
const apiKey = "41898cab376a7b14c3de50ca402c5d09";
console.log(apiKey);
const privateKey= "5d57e340de71c73f10d3a4294ea80a655a7ee489";
console.log(privateKey);
const data = `${timestamp}${privateKey}${apiKey}`;
console.log(data);
const md5 = CryptoJS.MD5(data).toString();
console.log(md5);

const apiURL = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${md5}&limit=20`;

fetch(apiURL)
  .then((response) => response.json())
  .then((jsonParsed) => {
    const divHero = document.querySelector('#hero');
    const arrayJson = jsonParsed.data.results;

    console.log(arrayJson);

    for(let index = 0; index < arrayJson.length; index++) {
      const element = arrayJson[index];

      const srcImage = element.thumbnail.path + '.' + element.thumbnail.extension;
      const nameHero = element.name;

      createDivHero(srcImage, nameHero, divHero);
    };
  });

  function createDivHero(srcImage, nameHero, divAppend) {
    const divPai = document.createElement('div');
    const divFilho = document.createElement('div');
    const tagName = document.createElement('text');
    const img = document.createElement('img');

    tagName.textContent = nameHero;
    img.src = srcImage;

    divFilho.appendChild(img);
    divFilho.appendChild(tagName);
    divPai.appendChild(divFilho);
    divAppend.appendChild(divPai);

    divPai.classList.add("personagem");
  }