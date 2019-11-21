require('./index.scss')
import Logo from './logo.png'
import Happy from './happy.jpg'

function addImg() {
    const element = document.createElement('div');

    // happy img
    let happyImg = new Image();
    happyImg.src = Happy
    element.append(happyImg);

    // logo img
    let logoImg = new Image();
    logoImg.src = Logo
    element.append(logoImg);

    return element;
}

document.body.appendChild(addImg());