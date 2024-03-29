var backendURL = "https://192.168.2.32:443";
var Cinfo = {
    "time": "",
    "user": "",
    "worksite": "",
    "floor": "",
    "unit": "",
    "part": "",
    "type": "",
    "side": "",
    "thickness": "",
    "length": "",
    "length2": "",
    "length3": "",
    "dA": "",
    "dB": "",
    "dC": "",
    "dD": "",
    "dE": "",
    "d1A": "",
    "d2A": "",
    "d1B": "",
    "d2B": "",
    "dR": "",
    "dR_P": "",
    "dH": "",
    "dW": "",
    "edgeA": "",
    "edgeB": "",
    "price": "",
    "check": "",
    "rand": "",
    "sum": "",
    "img": [],
    "groupO": "",
    "priority": "",
    "note": ""
}
var partData = {
    part1: {
        title: "90° Profile",
    },
    part2: {
        title: "30° Knife Edge",
    },
    part3: {
        title: "45° Knife Edge",
    },
    part4: {
        title: "90° 3 Way Profile",
    },
    part5: {
        title: "135° Bulkhead Profile",
    },
    part6: {
        title: "135° Profile",
    },
    part7: {
        title: "C-Cap Profile",
    },
    part8: {
        title: "Column Profile",
    },
    part9: {
        title: "Fire Rated Enclosure Double",
    },
    part10: {
        title: "Fire Rated Enclosure",
    },
    part11: {
        title: "Hat Profile",
    },
    part12: {
        title: "Multi-Step profile",
    },
    part13: {
        title: "Radius Bulkhead",
    },
    part14: {
        title: "Radius Profile",
    },
    part15: {
        title: "90° 4 Way Profile",
    }
};
var GroupOrder = [];
var tmpT = 0;
var formData;
var imgB = false;
var actualData = {};
var imgArray = {};
var imgArrayLocal = [];
var ccusttm = { name: false, data: null }
var errFabr = false;
var onccee = false;

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
function triggerFileInput() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}
{
let swiper;
function handleFileSelect() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) return;
  var reader = new FileReader();
  var randomFilename = `${generateRandomString(16)}${file.name.substring(file.name.lastIndexOf('.'))}`;
  reader.readAsDataURL(file);
  let newFormData = new FormData();
  const newFile = new File([file], randomFilename, {
      type: file.type,
  });
  newFormData.append('image', newFile);
  formData = newFormData;
  reader.onload = function(e) {
    if (!onccee) {
      swiper = new Swiper('.mySwiper', {
        spaceBetween: 5,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 1,
        slideToClickedSlide: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
    onccee = true;
    var newIMGDIV = document.createElement('div');
    var newIMG = document.createElement('img');
    var delBut = document.createElement('button');
    delBut.innerText = 'Delete';
    delBut.style.position = 'absolute';
    delBut.style.top = '1em';
    delBut.style.left= '50%';
    delBut.style.transform = 'translateX(-50%)';
    delBut.className = 'delImgBtn';
    delBut.addEventListener('click', function() {
      var slideIndex = Array.from(newIMGDIV.parentNode.children).indexOf(newIMGDIV);
      newIMGDIV.remove();
      if (slideIndex > 0) {
          swiper.slideTo(slideIndex - 1);
      }
      swiper.update();
      delete imgArray[randomFilename];
      for (let i = 0; i < imgArrayLocal.length; i++) {
        if (imgArrayLocal[i] === randomFilename) {
            imgArrayLocal.splice(i, 1);
            break;
        }
      }
    });
    newIMGDIV.className = 'swiper-slide';
    newIMGDIV.style.position = 'relative';
    newIMG.src = e.target.result;
    newIMGDIV.appendChild(newIMG);
    newIMGDIV.appendChild(delBut);
    document.getElementById('IMGtoAdd').appendChild(newIMGDIV);
    
      
  };
  imgArrayLocal.push(randomFilename);
  imgArray[randomFilename] = formData;
  imgB = true;
}
}
{
const script1 = document.createElement('script');
script1.src = "https://unpkg.com/swiper/swiper-bundle.min.js";
document.head.appendChild(script1);
}
function noteSelClick(that) {
  document.getElementById('note').value = that.value;
}
//____________________________________________________________________________________________________________________________________________________
//Top right info logic

function getUser() {
    let cookies = document.cookie.split('; ');
    for(let i = 0; i < cookies.length; i++) {
        let parts = cookies[i].split('=');
        if(parts[0] === "username4221") {
            Cinfo.user = parts[1];
            document.getElementById('TopUser').children[0].innerText = parts[1];
        }
    }
}

function outsideClickListener(event) {
  const panel = document.getElementById('notifPanel');
  if (!panel.contains(event.target)) {
    panel.style.scale = '0';
    document.removeEventListener('click', outsideClickListener);
  }
}

document.getElementById('TopUser').addEventListener('click', function() {
  const user = this.getBoundingClientRect();
  const panel = document.getElementById('notifPanel');
  if (panel.style.scale === '0' || !panel.style.scale) {
    panel.style.right = '2.8vw';
    panel.style.top = user.bottom + 'px';
    panel.style.scale = '1';
    setTimeout(() => {
      document.addEventListener('click', outsideClickListener);
    }, 0);
  } else {
    panel.style.scale = '0';
    document.removeEventListener('click', outsideClickListener);
  }
});

document.getElementById('Discon').addEventListener('click', function() {
    document.cookie = 'username4221=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/; Domain=192.168.2.32;';
    Cinfo = undefined;
    GroupOrder = undefined;
    tmpT = undefined;
    formData = undefined;
    imgB = undefined;
    actualData = undefined;
    imgArray = undefined;
    ccusttm = undefined;
    errFabr = undefined;
    partData = undefined;
    listContainer = undefined;
    toggleActive = undefined;
    fetchData = undefined;
    toggleActive = undefined;
    fetchData = undefined;
    fetchFloors = undefined;
    fetchUnits = undefined;
    delFloorButton = undefined;
    edFloorButton = undefined;
    addFloorButton = undefined;
    delUnitButton = undefined;
    edUnitButton = undefined;
    addUnitButton = undefined;
    savde = undefined;
    fbrc = undefined;
    jbead = undefined;
    save2 = undefined;
    save3 = undefined;
    save4 = undefined;
    save5 = undefined;
    save6 = undefined;
    save7 = undefined;
    save8 = undefined;
    save9 = undefined;
    save10 = undefined;
    save11 = undefined;
    save12 = undefined;
    save13 = undefined;
    save14 = undefined;
    save15 = undefined;
    save16 = undefined;
    imageBoxes = undefined;
    fetchProgressData = undefined;
    storedd = undefined;
    onccee = undefined;
    fetch("https://192.168.2.32:443/login98", {
            method: 'GET',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(html => {
            for (var i = 1; i < 100; i++) {
                clearInterval(i);
            }
            document.body.innerHTML = html[0];
            document.head.innerHTML = html[1];
            var script = document.createElement('script');
            script.innerHTML = html[2];
            document.body.appendChild(script);
            history.replaceState({ page: 1 }, "", "/");
            document.removeEventListener('click', outsideClickListener);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

getUser();

//____________________________________________________________________________________________________________________________________________________
//Location logic

var listContainer = document.getElementById('listContainer');
var floorContainer = document.getElementById('floorContainer');
var unitContainer = document.getElementById('unitContainer');

var toggleActive = (element) => {
    // Clear 'active' class from siblings
    const siblings = element.parentNode.children;
    for (let i = 0; i < siblings.length; i++) {
        siblings[i].classList.remove('active');
    }
    // Set 'active' class for clicked element
    element.classList.add('active');
};

var fetchData = async () => {
    try {
        const response = await fetch(backendURL + '/getWorksites');
        const data = await response.json();

        data.worksites.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-item';
            listItem.textContent = item.worksite;
            listItem.addEventListener('click', () => {
                if (GroupOrder.length > 0) {
                  alert("Please send the Group Order, or delete it");
                  return;
                }
                toggleActive(listItem);
                Cinfo.unit = "";
                Cinfo.worksite = item.worksite;
                fetchProgressData();
                unitContainer.innerHTML = '';
                fetchFloors();
                document.getElementById('unitBC').style.display = 'none';
            });
            listContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching worksites:', error);
    }
};

var fetchFloors = async () => {
      try {
        const response = await fetch(backendURL + '/getFloors', {
            method: 'POST',
            body: JSON.stringify({ worksite: Cinfo.worksite }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        floorContainer.innerHTML = '';

        if (Array.isArray(data.floors)) {
            data.floors.forEach(item => {
                const floorItem = document.createElement('li');
                floorItem.className = 'list-item';
                floorItem.textContent = item.floor;
                floorItem.setAttribute('data-floor', item.floor);
                
                floorItem.addEventListener('click', async () => {
                    toggleActive(floorItem);
                    Cinfo.unit = "";
                    Cinfo.floor = item.floor;

                    fetchUnits();
                });

                floorContainer.appendChild(floorItem);
            });
            document.getElementById('floorBC').style.display = 'flex';
        } else {
            console.error('Received data does not contain a floors array:', data);
        }

    } catch (error) {
        console.error('Error fetching floors:', error);
    }
};
var fetchUnits = async () => {
        try {
          const response = await fetch(backendURL + '/getUnits', {
            method: 'POST',
            body: JSON.stringify({ worksite: Cinfo.worksite, floor: Cinfo.floor }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        unitContainer.innerHTML = '';
        document.getElementById('unitBC').style.display = 'flex';

        if (Array.isArray(data.units)) {
            data.units.forEach(item => {
                const unitItem = document.createElement('li');
                unitItem.className = 'list-item';
                unitItem.textContent = item.unit;
                unitItem.setAttribute('data-unit', item.unit);

                // You can expand on this as needed
                unitItem.addEventListener('click', () => {
                    toggleActive(unitItem);
                    Cinfo.unit = item.unit;
                });

                unitContainer.appendChild(unitItem);
            });
        } else {
            console.error('Received data does not contain a units array:', data);
        }

    } catch (error) {
        console.error('Error fetching units:', error);
    }
};
var delFloorButton = document.getElementById('delFloor');
var edFloorButton = document.getElementById('edFloor');
var addFloorButton = document.getElementById('addFloor');
delFloorButton.addEventListener('click', handleDeleteFloor);
edFloorButton.addEventListener('click', handleEditFloor);
addFloorButton.addEventListener('click', handleAddFloor);
async function handleDeleteFloor() {
    try {
        const response = await fetch(backendURL + '/delFloor', {
            method: 'POST',
            body: JSON.stringify({
                worksite: Cinfo.worksite,
                floor: Cinfo.floor
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseBody = await response.text();
        if (responseBody === "ok") {
          document.querySelector(`li[data-floor="${Cinfo.floor}"]`).remove();
      } else if (responseBody === "no") {
          alert("Can't delete this floor, there's order in it");
      } else {
          console.log("error");
      }
    } catch (error) {
        console.error('Error:', error);
    }
}
function handleEditFloor() {
    const floorElement = document.querySelector(`li[data-floor="${Cinfo.floor}"]`);
    const containerElement = document.createElement('div');
    const inputElement = document.createElement('input');
    const buttonElement = document.createElement('button');
    containerElement.style.display = 'flex';
    containerElement.style.flexDirection = 'column';
    containerElement.style.alignItems = 'center';
    buttonElement.style.width = 'fit-content';
    buttonElement.style.height = '2vw';
    buttonElement.style.fontSize = '0.9vw';
    buttonElement.style.backgroundColor = '#1E90FF';
    buttonElement.style.color = 'white';
    buttonElement.style.border = 'none';
    buttonElement.style.borderRadius = '5px';
    buttonElement.style.cursor = 'pointer';
    buttonElement.textContent = "Apply";
    inputElement.value = Cinfo.floor;
    containerElement.appendChild(inputElement);
    containerElement.appendChild(buttonElement);
    floorElement.replaceWith(containerElement);
    inputElement.focus();
    buttonElement.addEventListener('click', () => {
        let event = new KeyboardEvent('keydown', {
            'key': 'Enter'
        });
        inputElement.dispatchEvent(event);
    });
    inputElement.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await fetch(backendURL + '/editFloor', {
                    method: 'POST',
                    body: JSON.stringify({ worksite: Cinfo.worksite, oldFloor: Cinfo.floor, floor: inputElement.value }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    fetchFloors();
                } else {
                    console.error('Failed to edit floor');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
}
function handleAddFloor() {
    const containerElement = document.createElement('div');
    const inputElement = document.createElement('input');
    const buttonElement = document.createElement('button');
    containerElement.style.display = 'flex';
    containerElement.style.flexDirection = 'column';
    containerElement.style.alignItems = 'center';
    buttonElement.style.width = 'fit-content';
    buttonElement.style.height = '2vw';
    buttonElement.style.fontSize = '0.9vw';
    buttonElement.style.backgroundColor = '#1E90FF';
    buttonElement.style.color = 'white';
    buttonElement.style.border = 'none';
    buttonElement.style.borderRadius = '5px';
    buttonElement.style.cursor = 'pointer';
    buttonElement.textContent = "Apply";
    containerElement.appendChild(inputElement);
    containerElement.appendChild(buttonElement);
    floorContainer.appendChild(containerElement);
    inputElement.focus();
    buttonElement.addEventListener('click', () => {
        let event = new KeyboardEvent('keydown', {
            'key': 'Enter'
        });
        inputElement.dispatchEvent(event);
    });
    inputElement.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            try {
                const newFloor = inputElement.value;
                const response = await fetch(backendURL + '/addFloor', {
                    method: 'POST',
                    body: JSON.stringify({ worksite: Cinfo.worksite, floor: newFloor }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    fetchFloors();
                    inputElement.hide();
                } else {
                    console.error('Failed to add floor');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
}
var delUnitButton = document.getElementById('delUnit');
var edUnitButton = document.getElementById('edUnit');
var addUnitButton = document.getElementById('addUnit');
delUnitButton.addEventListener('click', async () => {
    try {
        const response = await fetch(backendURL + '/delUnit', {
            method: 'POST',
            body: JSON.stringify({ worksite: Cinfo.worksite, floor: Cinfo.floor, unit: Cinfo.unit }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const responseBody = await response.text();
        if (responseBody === "ok") {
            const unitToDelete = document.querySelector(`[data-unit="${Cinfo.unit}"]`);
            if (unitToDelete) {
                unitToDelete.remove();
            }
        } else if (responseBody === "no") {
          alert("Can't delete this unit, there's order in it");
        } else {
            console.error('Failed to delete unit');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
edUnitButton.addEventListener('click', () => {
    const unitToEdit = document.querySelector(`[data-unit="${Cinfo.unit}"]`);
    if (unitToEdit) {
        const containerElement = document.createElement('div');
        const inputElement = document.createElement('input');
        const buttonElement = document.createElement('button');
        containerElement.style.display = 'flex';
        containerElement.style.flexDirection = 'column';
        containerElement.style.alignItems = 'center';
        buttonElement.style.width = 'fit-content';
        buttonElement.style.height = '2vw';
        buttonElement.style.fontSize = '0.9vw';
        buttonElement.style.backgroundColor = '#1E90FF';
        buttonElement.style.color = 'white';
        buttonElement.style.border = 'none';
        buttonElement.style.borderRadius = '5px';
        buttonElement.style.cursor = 'pointer';
        buttonElement.textContent = "Apply";
        inputElement.value = Cinfo.unit;
        containerElement.appendChild(inputElement);
        containerElement.appendChild(buttonElement);
        unitToEdit.replaceWith(containerElement);
        inputElement.focus();
        buttonElement.addEventListener('click', () => {
            let event = new KeyboardEvent('keydown', {
                'key': 'Enter'
            });
            inputElement.dispatchEvent(event);
        });
        inputElement.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                try {
                    const editedUnit = inputElement.value;
                    const response = await fetch(backendURL + '/editUnit', {
                        method: 'POST',
                        body: JSON.stringify({ worksite: Cinfo.worksite, floor: Cinfo.floor, oldUnit: Cinfo.unit, unit: editedUnit }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        fetchUnits();
                        inputElement.hide();
                    } else {
                        console.error('Failed to edit unit');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        });
    }
});
addUnitButton.addEventListener('click', () => {
    const containerElement = document.createElement('div');
    const inputElement = document.createElement('input');
    const buttonElement = document.createElement('button');
    containerElement.style.display = 'flex';
    containerElement.style.flexDirection = 'column';
    containerElement.style.alignItems = 'center';
    buttonElement.style.width = 'fit-content';
    buttonElement.style.height = '2vw';
    buttonElement.style.fontSize = '0.9vw';
    buttonElement.style.backgroundColor = '#1E90FF';
    buttonElement.style.color = 'white';
    buttonElement.style.border = 'none';
    buttonElement.style.borderRadius = '5px';
    buttonElement.style.cursor = 'pointer';
    buttonElement.textContent = "Apply";
    containerElement.appendChild(inputElement);
    containerElement.appendChild(buttonElement);
    unitContainer.appendChild(containerElement);
    inputElement.focus();
    buttonElement.addEventListener('click', () => {
        let event = new KeyboardEvent('keydown', {
            'key': 'Enter'
        });
        inputElement.dispatchEvent(event);
    });
    inputElement.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            try {
                const newUnit = inputElement.value;
                const response = await fetch(backendURL + '/addUnit', {
                    method: 'POST',
                    body: JSON.stringify({ worksite: Cinfo.worksite, floor: Cinfo.floor, unit: newUnit }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    fetchUnits();
                    inputElement.hide();
                } else {
                    console.error('Failed to add unit');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});
// Initialize by fetching worksites when the page loads.
fetchData();
//____________________________________________________________________________________________________________________________________________________
// Parts logic
var savde = { type: null, side: null, thickness: null, width: null, length: null, edgeA: null, edgeB: null };

function padlock(imgElement) {
const pictureForm = document.getElementById('pictureForm');

if (imgElement.src.includes('padlockUN')) {
imgElement.src = imgElement.src.replace('padlockUN', 'padlockLO');

if (imgElement.id === 'Dtype') {
let typeSelected = false;
const typeButtons = pictureForm.querySelectorAll('.btn-group .answer-btn');

typeButtons.forEach(button => {
if (button.classList.contains('selected') && button.dataset.name === 'type') {
  savde.type = button.dataset.value;
  typeSelected = true;
}
});

if (!typeSelected) {
alert('You need to select a type value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
} else if (imgElement.id === 'Dside') {
let sideSelected = false;
const sideButtons = pictureForm.querySelectorAll('.btn-group .answer-btn');

sideButtons.forEach(button => {
if (button.classList.contains('selected') && button.dataset.name === 'side') {
  savde.side = button.dataset.value;
  sideSelected = true;
}
});

if (!sideSelected) {
alert('You need to select a side value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
} else if (imgElement.id === 'Dthickness') {
let thicknessSelected = false;
const thicknessButtons = pictureForm.querySelectorAll('.btn-group .answer-btn');

thicknessButtons.forEach(button => {
if (button.classList.contains('selected') && button.dataset.name === 'thickness') {
  savde.thickness = button.dataset.value;
  thicknessSelected = true;
}
});

if (!thicknessSelected) {
alert('You need to select a side value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
} else if (imgElement.id === 'Dwidth') {
let widthSelected = false;
const widthButtons = pictureForm.querySelectorAll('.btn-group .answer-btn');

widthButtons.forEach(button => {
if (button.classList.contains('selected') && button.dataset.name === 'width') {
  savde.width = button.dataset.value;
  widthSelected = true;
}
});

if (!widthSelected) {
alert('You need to select a side value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
} else if (imgElement.id === 'Dlength') {
let lengthSelected = false;
const lengthButtons = pictureForm.querySelectorAll('.btn-group .answer-btn');

for (const button of lengthButtons) {
if (button.classList.contains('selected') && button.dataset.name === 'length') {
  savde.length = button.dataset.value;
  lengthSelected = true;
} else if (ccusttm['name']) {
  console.log('hahaa: ' + ccusttm['data']);
  ccusttm['data'] = Cinfo.length;
  savde.length = ccusttm['data'];
  lengthSelected = true;
  ccusttm['name'] = false;
  break;
}
}

if (!lengthSelected) {
alert('You need to select a side value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
}
} else {
if (imgElement.id === 'Dlength') {
ccusttm['data'] = null;
ccusttm['name'] = false;
savde.length = null;
}
savde[imgElement.id.substring(1)] = null;
imgElement.src = imgElement.src.replace('padlockLO', 'padlockUN');
}

};

function padlock2(imgElement) {
const pictureForm = document.getElementById('pictureForm');

if (imgElement.src.includes('padlockUN')) {
imgElement.src = imgElement.src.replace('padlockUN', 'padlockLO');

if (imgElement.id === 'DedgeA') {
let typeSelected = false;
const typeButtons = pictureForm.querySelectorAll('.form-group .answer1-btn');

typeButtons.forEach(button => {
if (button.style.backgroundColor === "rgb(255, 255, 255)" && button.dataset.name === 'edgeA') {
  savde.edgeA = button.dataset.value;
  typeSelected = true;
}
});

if (!typeSelected) {
alert('You need to select a edge value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
} else if (imgElement.id === 'DedgeB') {
let sideSelected = false;
const sideButtons = pictureForm.querySelectorAll('.form-group .answer2-btn');

sideButtons.forEach(button => {
if (button.style.backgroundColor === "rgb(255, 255, 255)" && button.dataset.name === 'edgeB') {
  savde.edgeB = button.dataset.value;
  sideSelected = true;
}
});

if (!sideSelected) {
alert('You need to select a side value first');
imgElement.src = 'https://192.168.2.32:443/padlockUN';
return;
}
}
} else {
savde[imgElement.id.substring(1)] = null;
imgElement.src = imgElement.src.replace('padlockLO', 'padlockUN');
}
};

var fbrc = 0;
var jbead = 0;
function edgeFunc(that) {
  let button = that;
  if (!savde[button.getAttribute('data-name')]) {
    if (button.getAttribute('data-value') === "Fabric" && button.getAttribute('data-name') === "edgeA" && fbrc !== 2) {
      fbrc = 1;
    } else if (button.getAttribute('data-value') === "Fabric" && button.getAttribute('data-name') === "edgeA" && fbrc === 2) {
      alert('Only one edge can be Fabric');
      errFabr = true;
      return;
    }
    if (button.getAttribute('data-value') === "Fabric" && button.getAttribute('data-name') === "edgeB" && fbrc !== 1) {
      fbrc = 2;
    } else if (button.getAttribute('data-value') === "Fabric" && button.getAttribute('data-name') === "edgeB" && fbrc === 1) {
      alert('Only one edge can be Fabric');
      errFabr = true;
      return;
    }

    if (button.getAttribute('data-value') === "J-Bead" && button.getAttribute('data-name') === "edgeA" && jbead !== 2) {
      jbead = 1;
    } else if (button.getAttribute('data-value') === "J-Bead" && button.getAttribute('data-name') === "edgeA" && jbead === 2) {
      alert('Only one edge can be J-Bead');
      errFabr = true;
      return;
    }
    if (button.getAttribute('data-value') === "J-Bead" && button.getAttribute('data-name') === "edgeB" && jbead !== 1) {
      jbead = 2;
    } else if (button.getAttribute('data-value') === "J-Bead" && button.getAttribute('data-name') === "edgeB" && jbead === 1) {
      alert('Only one edge can be J-Bead');
      errFabr = true;
      return;
    }
    if (button.getAttribute('data-name') === "edgeA") {
      if (fbrc === 1 && button.getAttribute('data-value') !== "Fabric") {
        fbrc = 0;
      }
      if (jbead === 1 && button.getAttribute('data-value') !== "J-Bead") {
        jbead = 0;
      }
      let buttonss = document.querySelectorAll('.answer1-btn');
      buttonss.forEach(button => {
        button.style.backgroundColor = "transparent";
        button.style.color = "#fff";
        button.classList.add('active');
      });
    } else if (button.getAttribute('data-name') === "edgeB") {
      if (fbrc === 2 && button.getAttribute('data-value') !== "Fabric") {
        fbrc = 0;
      }
      if (jbead === 2 && button.getAttribute('data-value') !== "J-Bead") {
        jbead = 0;
      }
      let buttonss = document.querySelectorAll('.answer2-btn');
      buttonss.forEach(button => {
        button.style.backgroundColor = "transparent";
        button.style.color = "#fff";
        button.classList.add('active');
      });
    }
    button.style.backgroundColor = "#fff";
    button.style.color = "#000";
    button.classList.remove('active');
  } else {
    alert('Please unlock the padlock');
  }
}
function restOfSheet() {
  const textInputs = pictureForm.querySelectorAll('input[type="number"]');
  var tmp = "";
  var tmppp2 = HTMLElement;
  textInputs.forEach(input => {
    const inputName = input.getAttribute('name');
    if (inputName === 'dA') {
      var inputValue = input.value;
      const selectors = pictureForm.querySelectorAll('.Dselection');
      selectors.forEach(select => {
        const selecttName = select.getAttribute('name');
        if (selecttName === 'dA' && select.value !== "") {
          inputValue += ("." + String(select.value));
        } else if (selecttName === 'dB') {
          tmppp2 = select;
        }
      });
      tmp = fractionToDecimal(inputValue);
      const regex = /^(?:\d+|\d+\.\d+)\/\d+$|^\d+$/;
      if (!regex.test(inputValue)) {
        alert("The dimensions are not in a valid form, they must be like: 1 or 1/2 or 1.1/2");
        return;
      }
      tmp = fractionToDecimal(inputValue);
    }
    //Cinfo[inputName] = inputValue; 
  });
  if (tmp < 19) {
    const tmppp = 24 - tmp;
    Cinfo.dB = decimalToEighthsOfInch(tmppp);
    console.log(Cinfo.dB);
    document.getElementById('dB').value = Cinfo.dB.split('.')[0];
    tmppp2.value = Cinfo.dB.split('.')[1];
  } else if (tmp < 24) {
    const userConfirmed = window.confirm("Are you sure you want dimmension B less than 6 inch ?");  
    if (userConfirmed) {
      const tmppp = 24 - tmp;
      Cinfo.dB = decimalToEighthsOfInch(tmppp);
      console.log(Cinfo.dB);
      document.getElementById('dB').value = Cinfo.dB.split('.')[0];
      tmppp2.value = Cinfo.dB.split('.')[1];
    }
  } else {
    alert("Dimension A is too big, can't be greater than 24 in");
  }
}
function restOfSheet2() {
  const textInputs = pictureForm.querySelectorAll('input[type="number"]');
  var tmp = "";
  var tmppp2 = HTMLElement;
  textInputs.forEach(input => {
    const inputName = input.getAttribute('name');
    if (inputName === 'dA') {
      var inputValue = input.value;
      const selectors = pictureForm.querySelectorAll('.Dselection');
      selectors.forEach(select => {
        const selecttName = select.getAttribute('name');
        if (selecttName === 'dA' && select.value !== "") {
          inputValue += ("." + String(select.value));
        } else if (selecttName === 'dB') {
          tmppp2 = select;
        }
      });
      tmp = fractionToDecimal(inputValue);
      const regex = /^(?:\d+|\d+\.\d+)\/\d+$|^\d+$/;
      if (!regex.test(inputValue)) {
        alert("The dimensions are not in a valid form, they must be like: 1 or 1/2 or 1.1/2");
        return;
      }
      tmp = fractionToDecimal(inputValue);
    }
    //Cinfo[inputName] = inputValue; 
  });
  if (tmp < 48) {
    const tmppp = 48 - tmp;
    Cinfo.dB = decimalToEighthsOfInch(tmppp);
    console.log(Cinfo.dB);
    document.getElementById('dB').value = Cinfo.dB.split('.')[0];
    tmppp2.value = Cinfo.dB.split('.')[1];
  } else {
    alert("Dimension A is too big, can't be greater than 48 in");
  }
}
function fractionToDecimal(frac = "") {
  if (typeof frac !== "string" || !frac.trim()) {
      return 0;
  }
  if (frac.includes('.')) {
      let [whole, fraction] = frac.split('.');
      return parseFloat(whole) + fractionToDecimal(fraction);
  }
  const [num, denom] = frac.split('/').map(Number);
  return denom ? num / denom : num;
}
var save2 = document.getElementById('MidLay2').innerHTML;
var save3 = document.getElementById('MidLay3').innerHTML;
var save4 = document.getElementById('MidLay4').innerHTML;
var save5 = document.getElementById('MidLay5').innerHTML;
var save6 = document.getElementById('MidLay6').innerHTML;
var save7 = document.getElementById('MidLay7').innerHTML;
var save8 = document.getElementById('MidLay8').innerHTML;
var save9 = document.getElementById('MidLay9').innerHTML;
var save10 = document.getElementById('MidLay10').innerHTML;
var save11 = document.getElementById('MidLay11').innerHTML;
var save12 = document.getElementById('MidLay12').innerHTML;
var save13 = document.getElementById('MidLay13').innerHTML;
var save14 = document.getElementById('MidLay14').innerHTML;
var save15 = document.getElementById('MidLay15').innerHTML;
var save16 = document.getElementById('MidLay16').innerHTML;
var imageBoxes = document.querySelectorAll('.image-box');
imageBoxes.forEach(function(imageBox) {
imageBox.addEventListener('click', handleImageClick);
});
// Function to handle the click event on the image
function handleImageClick(event) {
    if (Cinfo.unit != "") {
    event.preventDefault();
    document.getElementById('MidLay2').innerHTML = '';
    document.getElementById('MidLay3').innerHTML = '';
    document.getElementById('MidLay4').innerHTML = '';
    document.getElementById('MidLay5').innerHTML = '';
    document.getElementById('MidLay6').innerHTML = '';
    document.getElementById('MidLay7').innerHTML = '';
    document.getElementById('MidLay8').innerHTML = '';
    document.getElementById('MidLay9').innerHTML = '';
    document.getElementById('MidLay10').innerHTML = '';
    document.getElementById('MidLay11').innerHTML = '';
    document.getElementById('MidLay12').innerHTML = '';
    document.getElementById('MidLay13').innerHTML = '';
    document.getElementById('MidLay14').innerHTML = '';
    document.getElementById('MidLay15').innerHTML = '';
    document.getElementById('MidLay16').innerHTML = '';
    var imageId = this.id;
    var divv = ''
    var calcull = 0
    Cinfo.part = imageId;
    if (imageId === "part1") {
        divv = 'MidLay2';
        calcull = 1;
        document.getElementById('MidLay2').innerHTML = save2;
    } else if (imageId === "part2") {
        divv = 'MidLay3';
        calcull = 2;
        document.getElementById('MidLay3').innerHTML = save3;
    } else if (imageId === "part3") {
        divv = 'MidLay4';
        calcull = 3;
        document.getElementById('MidLay4').innerHTML = save4;
    } else if (imageId === "part4") {
        divv = 'MidLay5';
        calcull = 4;
        document.getElementById('MidLay5').innerHTML = save5;
    } else if (imageId === "part5") {
        divv = 'MidLay6';
        calcull = 5;
        document.getElementById('MidLay6').innerHTML = save6;
    } else if (imageId === "part6") {
        divv = 'MidLay7';
        calcull = 6;
        document.getElementById('MidLay7').innerHTML = save7;
    } else if (imageId === "part7") {
        divv = 'MidLay8';
        calcull = 7;
        document.getElementById('MidLay8').innerHTML = save8;
    } else if (imageId === "part8") {
        divv = 'MidLay9';
        calcull = 8;
        document.getElementById('MidLay9').innerHTML = save9;
    } else if (imageId === "part9") {
        divv = 'MidLay10';
        calcull = 9;
        document.getElementById('MidLay10').innerHTML = save10;
    } else if (imageId === "part10") {
        divv = 'MidLay11';
        calcull = 10;
        document.getElementById('MidLay11').innerHTML = save11;
    } else if (imageId === "part11") {
        divv = 'MidLay12';
        calcull = 11;
        document.getElementById('MidLay12').innerHTML = save12;
    } else if (imageId === "part12") {
        divv = 'MidLay13';
        calcull = 12;
        document.getElementById('MidLay13').innerHTML = save13;
    } else if (imageId === "part13") {
        divv = 'MidLay14';
        calcull = 13;
        document.getElementById('MidLay14').innerHTML = save14;
    } else if (imageId === "part14") {
        divv = 'MidLay15';
        calcull = 14;
        document.getElementById('MidLay15').innerHTML = save15;
    } else if (imageId === "part15") {
        divv = 'MidLay16';
        calcull = 15;
        document.getElementById('MidLay16').innerHTML = save16;
    }
    function fractionToDecimal2(frac = "") {
        if (typeof frac !== "string" || !frac.trim()) {
            return 0;
        }
        if (frac.includes(".")) {
            const [whole, fractional] = frac.split(".");
            return parseInt(whole) + fractionToDecimal(fractional);
        }
        if (frac.includes("/")) {
            const [num, denom] = frac.split("/").map(Number);
            return num / denom;
        } 
        else {
            return parseFloat(frac);
        }
    }
    function calcc() {
        var modLength = Cinfo.length;
        if (cusButOn || ccusttm['data']) {
          if (fractionToDecimal2(Cinfo.length) <= 144) {
            modLength = 12;
          } if (fractionToDecimal2(Cinfo.length) <= 120) {
            modLength = 10;
          } if (fractionToDecimal2(Cinfo.length) <= 108) {
            modLength = 9;
          } if (fractionToDecimal2(Cinfo.length) <= 96) {
            modLength = 8;
          }
        }
        Cinfo.length2 = String(Math.round(modLength));
        if (calcull === 1) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 6.66;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 7.35;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 2) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 13.63;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 14.32;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 3) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 10.64;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 11.33;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 4) {
            if (Cinfo.thickness == "1/2") {
                var mul = 8.1;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 8.79;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength)).toFixed(2);
        } else if (calcull === 15) {
            if (Cinfo.thickness == "1/2") {
                var mul = 28.75;;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 29.9;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength)).toFixed(2);
        } else if (calcull === 5) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 9.72;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 10.41;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 6) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 6.88;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 7.57;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 7) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 9.49;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 10.18;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 8) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 14.89;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 15.58;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 9) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 64.28;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 75.78;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add).toFixed(2);
        } else if (calcull === 10) {
            if (Cinfo.thickness == "1/2") {
                var mul = 32.14;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 37.89;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength)).toFixed(2);
        } else if (calcull === 11) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 14.89;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 15.58;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 12) {
            if (Cinfo.edgeA == "Plain") {
                var add = 0;
            } else if (Cinfo.edgeA == "Tapered") {
                var add = 1.75;
            } else if (Cinfo.edgeA == "D200") {
                var add = 1.5;
            } else if (Cinfo.edgeA == "Fabric") {
                var add = 0;
            } else if (Cinfo.edgeA == "J-Bead") {
                var add = 0;
            }
            if (Cinfo.edgeB == "Plain") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "Tapered") {
                var add2 = 1.75;
            } else if (Cinfo.edgeB == "D200") {
                var add2 = 1.5;
            } else if (Cinfo.edgeB == "Fabric") {
                var add2 = 0;
            } else if (Cinfo.edgeB == "J-Bead") {
                var add2 = 0;
            }
            if (Cinfo.thickness == "1/2") {
                var mul = 12.94;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 13.63;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + add + add2).toFixed(2);
        } else if (calcull === 13) {
            if (Cinfo.thickness == "1/2") {
                var mul = 28.75;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 29.9;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + 172.5).toFixed(2);
        } else if (calcull === 14) {
            if (Cinfo.thickness == "1/2") {
                var mul = 28.75;
            } else if (Cinfo.thickness == "5/8") {
                var mul = 29.9;
            }
            Cinfo.price = "$" + (mul * parseInt(modLength) + 172.5).toFixed(2);
        }
    }
    document.getElementById('MidLay1').style.scale = 0;
    document.getElementById(divv).style.scale = 1;
    document.getElementById(divv).style.zIndex = 1;
    document.getElementById('MidLay1').style.zIndex = 0;
    const answerButtons = document.querySelectorAll('.answer-btn');
    const answerButtons2 = document.querySelectorAll('.answer1-btn');
    const answerButtons3 = document.querySelectorAll('.answer2-btn');
    const pictureForm = document.getElementById('pictureForm');
    const custm = document.querySelectorAll('.custm');
    let replacedButton = null;
    let oldButton = null;
    var cusButOn = false;
    if (Object.values(savde).some(value => value !== null)) {
      const neededButtons = pictureForm.querySelectorAll('.btn-group');
      neededButtons.forEach(group => {
        const buttons = group.querySelectorAll('.answer-btn');
        buttons.forEach(button => {
          Object.entries(savde).forEach(([key, value]) => {
            if (button.dataset.name === key && button.dataset.value === value) {
              button.classList.add('selected');
              document.getElementById('D' + button.dataset.name).src = 'https://192.168.2.32/padlockLO';
              const selectedValue = event.currentTarget.getAttribute('data-value');
              Cinfo[button.dataset.name] = button.dataset.value;
            }
          });
        });
      });
      if (savde['edgeA']) {
        const neededButtons2 = pictureForm.querySelectorAll('.form-group');
        neededButtons2.forEach(group => {
          const buttons = group.querySelectorAll('.answer1-btn');
          buttons.forEach(button => {
            button.classList.add('active');
            Object.entries(savde).forEach(([key, value]) => {
              if (button.dataset.name === key && button.dataset.value === value) {
                if (button.dataset.value === 'Fabric') {
                  fbrc = 1;
                } else if (button.dataset.value === 'J-Bead') {
                  jbead = 1;
                }
                button.style.backgroundColor = "#fff";
                button.style.color = "#000";
                button.classList.remove('active');
                document.getElementById('D' + button.dataset.name).src = 'https://192.168.2.32/padlockLO';
                const selectedValue = event.currentTarget.getAttribute('data-value');
                Cinfo[button.dataset.name] = button.dataset.value;
              }
            });
          });
        });
      }
      if (savde['edgeB']) {
        const neededButtons2 = pictureForm.querySelectorAll('.form-group');
        neededButtons2.forEach(group => {
          const buttons = group.querySelectorAll('.answer2-btn');
          buttons.forEach(button => {
            button.classList.add('active');
            Object.entries(savde).forEach(([key, value]) => {
              if (button.dataset.name === key && button.dataset.value === value) {
                if (button.dataset.value=== 'Fabric') {
                  fbrc = 2;
                } else if (button.dataset.value === 'J-Bead') {
                  jbead = 2;
                }
                button.style.backgroundColor = "#fff";
                button.style.color = "#000";
                button.classList.remove('active');
                document.getElementById('D' + button.dataset.name).src = 'https://192.168.2.32/padlockLO';
                const selectedValue = event.currentTarget.getAttribute('data-value');
                Cinfo[button.dataset.name] = button.dataset.value;
              }
            });
          });
        });
      }
    }
      if (savde['length'] && savde['length'] !== 8 && savde['length'] !== 9 && savde['length'] !== 10 && savde['length'] !== 11 && savde['length'] !== 12 && document.getElementById('Dlength').src === 'https://192.168.2.32/padlockUN') {
        document.getElementById('Dlength').src = 'https://192.168.2.32/padlockLO';
        setTimeout(() => {
          custm.forEach(btn => {
              btn.click();
          });
        }, "100");
    }
    if (savde['side'] === 'Framed' && savde['thickness']) {
      const greensP = document.querySelectorAll('.greenP');
        if (Cinfo.side === "Framed" && Cinfo.thickness === "1/2") {
          greensP.forEach(grn => {
              grn.textContent = "+ 1/2";
              grn.style.color = "rgb(1, 163, 1)";
          });
        } else if (Cinfo.side === "Framed" && Cinfo.thickness === "5/8") {
          greensP.forEach(grn => {
              grn.textContent = "+ 5/8";
              grn.style.color = "rgb(1, 163, 1)";
          });
        }
    }

    function handleCustm(event) {
          ccusttm['name'] = true;
          const button = event.target;
          const input = document.createElement('input');
          input.required = true;
          input.type = 'number'
          input.style.width = '6vw';
          input.style.fontSize = "1.1vw";
          input.style.height = "1.7vw";
          input.style.lineHeight = "1.7vw";
          input.id = "len-in"
          input.setAttribute('max', '144');
          const options = {
            "": "- / -",
            "1/8": "+ 1/8",
            "1/4": "+ 1/4",
            "3/8": "+ 3/8",
            "1/2": "+ 1/2",
            "5/8": "+ 5/8",
            "3/4": "+ 3/4",
            "7/8": "+ 7/8"
          };
          const select = document.createElement("select");
          select.id = "len-sel";
          select.className = "Dselection";
          select.style.transform = "translateX(-4vw)";
          for (var value in options) {
            var option = document.createElement("option");
            option.value = value;
            option.textContent = options[value];
            select.appendChild(option);
          }
          if (ccusttm['data']) {
            if (savde['length'].indexOf('.') !== -1) {
              select.value = savde['length'].split('.')[1];
              input.value = savde['length'].split('.')[0];
            } else {
              input.value = savde['length'];
            }
            Cinfo.length = savde['length'];
          }
          const mesu = document.createElement('label');
          mesu.textContent = "inches"
          mesu.style.marginLeft = "0.4vw"
          mesu.style.transform = "translateX(-4vw)";
          const container = document.createElement('div');
          container.className = "custumm";
          container.appendChild(input);
          container.appendChild(select);
          container.appendChild(mesu);
          button.parentNode.replaceChild(container, button);
          if (!ccusttm['data']) {
            input.focus();
          }
          document.querySelectorAll('.len-btn').forEach(btn => {
              btn.classList.remove('selected');
          });
          oldButton = null;
          replacedButton = button;
          document.getElementById('len-in').addEventListener('input', handleInputChange);
          document.getElementById('len-sel').addEventListener('change', handleInputChange2);
    }
    function handleInputChange(event) {
      let value = parseFloat(event.target.value);
      if (value > 144) {
          event.target.value = 144;
      }
      if (value > 0) {
        cusButOn = true;
      } else {
        cusButOn = false;
      }
      if (ccusttm['data'] && ccusttm['data'].indexOf('.') !== -1) {
        const partts = ccusttm['data'].split('.');
        partts[0] = event.target.value;
        Cinfo.length = partts.join('.');
        ccusttm['data'] = Cinfo.length;
      } else if (ccusttm['data']) {
        Cinfo.length = event.target.value;
        ccusttm['data'] = event.target.value;
      } else {
        Cinfo.length = event.target.value;
      }
    }
    function handleInputChange2(event) {
      if (Cinfo.length < 144) {
        let value = parseFloat(event.target.value);
        if (value > 144) {
            event.target.value = 144;
        }
        if (value > 0) {
          cusButOn = true;
        } else {
          cusButOn = false;
        }
        if (ccusttm['data']) {
          const partts = ccusttm['data'].split('.');
          partts[1] = event.target.value;
          Cinfo.length = partts.join('.');
          ccusttm['data'] = Cinfo.length;
        } else {
          Cinfo.length = Cinfo.length + '.' + event.target.value;
        }
      } else {
        alert("Dimmension can't exceed 144 inch")
        event.target.value = '- / -';
      }
    }
    var olFabric = 0;
    function handleAnswerSelection(event) {
        const btnGroup = event.currentTarget.parentElement;
        oldButton = btnGroup;
        const groupName = event.currentTarget.getAttribute('data-name');
        const selectedValue = event.currentTarget.getAttribute('data-value');
        if (!savde[groupName]) {
          if (btnGroup.classList.contains('btn-group')) {
              for (const btn of btnGroup.children) {
                  btn.classList.remove('selected');
              }
              event.currentTarget.classList.add('selected');
          }
          Cinfo[groupName] = selectedValue;
          const greensP = document.querySelectorAll('.greenP');
          if (Cinfo.side === "Framed" && Cinfo.thickness === "1/2") {
            greensP.forEach(grn => {
                grn.textContent = "+ 1/2";
                grn.style.color = "rgb(1, 163, 1)";
            });
          } else if (Cinfo.side === "Framed" && Cinfo.thickness === "5/8") {
            greensP.forEach(grn => {
                grn.textContent = "+ 5/8";
                grn.style.color = "rgb(1, 163, 1)";
            });
          } else if (Cinfo.side === "Finished") {
            greensP.forEach(grn => {
                grn.style.color = "transparent";
            });
          }
        } else {
          alert('Please unlock the padlock');
        }
    }
    function handleAnswerSelection2(event) {
      const groupName = event.currentTarget.getAttribute('data-name');
      if (!savde[groupName]) {
        const groupName = event.currentTarget.getAttribute('data-name');
        const selectedValue = event.currentTarget.getAttribute('data-value');
        if (!errFabr) {
          Cinfo[groupName] = selectedValue;
        } else {
          errFabr = false;
        }
      }
    }
    answerButtons.forEach(btn => {
        btn.addEventListener('click', handleAnswerSelection);
    });
    answerButtons2.forEach(btn => {
        btn.addEventListener('click', handleAnswerSelection2);
    });
    answerButtons3.forEach(btn => {
        btn.addEventListener('click', handleAnswerSelection2);
    });
    document.querySelectorAll('.len-btn').forEach(btn => {
      btn.addEventListener('click', (event) => {
          if (!ccusttm['data']) {
            const input = document.querySelector(".custumm");
            input.parentNode.replaceChild(replacedButton, input);
            replacedButton = null;
          }
      });
    });
    custm.forEach(btn => {
        btn.addEventListener('click', handleCustm);
    });

function gcd(a, b) {
if (!b) return a;
return gcd(b, a % b);
}
function fractionToDecimal(frac = "") {
if (typeof frac !== "string" || !frac.trim()) {
return 0;
}

if (frac.includes('.')) {
let [whole, fraction] = frac.split('.');
return parseFloat(whole) + fractionToDecimal(fraction);
}

const [num, denom] = frac.split('/').map(Number);
return denom ? num / denom : num;
}
function addFractions(frac1, frac2) {
const dec1 = fractionToDecimal(frac1);
const dec2 = fractionToDecimal(frac2);
return decimalToFraction(dec1 + dec2);
}
function gdc(a, b) {
while (b !== 0) {
let t = b;
b = a % b;
a = t;
}
return a;
}
function getClosestFraction(decimal, maxDenominator = 1000000) {
let closestNumerator = 0;
let closestDenominator = 1;
let minDifference = Math.abs(decimal);

for (let denominator = 1; denominator <= maxDenominator; denominator++) {
const numerator = Math.round(decimal * denominator);
const difference = Math.abs(decimal - numerator / denominator);

if (difference < minDifference) {
    minDifference = difference;
    closestNumerator = numerator;
    closestDenominator = denominator;
}
}

return [closestNumerator, closestDenominator];
}

function decimalToFraction(decimal) {
const wholePart = Math.floor(decimal);
let fractionPart = decimal - wholePart;

const [numerator, denominator] = getClosestFraction(fractionPart);

// Convert to mixed number if numerator is larger than denominator
let mainNumber = wholePart;
let adjustedNumerator = numerator;
while (adjustedNumerator >= denominator) {
adjustedNumerator -= denominator;
mainNumber += 1;
}

if (mainNumber && adjustedNumerator !== 0) {
return `${mainNumber}.${adjustedNumerator}/${denominator}`;
} else if (adjustedNumerator !== 0) {
return `${adjustedNumerator}/${denominator}`;
} else {
return `${mainNumber}`;
}
}
const addToGroupOrderBtn = document.getElementById('addToGroupOrderBtn');

function handleAddToGroupOrder() {
// Check if all answer buttons are selected
const requiredButtons = pictureForm.querySelectorAll('.btn-group');
const requiredButtons2 = document.querySelectorAll('.answer1-btn');
const requiredButtons3 = document.querySelectorAll('.answer2-btn');
let isAllButtonsSelected = true;
var iii = 0;
requiredButtons.forEach(group => {
  iii += 1;
  const selectedButton = group.querySelector('.answer-btn.selected');
    if (!selectedButton && iii < 5) {
        console.log("11111");
        isAllButtonsSelected = false;
    } else if (iii == 5 && !cusButOn && !selectedButton && !ccusttm['data']) {
      console.log("22222");
      isAllButtonsSelected = false;
    }
});
if (requiredButtons2.length > 0) {
  var rtt1 = false;
  requiredButtons2.forEach(group => {
      if (group.classList.contains('active')) {
        rtt1 = true;
        return;
      }
  });
  if (!rtt1) {
    console.log("33333");
    isAllButtonsSelected = false;
  }
  var rtt2 = false;
  requiredButtons3.forEach(group => {
      if (group.classList.contains('active')) {
        rtt2 = true;
        return;
      }
  });
  if (!rtt2 && requiredButtons3.length > 0) {
    console.log("44444");
    isAllButtonsSelected = false;
  }
}

    // Check if all text inputs are filled
    const textInputs = pictureForm.querySelectorAll('input[type="number"]');
    let isAllTextInputsFilled = true;
    textInputs.forEach(input => {
        if (input.value.trim() === '') {
        isAllTextInputsFilled = false;
        }
    });

    // Check if all required fields are filled
    if (isAllButtonsSelected && isAllTextInputsFilled && Cinfo.unit != "") {
        if ((Cinfo.part === 'part4' || Cinfo.part === 'part11' || Cinfo.part === 'part7' ||Cinfo.part === 'part12' || Cinfo.part === 'part15') && !imgB) {
          alert('Please upload an image');
          return;
        }
        // Collect text input values and store them in Cinfo
        textInputs.forEach(input => {
          const inputName = input.getAttribute('name');
          const inputValue = input.value;
          Cinfo[inputName] = inputValue;
          const regex = /^(?:\d+|\d+\.\d+)\/\d+$|^\d+$/; 
        });
        Cinfo.note = document.getElementById('note').value;
        const selectors = pictureForm.querySelectorAll('.Dselection');
        selectors.forEach(select => {
          const selecttName = select.getAttribute('name');
          if (select.value !== "") {
            Cinfo[selecttName] += ("." + String(select.value));
          }
        });
        let dimensions = ["d1A", "d2A", "d1B", "d2B", "dA", "dB", "dC", "dD", "dE", "dH", "dR", "dR_P", "dW"];
        let thicknessValue = Cinfo.side === "Framed" ? fractionToDecimal(Cinfo.thickness) : 0;
        // Initialize the sum
        Cinfo['sum'] = 0.0;  // Ensure it's initialized as a number.
        dimensions.forEach(dim => {
            if (Cinfo[dim] && typeof Cinfo[dim] === 'string' && Cinfo[dim].trim()) {
                let decimalValue = fractionToDecimal(Cinfo[dim]);
                // If it's framed, add the thickness value
                if (Cinfo.side === "Framed") {
                    decimalValue += thicknessValue;
                }
                if (dim === "dA" && Cinfo.edgeA === "J-Bead") {
                    decimalValue -= 0.125;
                }
                if (dim === "dB" && Cinfo.edgeB === "J-Bead") {
                    decimalValue -= 0.125;
                }
                // Update the sum
                Cinfo['sum'] += decimalValue;
                // Convert it back to fraction format for display
                Cinfo[dim] = decimalToFraction(decimalValue);
            }
        });
        // Ensure we have a number and then format the sum once
        if (typeof Cinfo['sum'] === 'number') {
            Cinfo['sum'] = Cinfo['sum'].toFixed(3);  // Rounds off to 3 decimal places
        }
        if (Cinfo['width'] === '48') {
          if (parseFloat(Cinfo['sum']) > 48) {
              alert("Dimension exceeds 48 inches");
              return;
          }
        } else {
          if (parseFloat(Cinfo['sum']) > 54) {
              alert("Dimension exceeds 54 inches");
              return;
          }
        }
        calcc()
        if ((Cinfo['part'] === "part4" || Cinfo['part'] === "part15")) {
          var tmpCinf = 0;
          if (Cinfo.length === Cinfo.length2) {
            tmpCinf = Cinfo.length2*12;
          } else {
            tmpCinf = fractionToDecimal(Cinfo.length);
          }
          tmpCinf = tmpCinf + fractionToDecimal(Cinfo['dB']);
          if (tmpCinf > 144) {
            alert('Length is greater than 12ft');
            return;
          }
          if (tmpCinf <= 144) {
            Cinfo.length2 = '12';
          } if (tmpCinf <= 120) {
            Cinfo.length2 = '10';
          } if (tmpCinf <= 108) {
            Cinfo.length2 = '9';
          } if (tmpCinf <= 96) {
            Cinfo.length2 = '8';
          }
          Cinfo.length = decimalToEighthsOfInch(tmpCinf);
        }
        if (imgB) {
          Cinfo.img = imgArrayLocal;
        }
        if (Cinfo.length === Cinfo.length2) {
          Cinfo.length3 = Cinfo.length2 * 12;
        } else {
          Cinfo.length3 = Cinfo.length;
        }
        const newCinfo = { ...Cinfo };              
        GroupOrder.push(newCinfo);
        resetCinf();
        document.getElementById(divv).style.scale = 0;
        document.getElementById('MidLay1').style.scale = 1;
        document.getElementById(divv).style.zIndex = 0;
        document.getElementById('MidLay1').style.zIndex = 1;
        if (GroupOrder.length === 1) {
          createExpandableList1(newCinfo);
        } else {
          createExpandableList2(newCinfo);
        }
        return;
    } else if (!isAllButtonsSelected || !isAllTextInputsFilled) {
        alert('Please fill in all required fields.');
    } else if (Cinfo.unit === "") {
        alert('Please select the location (Worksite, Floor, Unit)');
    }
}

addToGroupOrderBtn.addEventListener('click', handleAddToGroupOrder);
document.getElementById('gbck').addEventListener('click', function() {
    fbrc = 0;
    jbead = 0;
    imgArrayLocal.forEach((item) => {
      delete imgArray[item];
    });
    resetCinf();
    document.getElementById(divv).style.scale = 0;
    document.getElementById('MidLay1').style.scale = 1;
    document.getElementById(divv).style.zIndex = 0;
    document.getElementById('MidLay1').style.zIndex = 1;
});
} else {
  alert('Please select the location (Worksite, Floor, Unit)');
}
}

//_____________________________________________________________________________________________________________________
//Right Logic
function createListItem(text, className) {
    const item = document.createElement('div');
    item.textContent = text;
    item.className = className;
    return item;
}
function mapsAreEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;        
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }         
  return true;
}
function fractionToDecimal2(frac = "") {
    if (typeof frac !== "string" || !frac.trim()) {
        return 0;
    }
    if (frac.includes(".")) {
        const [whole, fractional] = frac.split(".");
        return parseInt(whole) + fractionToDecimal(fractional);
    }
    if (frac.includes("/")) {
        const [num, denom] = frac.split("/").map(Number);
        return num / denom;
    } 
    else {
        return parseFloat(frac);
    }
}
function decimalToEighthsOfInch(decimal) {
  var wholePart = Math.floor(decimal);
  var decimalPart = decimal - wholePart;
  var nearestEighth = Math.round(decimalPart * 8) / 8;
  var fractionStr = "";
  switch (nearestEighth) {
      case 0: 
          fractionStr = "";
          break;
      case 0.125:
          fractionStr = "1/8";
          break;
      case 0.25:
          fractionStr = "1/4";
          break;
      case 0.375:
          fractionStr = "3/8";
          break;
      case 0.5:
          fractionStr = "1/2";
          break;
      case 0.625:
          fractionStr = "5/8";
          break;
      case 0.75:
          fractionStr = "3/4";
          break;
      case 0.875:
          fractionStr = "7/8";
          break;
      case 1:
          fractionStr = "";
          wholePart += 1;
          break;
  }
  return wholePart + (fractionStr ? "." + fractionStr : "");
}
function populateFloors(selectElement, y) {
  const worksite = Cinfo.worksite;
  return fetch(backendURL + '/getFloors', {
      method: 'POST',
      body: JSON.stringify({ worksite: worksite }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      selectElement.innerHTML = '';
      data.floors.forEach(item => {
          let option = document.createElement('option');
          option.value = item.floor;
          option.textContent = item.floor;
          selectElement.appendChild(option);
      });
      selectElement.value = y;
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle the error or fallback scenario
      selectElement.innerHTML = '';
      let option = document.createElement('option');
      option.value = y;
      option.textContent = y;
      let option2 = document.createElement('option');
      option2.value = 'Network error, retry';
      option2.textContent = 'Network error, retry';
      selectElement.appendChild(option);
      selectElement.appendChild(option2);
      selectElement.value = y;
      console.log("THE SUPPOSED FLOOR: ", selectElement);
  });
}

function populateUnits(selectElement, y) {
const worksite = Cinfo.worksite;
const floor = y.floor;

return fetch(backendURL + '/getUnits', {
    method: 'POST',
    body: JSON.stringify({ worksite: worksite, floor: floor }),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Response not ok for getUnits2');
    }
    return response.json();
})
.then(data => {
    selectElement.innerHTML = '';
    data.units.forEach(item => {
        let option = document.createElement('option');
        option.value = item.unit;
        option.textContent = item.unit;
        selectElement.appendChild(option);
    });
    selectElement.value = y.unit;
})
.catch(error => {
    console.error('Error:', error);
    selectElement.innerHTML = '';
    let option = document.createElement('option');
    option.value = y.unit;
    option.textContent = y.unit;
    let option2 = document.createElement('option');
    option2.value = 'Network error, retry';
    option2.textContent = 'Network error, retry';
    selectElement.appendChild(option);
    selectElement.appendChild(option2);
    selectElement.value = y.unit;
    console.log("THE SUPPOSED UNIT: ", selectElement);
});
}
function createExpandableList1(groupedData) {
    const submitButton = document.getElementById('submitButton');
    actualData[groupedData.floor] = new Set();
    actualData[groupedData.floor].add(groupedData.unit);
    const container = document.getElementById('listContainer2');
    const floorItem = createListItem(groupedData.floor, 'list-item-floor');
    floorItem.id = 'floorItem_' + groupedData.floor;
    const theArrow = document.createElement('span');
    theArrow.innerHTML = '&#8250';
    theArrow.className = 'theArrow';
    floorItem.appendChild(theArrow);
    const unitContainer = document.createElement('div');
    unitContainer.id = 'unitContainer_' + groupedData.floor;
    unitContainer.className = 'expandable-content';
    unitContainer.classList.add('list-item-follow');

    const unitItem = createListItem(groupedData.unit, 'list-item-unit');
    unitItem.id = 'unitItem_' + groupedData.floor + '_' + groupedData.unit;
    const container2 = document.createElement('div');
    container2.id = 'container2_' + groupedData.floor + '_' + groupedData.unit;
    container2.className = 'expandable-content';
    container2.classList.add('container-2');
    const partItem = createListItem(partData[groupedData.part].title, 'list-item-part');

    unitItem.onclick = function() {
        container2.classList.toggle('expanded3');
        if (!unitItem.classList.contains('expanded2')) {
          unitItem.classList.toggle('expanded2');
          container2.classList.toggle('container-23');
        } else {
          setTimeout(() => {
            unitItem.classList.toggle('expanded2');
            container2.classList.toggle('container-23');
          }, "300");
        }
    };
    const randNme = generateRandomString(20);
    const detailItem = document.createElement('div');
    const detailItem2 = document.createElement('div');
    detailItem2.style.display = 'flex';
    detailItem2.style.flexDirection = 'row';
    Object.keys(groupedData).filter(key => groupedData[key] !== "" && key !== "price" && key !== "user" && key !== "worksite" && key !== "part" && key !== "sum" && key !== "length2" && key !== "img" && key !== "null").forEach(key => {
        const detailDiv = document.createElement('div');
        const detailLabel = document.createElement('span');
        detailLabel.textContent = `${key.charAt(0).toUpperCase()}${key.slice(1)}: `;
        detailLabel.style.whiteSpace = 'nonwrap';
        detailLabel.style.width = '6vw';
        detailLabel.style.flexShrink = '0';
        detailLabel.style.marginLeft = '0.2vw';
        detailDiv.appendChild(detailLabel);
        var detailInput = HTMLElement;
        if (key === 'floor') {
            detailInput = document.createElement('select');
            populateFloors(detailInput, groupedData[key]);
        } else if (key === 'unit') {
            detailInput = document.createElement('select');
            populateUnits(detailInput, groupedData);
        } else if (key === 'type') {
          detailInput = document.createElement('select');
          var options = {
              "Regular": "Regular",
              "Mold Tuff": "Mold Tuff",
              "DensGlass": "DensGlass",
              "Type C": "Type C",
              "Type X": "Type X",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'side') {  
          detailInput = document.createElement('select');
          var options = {
              "Framed": "Framed",
              "Finished": "Finished",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'thickness') {  
          detailInput = document.createElement('select');
          var options = {
              "1/2": "1/2",
              "5/8": "5/8",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'width') {  
          detailInput = document.createElement('select');
          var options = {
              "48": "48",
              "54": "54",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'edgeA') {  
          detailInput = document.createElement('select');
          detailInput.dataName = 'edgeA';
          var options = {
              "Plain": "Plain",
              "Tapered": "Tapered",
              "D200": "D200",
              "Fabric": "Fabric",
              "J-Bead": "J-Bead",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'edgeB') {  
          detailInput = document.createElement('select');
          detailInput.dataName = 'edgeB';
          var options = {
              "Plain": "Plain",
              "Tapered": "Tapered",
              "D200": "D200",
              "Fabric": "Fabric",
              "J-Bead": "J-Bead",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'dA') {
          detailInput = document.createElement('input');
          detailInput.id = 'dA_' + randNme;
        } else if (key === 'dB') {
          detailInput = document.createElement('input');
          detailInput.id = 'dB_' + randNme;
        } else {
          detailInput = document.createElement('input');
        }
        detailInput.value = groupedData[key];
        detailInput.style.flexGrow = '1';
        detailInput.style.marginLeft = '0.5vw';
        let previousValue;
        if (detailInput.tagName === 'SELECT') {
          detailInput.addEventListener("focus", function() {
            previousValue = this.value;
          });
        }
        var dold2;
        var dold2Pass = true;
        detailInput.addEventListener('change', function(event) {
          const objectToUpdate = GroupOrder.find(obj => mapsAreEqual(obj, groupedData));
          if (objectToUpdate) {
            const dold = {...objectToUpdate};
            if (dold2Pass) {
              dold2 = {...objectToUpdate};
              dold2Pass = false;
            }
            objectToUpdate[key] = event.target.value;
            if (objectToUpdate['edgeA'] === 'Fabric' && objectToUpdate['edgeB'] === 'Fabric') {
              alert("Can't have both edges to Fabric");
              this.value = dold[key];
              objectToUpdate[key] = dold[key];
            } else if (objectToUpdate['edgeA'] === 'J-Bead' && objectToUpdate['edgeB'] === 'J-Bead') {
              alert("Can't have both edges to J-Bead");
              this.value = dold[key];
              objectToUpdate[key] = dold[key];
            }
            if (previousValue === "J-Bead" && this.value !== "J-Bead" && this.dataName === 'edgeA') {
              const inVal = fractionToDecimal2(document.getElementById('dA_' + randNme).value);
              document.getElementById('dA_' + randNme).value = decimalToEighthsOfInch(inVal + 0.125);
              objectToUpdate['dA'] = decimalToEighthsOfInch(inVal + 0.125);
              previousValue = this.value;
            } else if (previousValue === "J-Bead" && this.value !== "J-Bead" && this.dataName === 'edgeB') {
              const inVal = fractionToDecimal2(document.getElementById('dB_' + randNme).value);
              document.getElementById('dB_' + randNme).value = decimalToEighthsOfInch(inVal + 0.125);
              objectToUpdate['dB'] = decimalToEighthsOfInch(inVal + 0.125);
              previousValue = this.value;
            } else if (previousValue !== "J-Bead" && this.value === "J-Bead" && this.dataName === 'edgeA') {
              const inVal = fractionToDecimal2(document.getElementById('dA_' + randNme).value);
              document.getElementById('dA_' + randNme).value = decimalToEighthsOfInch(inVal - 0.125);
              objectToUpdate['dA'] = decimalToEighthsOfInch(inVal - 0.125);
              previousValue = this.value;
            } else if (previousValue !== "J-Bead" && this.value === "J-Bead" && this.dataName === 'edgeB') {
              const inVal = fractionToDecimal2(document.getElementById('dB_' + randNme).value);
              document.getElementById('dB_' + randNme).value = decimalToEighthsOfInch(inVal - 0.125);
              objectToUpdate['dB'] = decimalToEighthsOfInch(inVal - 0.125);
              previousValue = this.value;
            }
            if (key === 'length') {
              var modLength = event.target.value;
              if (fractionToDecimal2(event.target.value) > 12) {
                if (fractionToDecimal2(event.target.value) <= 144) {
                  modLength = 12;
                } if (fractionToDecimal2(event.target.value) <= 120) {
                  modLength = 10;
                } if (fractionToDecimal2(event.target.value) <= 108) {
                  modLength = 9;
                } if (fractionToDecimal2(event.target.value) <= 96) {
                  modLength = 8;
                }
              }
              groupedData.length2 = String(Math.round(modLength));
            }
            if (key === 'floor') {
              const floor = event.target.value;
              if (floor !== 'Network error, retry') {
                fetch(backendURL + '/getUnits', {
                    method: 'POST',
                    body: JSON.stringify({ worksite: Cinfo.worksite, floor: floor }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                  if (dold.floor === 'Network error, retry') {
                    dold.floor = dold2.floor
                  }
                  if (dold.unit === 'Network error, retry') {
                    dold.unit = dold2.unit
                  }
                  container2.removeChild(partItem);
                  container2.removeChild(detailItem);
                  if (container2.children.length === 0) {
                    unitContainer.removeChild(container2);
                    unitContainer.removeChild(unitItem)
                    actualData[dold.floor].delete(dold.unit);
                  }
                  if (unitContainer.children.length === 0) {
                    container.removeChild(unitContainer);
                    container.removeChild(floorItem);
                    delete actualData[dold.floor];
                  }
                  objectToUpdate.unit = data.units[0].unit;
                  createExpandableList2(objectToUpdate);
                })
                .catch(error => {
                    console.log("CONNECTION ERROR", error);
                    alert('No connection, retry later');
                    this.value = dold2.floor;
                });
              } else {
                populateFloors(this, dold2[key]);
              }
            }
            if (key === 'unit') {
              if (event.target.value !== 'Network error, retry') {
                if (dold.floor === 'Network error, retry') {
                  dold.floor = dold2.floor
                }
                if (dold.unit === 'Network error, retry') {
                  dold.unit = dold2.unit
                }
                container2.removeChild(partItem);
                container2.removeChild(detailItem);
                if (container2.children.length === 0) {
                  unitContainer.removeChild(container2);
                  unitContainer.removeChild(unitItem)
                  actualData[dold.floor].delete(dold.unit);
                }
                createExpandableList2(objectToUpdate);
              } else {
                populateUnits(this, dold2);
              }
            }
          }
        });
        detailInput.classList.add('grayed-out-content');
        detailInput.classList.add('grayed-out-content-div');
        detailDiv.appendChild(detailInput);
        detailDiv.style.display = 'flex';
        detailItem.appendChild(detailDiv);
    });
    detailItem.className = 'expandable-content';
    detailItem.classList.add('details');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('style', 'width: 5em; height: fit-content; font-size: 1vw; background-color: #1E90FF; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 0.2vw;');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginTop = '0.6vw';
    deleteButton.style.marginBottom = '0.2vw';
    deleteButton.style.height = '3.3vh';
    deleteButton.style.display = 'block';
    deleteButton.style.marginLeft = 'auto';
    deleteButton.style.marginRight = 'auto';
    const editButton = document.createElement('button');
    editButton.setAttribute('style', 'width: 5em; height: fit-content; font-size: 1vw; background-color: #1E90FF; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 0.2vw;');
    editButton.textContent = 'Edit';
    editButton.style.marginTop = '0.6vw';
    editButton.style.marginBottom = '0.2vw';
    editButton.style.height = '3.3vh';
    editButton.style.display = 'block';
    editButton.style.marginLeft = 'auto';
    editButton.style.marginRight = 'auto';
    editButton.onclick = function() {
      for (let i = 0; i < detailItem.children.length-1; i++) {
        detailItem.children[i].children[1].classList.toggle('grayed-out-content');
      }
      if (!detailItem.children[0].children[1].classList.contains('grayed-out-content')) {
        this.style.backgroundColor = 'green';
        this.innerText = 'Save';
      } else {
        this.style.backgroundColor = '#1E90FF';
        this.innerText = 'Edit';
      }
    }
    deleteButton.onclick = function() {
        container2.removeChild(partItem);
        container2.removeChild(detailItem);
        if (container2.children.length === 0) {
          unitContainer.removeChild(container2);
          unitContainer.removeChild(unitItem)
          actualData[groupedData.floor].delete(groupedData.unit);
        }
        if (unitContainer.children.length === 0) {
          container.removeChild(unitContainer);
          container.removeChild(floorItem);
          delete actualData[groupedData.floor];
        }
        GroupOrder = GroupOrder.filter(map => !mapsAreEqual(map, groupedData));
        if (GroupOrder.length === 0) {
          submitButton.style.display = 'none';
        }
        if (groupedData.img.length > 0) {
          groupedData.img.forEach((item) => {
            delete imgArray[item];
          });
        }
    };
    partItem.onclick = function() {
        detailItem.classList.toggle('expanded');
    };
    detailItem2.appendChild(deleteButton);
    detailItem2.appendChild(editButton);
    detailItem.appendChild(detailItem2)
    container2.appendChild(partItem);
    container2.appendChild(detailItem);
    unitContainer.appendChild(unitItem);
    unitContainer.appendChild(container2);

    floorItem.onclick = function() {
        unitContainer.classList.toggle('expanded');
        theArrow.classList.toggle('theArrow-rotated');
    };

    container.appendChild(floorItem);
    container.appendChild(unitContainer);
    submitButton.style.display = 'block';
}

function createExpandableList2(groupedData) {
    const submitButton = document.getElementById('submitButton');
    var floorItem = HTMLElement;
    var unitContainer = HTMLElement;
    var unitItem = HTMLElement;
    var container2 = HTMLElement;
    const theArrow = document.createElement('span');
    theArrow.innerHTML = '&#8250';
    theArrow.className = 'theArrow';
    var isFloor = false;
    var isUnit = false;
    if (!actualData[groupedData.floor]) {
        actualData[groupedData.floor] = new Set();
        floorItem = createListItem(groupedData.floor, 'list-item-floor');
        floorItem.id = ('floorItem_' + groupedData.floor);
        floorItem.classList.add('margin-top');
        floorItem.appendChild(theArrow);
        unitContainer = document.createElement('div');
        unitContainer.id = 'unitContainer_' + groupedData.floor
        unitContainer.className = 'expandable-content';
        unitContainer.classList.add('list-item-follow');
    } else {
        unitContainer = document.getElementById('unitContainer_' + groupedData.floor);
        isFloor = true;
    }
    if (!actualData[groupedData.floor].has(groupedData.unit)) {
        actualData[groupedData.floor].add(groupedData.unit);
        unitItem = createListItem(groupedData.unit, 'list-item-unit');
        unitItem.id = 'unitItem_' + groupedData.floor + '_' + groupedData.unit;
        container2 = document.createElement('div');
        container2.className = 'expandable-content';
        container2.classList.add('container-2');
        container2.id = 'container2_' + groupedData.floor + '_' + groupedData.unit;
    } else {
        unitItem = document.getElementById('unitItem_' + groupedData.floor + '_' + groupedData.unit)
        container2 = document.getElementById('container2_' + groupedData.floor + '_' + groupedData.unit)
        isUnit = true;
    }
    const container = document.getElementById('listContainer2');
    const partItem = createListItem(partData[groupedData.part].title, 'list-item-part');

    unitItem.onclick = function() {
        container2.classList.toggle('expanded3');
        if (!unitItem.classList.contains('expanded2')) {
          unitItem.classList.toggle('expanded2');
          container2.classList.toggle('container-23');
        } else {
          setTimeout(() => {
            unitItem.classList.toggle('expanded2');
            container2.classList.toggle('container-23');
          }, "300");
        }
    };

    const randNme = generateRandomString(20);
    const detailItem = document.createElement('div');
    const detailItem2 = document.createElement('div');
    detailItem2.style.display = 'flex';
    detailItem2.style.flexDirection = 'row';
    Object.keys(groupedData).filter(key => groupedData[key] !== "" && key !== "price" && key !== "user" && key !== "worksite" && key !== "part" && key !== "sum" && key !== "length2" && key !== "img" && key !== "null").forEach(key => {
        const detailDiv = document.createElement('div');
        const detailLabel = document.createElement('span');
        detailLabel.textContent = `${key.charAt(0).toUpperCase()}${key.slice(1)}: `;
        detailLabel.style.whiteSpace = 'nonwrap';
        detailLabel.style.width = '6vw';
        detailLabel.style.flexShrink = '0';
        detailLabel.style.marginLeft = '0.2vw';
        detailDiv.appendChild(detailLabel);
        var detailInput = HTMLElement;
        if (key === 'floor') {
            detailInput = document.createElement('select');
            populateFloors(detailInput, groupedData[key]);
        } else if (key === 'unit') {
            detailInput = document.createElement('select');
            populateUnits(detailInput, groupedData);
        } else if (key === 'type') {
          detailInput = document.createElement('select');
          var options = {
              "Regular": "Regular",
              "Mold Tuff": "Mold Tuff",
              "DensGlass": "DensGlass",
              "Type C": "Type C",
              "Type X": "Type X",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'side') {  
          detailInput = document.createElement('select');
          var options = {
              "Framed": "Framed",
              "Finished": "Finished",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'thickness') {  
          detailInput = document.createElement('select');
          var options = {
              "1/2": "1/2",
              "5/8": "5/8",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'width') {  
          detailInput = document.createElement('select');
          var options = {
              "48": "48",
              "54": "54",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'edgeA') {  
          detailInput = document.createElement('select');
          detailInput.dataName = 'edgeA';
          var options = {
              "Plain": "Plain",
              "Tapered": "Tapered",
              "D200": "D200",
              "Fabric": "Fabric",
              "J-Bead": "J-Bead",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'edgeB') {  
          detailInput = document.createElement('select');
          detailInput.dataName = 'edgeB';
          var options = {
              "Plain": "Plain",
              "Tapered": "Tapered",
              "D200": "D200",
              "Fabric": "Fabric",
              "J-Bead": "J-Bead",
          };
          for (var value in options) {
              var option = document.createElement("option");
              option.value = value;
              option.textContent = options[value];
              detailInput.appendChild(option);
          }
        } else if (key === 'dA') {
          detailInput = document.createElement('input');
          detailInput.id = 'dA_' + randNme;
        } else if (key === 'dB') {
          detailInput = document.createElement('input');
          detailInput.id = 'dB_' + randNme;
        } else {
          detailInput = document.createElement('input');
        }
        const objectToUpdate = GroupOrder.find(obj => mapsAreEqual(obj, groupedData));
        detailInput.value = groupedData[key];
        detailInput.style.flexGrow = '1';
        detailInput.style.marginLeft = '0.5vw';
        let previousValue;
        if (detailInput.tagName === 'SELECT') {
          detailInput.addEventListener("focus", function() {
            previousValue = this.value;
          });
        }
        detailInput.addEventListener('change', function(event) {
          const objectToUpdate = GroupOrder.find(obj => mapsAreEqual(obj, groupedData));
          if (objectToUpdate) {
            const dold = {...objectToUpdate};
            objectToUpdate[key] = event.target.value;
            if (objectToUpdate['edgeA'] === 'Fabric' && objectToUpdate['edgeB'] === 'Fabric') {
              alert("Can't have both edges to Fabric");
              this.value = dold[key];
              objectToUpdate[key] = dold[key];
            } else if (objectToUpdate['edgeA'] === 'J-Bead' && objectToUpdate['edgeB'] === 'J-Bead') {
              alert("Can't have both edges to J-Bead");
              this.value = dold[key];
              objectToUpdate[key] = dold[key];
            }
            if (previousValue === "J-Bead" && this.value !== "J-Bead" && this.dataName === 'edgeA') {
              const inVal = fractionToDecimal2(document.getElementById('dA_' + randNme).value);
              document.getElementById('dA_' + randNme).value = decimalToEighthsOfInch(inVal + 0.125);
              objectToUpdate['dA'] = decimalToEighthsOfInch(inVal + 0.125);
              previousValue = this.value;
            } else if (previousValue === "J-Bead" && this.value !== "J-Bead" && this.dataName === 'edgeB') {
              const inVal = fractionToDecimal2(document.getElementById('dB_' + randNme).value);
              document.getElementById('dB_' + randNme).value = decimalToEighthsOfInch(inVal + 0.125);
              objectToUpdate['dB'] = decimalToEighthsOfInch(inVal + 0.125);
              previousValue = this.value;
            } else if (previousValue !== "J-Bead" && this.value === "J-Bead" && this.dataName === 'edgeA') {
              const inVal = fractionToDecimal2(document.getElementById('dA_' + randNme).value);
              document.getElementById('dA_' + randNme).value = decimalToEighthsOfInch(inVal - 0.125);
              objectToUpdate['dA'] = decimalToEighthsOfInch(inVal - 0.125);
              previousValue = this.value;
            } else if (previousValue !== "J-Bead" && this.value === "J-Bead" && this.dataName === 'edgeB') {
              const inVal = fractionToDecimal2(document.getElementById('dB_' + randNme).value);
              document.getElementById('dB_' + randNme).value = decimalToEighthsOfInch(inVal - 0.125);
              objectToUpdate['dB'] = decimalToEighthsOfInch(inVal - 0.125);
              previousValue = this.value;
            }
            if (key === 'length') {
              var modLength = event.target.value;
              if (event.target.value > 12) {
                if (fractionToDecimal2(event.target.value) <= 144) {
                  modLength = 12;
                } if (fractionToDecimal2(event.target.value) <= 120) {
                  modLength = 10;
                } if (fractionToDecimal2(event.target.value) <= 108) {
                  modLength = 9;
                } if (fractionToDecimal2(event.target.value) <= 96) {
                  modLength = 8;
                }
              }
              groupedData.length2 = String(Math.round(modLength));
            }
            if (key === 'floor') {
              const floor = event.target.value;
              fetch(backendURL + '/getUnits', {
                  method: 'POST',
                  body: JSON.stringify({ worksite: Cinfo.worksite, floor: floor }),
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then(response => response.json())
              .then(data => {
                container2.removeChild(partItem);
                container2.removeChild(detailItem);
                if (container2.children.length === 0) {
                  unitContainer.removeChild(container2);
                  unitContainer.removeChild(unitItem)
                  actualData[dold.floor].delete(dold.unit);
                }
                if (unitContainer.children.length === 0) {
                  container.removeChild(unitContainer);
                  container.removeChild(floorItem);
                  delete actualData[dold.floor];
                }
                objectToUpdate.unit = data.units[0].unit;
                createExpandableList2(objectToUpdate);
              })
              .catch(error => {
                  console.error('Error fetching units:', error);
              });
            }
            if (key === 'unit') {
              container2.removeChild(partItem);
              container2.removeChild(detailItem);
              if (container2.children.length === 0) {
                unitContainer.removeChild(container2);
                unitContainer.removeChild(unitItem)
                actualData[dold.floor].delete(dold.unit);
              }
              createExpandableList2(objectToUpdate);
            }
          }
        });
        detailInput.classList.add('grayed-out-content');
        detailInput.classList.add('grayed-out-content-div');
        detailDiv.appendChild(detailInput);
        detailDiv.style.display = 'flex';
        detailItem.appendChild(detailDiv);
    });
    detailItem.className = 'expandable-content';
    detailItem.classList.add('details');
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('style', 'width: fit-content; height: fit-content; font-size: 1vw; background-color: #1E90FF; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 0.2vw;');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginTop = '0.6vw';
    deleteButton.style.marginBottom = '0.2vw';
    deleteButton.style.height = '3.3vh';
    deleteButton.style.display = 'block';
    deleteButton.style.marginLeft = 'auto';
    deleteButton.style.marginRight = 'auto';
    const editButton = document.createElement('button');
    editButton.setAttribute('style', 'width: 5em; height: fit-content; font-size: 1vw; background-color: #1E90FF; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 0.2vw;');
    editButton.textContent = 'Edit';
    editButton.style.marginTop = '0.6vw';
    editButton.style.marginBottom = '0.2vw';
    editButton.style.height = '3.3vh';
    editButton.style.display = 'block';
    editButton.style.marginLeft = 'auto';
    editButton.style.marginRight = 'auto';
    editButton.onclick = function() {
      for (let i = 0; i < detailItem.children.length-1; i++) {
        detailItem.children[i].children[1].classList.toggle('grayed-out-content');
      }
      if (!detailItem.children[0].children[1].classList.contains('grayed-out-content')) {
        this.style.backgroundColor = 'green';
        this.innerText = 'Save';
      } else {
        this.style.backgroundColor = '#1E90FF';
        this.innerText = 'Edit';
      }
    }
    deleteButton.onclick = function() {
      container2.removeChild(partItem);
      container2.removeChild(detailItem);
      if (container2.children.length === 0) {
        unitContainer.removeChild(container2);
        unitContainer.removeChild(unitItem)
        actualData[groupedData.floor].delete(groupedData.unit);
      }
      if (unitContainer.children.length === 0) {
        container.removeChild(unitContainer);
        container.removeChild(floorItem);
        delete actualData[groupedData.floor];
      }
      GroupOrder = GroupOrder.filter(map => !mapsAreEqual(map, groupedData));
      if (GroupOrder.length === 0) {
        submitButton.style.display = 'none';
      }
      if (groupedData.img.length > 0) {
        groupedData.img.forEach((item) => {
          delete imgArray[item];
        });
      }
    };
    partItem.onclick = function() {
        detailItem.classList.toggle('expanded');
    };
    detailItem2.appendChild(deleteButton);
    detailItem2.appendChild(editButton);
    detailItem.appendChild(detailItem2);
    container2.appendChild(partItem);
    container2.appendChild(detailItem);
    if (!isUnit) {
        unitContainer.appendChild(unitItem);
        unitContainer.appendChild(container2);
    }

    if (!isFloor) {
        container.appendChild(floorItem);
        container.appendChild(unitContainer);
        floorItem.onclick = function() {
        unitContainer.classList.toggle('expanded');
        theArrow.classList.toggle('theArrow-rotated');
    };
    }
}
function generateRandomCharacterSet(length, characterPool) {
        return Array.from({ length }, () => characterPool[Math.floor(Math.random() * characterPool.length)]).join('');
}
document.getElementById('submitButton').addEventListener('click', () => {
    const backdrop = document.createElement('div');
    backdrop.style.position = 'fixed';
    backdrop.style.left = '0';
    backdrop.style.top = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.backdropFilter = 'blur(4px)';
    backdrop.style.zIndex = '998';
    document.body.appendChild(backdrop);
    const Button = document.createElement('button');
    Button.style.position = 'fixed';
    Button.style.left = '50%';
    Button.style.top = '87.5%';
    Button.style.transform = 'translate(-50%, -50%)';
    Button.style.width = "40%";
    Button.style.height = "5%";
    Button.style.fontSize = "1.3vw";
    Button.style.backgroundColor = "black";
    Button.style.border = 'solid 1px black';
    Button.style.color = "white";
    Button.style.cursor = "pointer";
    Button.style.zIndex = '1001';
    Button.textContent = "Close";
    document.body.appendChild(Button);
    const container = document.getElementById('listContainer2');
    container.style.position = 'fixed';
    container.style.left = '50%';
    container.style.top = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.width = '40%';
    container.style.height = '70%';
    container.style.overflowY = 'auto';
    container.style.border = 'solid 1px black';
    container.style.backgroundColor = '#303030';
    container.style.boxShadow = "rgba(0, 0, 0, 0.8) 0 8px 15px";
    container.style.zIndex = '1000';
    const submitButton = document.createElement("button");
    submitButton.style.width = "20%";
    submitButton.style.height = "2vw";
    submitButton.style.fontSize = "1.3vw";
    submitButton.style.backgroundColor = "#1E90FF";
    submitButton.style.color = "white";
    submitButton.style.border = "none";
    submitButton.style.borderRadius = "7px";
    submitButton.style.cursor = "pointer";
    submitButton.style.marginLeft = '40%';
    submitButton.style.marginTop = "0.7vw";
    submitButton.style.marginBottom = "2vw";
    submitButton.textContent = "Submit";
    container.appendChild(submitButton);
    Button.addEventListener('click', () => {
      closeWind(backdrop, container, submitButton, Button);
    });
    submitButton.addEventListener('click', () => {
      let selectedRadioText = '';
      const backdrop2 = document.createElement('div');
      backdrop2.style.position = 'fixed';
      backdrop2.style.left = '0';
      backdrop2.style.top = '0';
      backdrop2.style.width = '100%';
      backdrop2.style.height = '100%';
      backdrop2.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      backdrop2.style.backdrop2Filter = 'blur(5px)';
      backdrop2.style.zIndex = '1099';
      document.body.appendChild(backdrop2);
      const prior = document.createElement('div');
      const prior2 = document.createElement('div');
      const priorBut = document.createElement('div');
      prior.style.position = 'fixed';
      prior.style.left = '50%';
      prior.style.top = '50%';
      prior.style.transform = 'translate(-50%, -50%)';
      prior.style.width = '60%';
      prior.style.height = '45%';
      prior.style.border = 'solid 1px black';
      prior.style.backgroundColor = 'gray';
      prior.style.display = 'flex';
      prior.style.alignItems = 'center';
      prior.style.justifyContent = 'center';
      prior.style.flexDirection = 'column';
      prior.style.borderRadius = "14px";
      prior.style.zIndex = '1100';
      const title = document.createElement('h2');
      title.textContent = 'Priority Selection'
      title.style.fontWeight = 'bold';
      title.style.fontSize = '2.5vw';
      const label1 = document.createElement('label');
      label1.className = 'radio';
      const input1 = document.createElement('input');
      input1.setAttribute('type', 'radio');
      input1.setAttribute('name', 'radio');
      const span1 = document.createElement('span');
      span1.textContent = 'Priority Fulfillment - For orders requiring immediate attention and expedited handling.';
      label1.appendChild(input1);
      label1.appendChild(span1);
      const label2 = document.createElement('label');
      label2.className = 'radio';
      const input2 = document.createElement('input');
      input2.setAttribute('type', 'radio');
      input2.setAttribute('name', 'radio');
      const span2 = document.createElement('span');
      span2.textContent = 'Standard Processing - For orders that follow the normal course of fulfillment.';
      label2.appendChild(input2);
      label2.appendChild(span2);
      const label3 = document.createElement('label');
      label3.className = 'radio';
      const input3 = document.createElement('input');
      input3.setAttribute('type', 'radio');
      input3.setAttribute('name', 'radio');
      const span3 = document.createElement('span');
      span3.textContent = 'Flexible Timing - For orders where delivery time is adaptable to scheduling efficiencies. ';
      label3.appendChild(input3);
      label3.appendChild(span3);
      const Button1 = document.createElement('button');
      Button1.style.width = "7vw";
      Button1.style.height = "2vw";
      Button1.style.fontSize = "1.3vw";
      Button1.style.backgroundColor = "#1E90FF";
      Button1.style.border = 'none'
      Button1.style.color = "white";
      Button1.style.cursor = "pointer";
      Button1.textContent = "Submit";
      Button1.style.borderRadius = "7px";
      const Button2 = document.createElement('button');
      Button2.style.width = "7vw";
      Button2.style.height = "2vw";
      Button2.style.fontSize = "1.3vw";
      Button2.style.backgroundColor = "black";
      Button2.style.border = 'none'
      Button2.style.color = "white";
      Button2.style.cursor = "pointer";
      Button2.textContent = "Cancel";
      Button2.style.borderRadius = "7px";
      Button2.style.marginTop = '14%';
      priorBut.style.marginTop = '4%';
      priorBut.style.display = 'flex';
      priorBut.style.flexDirection = 'column';
      label2.style.marginTop = '4%';
      label3.style.marginTop = '4%';
      prior2.appendChild(label1);
      prior2.appendChild(label2);
      prior2.appendChild(label3);
      priorBut.appendChild(Button1);
      priorBut.appendChild(Button2);
      prior.appendChild(title);
      prior.appendChild(prior2);
      prior.appendChild(priorBut);
      document.body.appendChild(prior);
      document.querySelectorAll('.radio input[type="radio"]').forEach(radio => {
          radio.addEventListener('change', function() {
              document.querySelectorAll('.radio input[type="radio"]').forEach(innerRadio => {
                  if (innerRadio.checked) {
                      selectedRadioText = innerRadio.nextElementSibling.textContent.split(' -')[0];
                  }
              });
          });
      });
      Button2.addEventListener('click', () => {
        selectedRadioText = '';
        document.body.removeChild(prior);
        document.body.removeChild(backdrop2);
      });
      Button1.addEventListener('click', () => {
        if (selectedRadioText !== '') {
        const result = GroupOrder.reduce((acc, {floor, unit}) => {
            if (!acc[floor]) {
              acc[floor] = new Set();
            }
            acc[floor].add(unit);
            return acc;
        }, {});
        for (const floor in result) {
          result[floor] = Array.from(result[floor]);
        }
        const executeAfter = () => {
          for (const floor in result) {
            for (const unit of result[floor]) {
              const unitContainer = document.getElementById('unitContainer_' + floor);
              if (unitContainer) {
                const container2 = document.getElementById('container2_' + floor + '_' + unit);
                const unitItem = document.getElementById('unitItem_' + floor + '_' + unit);
                if (container2) unitContainer.removeChild(container2);
                if (unitItem) unitContainer.removeChild(unitItem);
              }
            }
            const listContainer2 = document.getElementById('listContainer2');
            const floorItem = document.getElementById('floorItem_' + floor);
            const unitContainer = document.getElementById('unitContainer_' + floor);
            if (unitContainer) listContainer2.removeChild(unitContainer);
            if (floorItem) listContainer2.removeChild(floorItem);
          }
          document.getElementById('submitButton').style.display = 'none';
        };
        const randomSet = generateRandomCharacterSet(20, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');
        for (let i = 0; i < GroupOrder.length; i++) {
            let item = GroupOrder[i];
            item.rand = randomSet;
            item.priority = selectedRadioText;
            if (item.quantity > 1) {
                for (let j = 0; j < (item.quantity - 1); j++) {
                    GroupOrder.splice(i + 1, 0, item);
                    i++;
                }
            }
        }
        setLoadingScreen(true);
        fetch(backendURL + '/sendGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(GroupOrder)
          }).then(response => {
          if (response.ok) {
            GroupOrder = [];
            actualData = {};
            closeWind(backdrop, container, submitButton, Button);
            executeAfter();
            document.body.removeChild(prior);
            document.body.removeChild(backdrop2);
            setLoadingScreen(false);
            if (imgArray && typeof imgArray === 'object' && Object.values(imgArray).filter(value => value !== undefined).length) {
              let formDataArray = Object.values(imgArray);
              for (let i = 0; i < formDataArray.length; i++) {
                fetch('/uploadIMG', {
                    method: 'POST',
                    body: formDataArray[i]
                }).then(response => {
                    if (response.ok) {
                        // Handle
                    } else {
                        alert('Failed to upload image.');
                    }
                }).catch(error => {
                  alert('Failed to upload image.');
                  console.error('Error:', error);
                });
              }
              imgArray = {};
              imgB = false;
            }
          } else {
            alert('Error submitting order.');
            console.log(response);
            setLoadingScreen(false);
          }
          }).catch(error => {
            console.error('Error:', error);
            alert("There's a connection error, try again later");
            setLoadingScreen(false);
          });
          } else {
            alert('Please select a priority option');
          }
      });
    });
});
function closeWind(b, c1, s, bu) {
  document.body.removeChild(b);
  document.body.removeChild(bu);
  c1.removeChild(s);
  c1.style.cssText = '';
}

var fetchProgressData = async () => {
    try {
        await fetch(backendURL + '/unitProgress2', {
            method: 'POST',
            body: JSON.stringify({
                user: Cinfo.user,
                worksite: Cinfo.worksite
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await fetch(backendURL + '/unitProgress3'); 
        const data = await response.json();
        updateProgressBar(data);
    } catch (error) {
        console.error('Error selecting worksite:', error);
    }
};

var storedd = [];
function updateProgressBar(data) {
    const container = document.getElementById('progressContainer');
    container.innerHTML = '';
    data.forEach(item => {
        if (item.unit && item.progress) {
            let progressBar = document.createElement('div');
            progressBar.classList.add('progress-container');
            
            // Create a label for the unit and percentage inside the progress bar
            let unitLabel = document.createElement('span');
            unitLabel.innerText = `${item.unit} (${item.progress}) :`;
            unitLabel.style.color = "white";
            unitLabel.style.position = "absolute";
            unitLabel.style.left = "5px";
            unitLabel.style.zIndex = "3"; // Ensure it's stacked above the progress bar
            unitLabel.style.cursor = 'pointer';

            let progress = document.createElement('div');
            progress.classList.add('progress-bar');
            progress.style.width = item.progress;
            progress.style.zIndex = "1"; // Ensure it's stacked below the unitLabel

            let descr = document.createElement('div');
            descr.style.display = 'none';
            descr.style.flexDirection = 'column';
            const partsArray = item.parts.split(' ');
            partsArray.forEach(part => {
              const splitPart = part.split('.');                                     
              const trimmedPart = splitPart[0];
              if (trimmedPart.startsWith("part") && partData[trimmedPart]) {
                  const title = partData[trimmedPart].title;

                  const partDiv = document.createElement('div');
                  partDiv.textContent = title;
                  //partDiv.style.border = "0.01vw solid black";
                  partDiv.style.borderRadius = "2px";
                  partDiv.style.paddingLeft = "4px";

                  if (splitPart[1] === '1') {
                      partDiv.style.backgroundColor = "#1E90FF";
                  }

                  descr.appendChild(partDiv);
              }
            });
            if (storedd.includes(item.rand)) {
              descr.style.display = 'flex';
              unitLabel.style.borderBottom = "0.01vw solid white";
            }
            unitLabel.addEventListener('click', () => {
              if (descr.style.display === 'none') {
                descr.style.display = 'flex';
                unitLabel.style.borderBottom = "0.01vw solid white";
                storedd.push(item.rand);
              } else {
                descr.style.display = 'none';
                unitLabel.style.borderBottom = "none";
                  const index = storedd.indexOf(item.rand);
                  if (index > -1) {
                      storedd.splice(index, 1);
                  }
              }
            });
            
            progressBar.appendChild(unitLabel);
            progressBar.appendChild(progress);
            progressBar.appendChild(descr);
            container.appendChild(progressBar);
        }
    });
}
function setLoadingScreen(x) {
if (x) {
  const div0 = document.createElement('div');
  div0.id = 'ddiivv00'
  div0.style.position = 'fixed';
  div0.style.left = '50%';
  div0.style.top = '50%';
  div0.style.transform = 'translate(-50%, -50%)';
  div0.style.width = '60%';
  div0.style.height = '60%';
  div0.style.border = 'solid 1px black';
  div0.style.backgroundColor = '#1f1f1f';
  div0.style.display = 'flex';
  div0.style.alignItems = 'center';
  div0.style.justifyContent = 'center';
  div0.style.flexDirection = 'column';
  div0.style.borderRadius = "14px";
  div0.style.zIndex = '1100';
  const preloader = document.createElement('div');
  preloader.className = 'preloader';
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'cart');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Shopping cart line animation');
  svg.setAttribute('viewBox', '0 0 128 128');
  svg.setAttribute('width', '128px');
  svg.setAttribute('height', '128px');
  const gFill = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  gFill.setAttribute('fill', 'none');
  gFill.setAttribute('stroke-linecap', 'round');
  gFill.setAttribute('stroke-linejoin', 'round');
  gFill.setAttribute('stroke-width', '8');
  const cartTrack = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  cartTrack.setAttribute('class', 'cart__track');
  cartTrack.setAttribute('stroke', 'hsla(0,10%,10%,0.1)');
  const polylineTrack = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polylineTrack.setAttribute('points', '4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80');
  const circle1Track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle1Track.setAttribute('cx', '43');
  circle1Track.setAttribute('cy', '111');
  circle1Track.setAttribute('r', '13');
  const circle2Track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle2Track.setAttribute('cx', '102');
  circle2Track.setAttribute('cy', '111');
  circle2Track.setAttribute('r', '13');
  cartTrack.appendChild(polylineTrack);
  cartTrack.appendChild(circle1Track);
  cartTrack.appendChild(circle2Track);
  const cartLines = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  cartLines.setAttribute('class', 'cart__lines');
  cartLines.setAttribute('stroke', 'currentColor');
  const polylineLines = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
  polylineLines.setAttribute('class', 'cart__top');
  polylineLines.setAttribute('points', '4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80');
  polylineLines.setAttribute('stroke-dasharray', '338 338');
  polylineLines.setAttribute('stroke-dashoffset', '-338');
  const cartWheel1 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  cartWheel1.setAttribute('class', 'cart__wheel1');
  cartWheel1.setAttribute('transform', 'rotate(-90,43,111)');
  const cartWheelStroke1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  cartWheelStroke1.setAttribute('class', 'cart__wheel-stroke');
  cartWheelStroke1.setAttribute('cx', '43');
  cartWheelStroke1.setAttribute('cy', '111');
  cartWheelStroke1.setAttribute('r', '13');
  cartWheelStroke1.setAttribute('stroke-dasharray', '81.68 81.68');
  cartWheelStroke1.setAttribute('stroke-dashoffset', '81.68');
  cartWheel1.appendChild(cartWheelStroke1);
  const cartWheel2 = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  cartWheel2.setAttribute('class', 'cart__wheel2');
  cartWheel2.setAttribute('transform', 'rotate(90,102,111)');
  const cartWheelStroke2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  cartWheelStroke2.setAttribute('class', 'cart__wheel-stroke');
  cartWheelStroke2.setAttribute('cx', '102');
  cartWheelStroke2.setAttribute('cy', '111');
  cartWheelStroke2.setAttribute('r', '13');
  cartWheelStroke2.setAttribute('stroke-dasharray', '81.68 81.68');
  cartWheelStroke2.setAttribute('stroke-dashoffset', '81.68');
  cartWheel2.appendChild(cartWheelStroke2);
  cartLines.appendChild(polylineLines);
  cartLines.appendChild(cartWheel1);
  cartLines.appendChild(cartWheel2);
  gFill.appendChild(cartTrack);
  gFill.appendChild(cartLines);
  svg.appendChild(gFill);
  preloader.appendChild(svg);
  const preloaderText = document.createElement('div');
  preloaderText.className = 'preloader__text';
  const msg1 = document.createElement('p');
  msg1.className = 'preloader__msg';
  msg1.textContent = 'Sending the order...';
  preloaderText.appendChild(msg1);
  preloader.appendChild(preloaderText);
  div0.appendChild(preloader);
  document.body.appendChild(div0);
} else {
  document.body.removeChild(document.getElementById('ddiivv00'));
}
}

function resetCinf() {
  Cinfo.part = "";
  Cinfo.type = "";
  Cinfo.side = "";
  Cinfo.thickness = "";
  Cinfo.length = "";
  Cinfo.length2 = "";
  Cinfo.dA = "";
  Cinfo.dB = "";
  Cinfo.dC = "";
  Cinfo.dD = "";
  Cinfo.dE = "";
  Cinfo.d1A = "";
  Cinfo.d2A = "";
  Cinfo.d1B = "";
  Cinfo.d2B = "";
  Cinfo.dR = "";
  Cinfo.dR_P = "";
  Cinfo.dH = "";
  Cinfo.dW = "";
  Cinfo.edgeA = "";
  Cinfo.edgeB = "";
  Cinfo.price = "";
  Cinfo.rand = "";
  Cinfo.sum = "";
  Cinfo.img = [];
  fbrc = 0;
  jbead = 0;
  imgB = false;
  ccusttm['name'] = false;
  trueIMG = false;
  onccee = false;
  imgArrayLocal = [];
}
setInterval(fetchProgressData, 10000);
