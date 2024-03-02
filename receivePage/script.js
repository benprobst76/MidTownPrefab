    var backendURL = "https://192.168.2.32:443";
    var Cinfo = {
        "time": "",
        "user": "",
        "worksite": "",
        "floor": "",
        "unit": "",
        "type": "",
        "part": "",
        "side": "",
        "thickness": "",
        "width": "",
        "length": "",
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
        "rand": ""
    }
    var partListContainer = document.getElementById("partListContainer");
    var partListContainer2 = document.getElementById("partListContainer2");
    var partTitles = {
    part1: "90° Profile",
    part2: "30° Knife Edge",
    part3: "45° Knife Edge",
    part4: "90° 3 Way Profile",
    part5: "135° Bulkhead Profile",
    part6: "135° Profile",
    part7: "C-Cap Profile",
    part8: "Column Profile",
    part9: "Fire Rated Enclosure Double",
    part10: "Fire Rated Enclosure",
    part11: "Hat Profile",
    part12: "Multi-Step profile",
    part13: "Radius Bulkhead",
    part14: "Radius Profile",
    part15: "90° 4 Way Profile",
    };
    var partData = {
        part1: {
            title: "90° Profile",
            imageUrl: backendURL + "/image1"
        },
        part2: {
            title: "30° Knife Edge",
            imageUrl: backendURL + "/image2"
        },
        part3: {
            title: "45° Knife Edge",
            imageUrl: backendURL + "/image3"
        },
        part4: {
            title: "90° 3 Way Profile",
            imageUrl: backendURL + "/image4"
        },
        part5: {
            title: "135° Bulkhead Profile",
            imageUrl: backendURL + "/image5"
        },
        part6: {
            title: "135° Profile",
            imageUrl: backendURL + "/image6"
        },
        part7: {
            title: "C-Cap Profile",
            imageUrl: backendURL + "/image7"
        },
        part8: {
            title: "Column Profile",
            imageUrl: backendURL + "/image8"
        },
        part9: {
            title: "Fire Rated Enclosure Double",
            imageUrl: backendURL + "/image9"
        },
        part10: {
            title: "Fire Rated Enclosure",
            imageUrl: backendURL + "/image10"
        },
        part11: {
            title: "Hat Profile",
            imageUrl: backendURL + "/image11"
        },
        part12: {
            title: "Multi-Step profile",
            imageUrl: backendURL + "/image12"
        },
        part13: {
            title: "Radius Bulkhead",
            imageUrl: backendURL + "/image13"
        },
        part14: {
            title: "Radius Profile",
            imageUrl: backendURL + "/image14"
        },
        part15: {
            title: "90° 4 Way Profile",
            imageUrl: backendURL + "/image15"
        }
    };
    var AllCD = false
    var dict = [];
    var dict2 = {};
    var nbr = "10";
    var savedData = [];
    var ftchDta = [];
    var workCh = false;
    var floorCh = false;
    var groupSort = true;
    var unitSort = false;
    var partSort = "";
    var firstL = 1;
    var alternate = false;
    var oldSheet = '';
    var edP = "/sortSize2";
    var Exlen = "";
    var LocalHis = document.getElementById("listHis");
    var ulll = document.getElementById('Nsheet');
    var svdta = [];
    var svdta2 = [];
    var prstGet = [];
    var nsheet = [];
    var sheetMap = {};
    var autoFetch = true;
    var savedDataNotif = [];
    var checkNUBR = 0;
    var swiper;
    var partOrderNBR = 0;
    var onnccee = true;

    {
    const script1 = document.createElement('script');
    script1.src = "https://unpkg.com/swiper/swiper-bundle.min.js";
    document.head.appendChild(script1);
    }
//____________________________________________________________________________________________________________________________________________________
//Top right info logic


    function notif(that) {
        const bell = that.getBoundingClientRect();
        const panel = document.getElementById('notifPanel');
        if (panel.style.scale === '0') {
            panel.style.left = bell.left + 'px';
            panel.style.top = bell.bottom + 'px';
            panel.style.scale = 1;
        } else {
            panel.style.scale = 0;
        }
        if (document.getElementById('notifBell').src === backendURL.replace(':443', '') + '/bell2') {
            document.getElementById('notifBell').src = backendURL + '/bell1';
        }
    }
    function notifPanel(noti) {
        const bell = document.getElementById('notifBell');
        const panel = document.getElementById('notifPanel');
        bell.src = backendURL + '/bell2';
        document.getElementById('notiTitle').style.display = 'block';
        const tt2 = document.createElement('p');
        tt2.style.margin = 0;
        const tt3 = document.createElement('p');
        tt3.style.margin = 0;
        tt3.style.marginTop = '0.5vw';
        const bb = document.createElement('div');
        if (noti[0].priority === 'Standard Processing') {
            bb.style.border = '0.2vw solid green';
        } else if (noti[0].priority === 'Flexible Timing') {
            bb.style.border = '0.2vw solid yellow';
        } else if (noti[0].priority === 'Priority Fulfillment') {
            bb.style.border = '0.2vw solid red';
        }
        bb.style.borderRadius = '1vw';
        bb.style.cursor = 'pointer';
        bb.style.padding = '1vw';
        bb.style.backgroundColor = '#303030';
        bb.style.color = 'white';
        bb.style.fontSize = '1.3vw';
        bb.style.display = 'flex';
        bb.style.flexDirection = 'column';
        bb.style.boxShadow = 'rgba(0, 0, 0, 0.8) 0 8px 15px';
        bb.style.alignItems = 'center';
        bb.style.marginBottom = '2vw';
        tt2.innerText = noti[0].groupO.split("/ ")[1];
        tt3.innerText = 'Priority: ' + noti[0].priority;
        bb.appendChild(tt2);
        bb.appendChild(tt3);
        bb.addEventListener('click', function() {
            autoFetch = false;
            groupSort = true;
            partListContainer.innerHTML = "";
            svdta2 = [];
            nbr = "";
            partSort = "";
            firstL = 1;
            while (ulll.children.length > 1) {
                ulll.removeChild(ulll.children[0]);
            }
            nsheet = [];
            displayPartList(noti);
            panel.style.scale = 0;
        });
        panel.appendChild(bb);

    }

    function getUser() {
        let cookies = document.cookie.split('; ');
        for(let i = 0; i < cookies.length; i++) {
            let parts = cookies[i].split('=');
            if(parts[0] === "username7834") {
                Cinfo.user = parts[1];
            }
        }
    }

    document.getElementById('Discon').addEventListener('click', function() {
        document.cookie = 'username7834=; expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/; Domain=192.168.2.32;';
        backendURL = undefined;
        partListContainer = undefined;
        partListContainer2 = undefined;
        ulll = undefined;
        Cinfo = undefined;
        partTitles = undefined;
        partData = undefined;
        AllCD = undefined;
        dict = undefined;
        dict2 = undefined;
        nbr = undefined;
        savedData = undefined;
        ftchDta = undefined;
        workCh = undefined;
        floorCh = undefined;
        groupSort = undefined;
        unitSort = undefined;
        partSort = undefined;
        firstL = undefined;
        alternate = undefined;
        oldSheet = undefined;
        edP = undefined;
        Exlen = undefined;
        LocalHis = undefined;
        svdta = undefined;
        svdta2 = undefined;
        prstGet = undefined;
        nsheet = undefined;
        sheetMap = undefined;
        autoFetch = undefined;
        savedDataNotif = undefined;
        listContainer = undefined;
        toggleActive = undefined;
        toggleActive2 = undefined;
        uniqueNewData = undefined;
        MidLay3 = undefined;
        fetchData = undefined;
        fetchData2 = undefined;
        checkNUBR = undefined;
        swiper = undefined;
        partOrderNBR = undefined;
        onnccee = undefined;
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
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    getUser();

//____________________________________________________________________________________________________________________________________________________
//Location logic

    var listContainer = document.getElementById('listContainer');

    var toggleActive = (element) => {
        // Clear 'active' class from siblings
        const siblings = element.parentNode.children;
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove('active');
        }
        // Set 'active' class for clicked element
        element.classList.add('active');
        if (element.classList.contains('active')) {
            workCh = true;
        } else {
            workCh = false;
        }
    };

    var toggleActive2 = (element) => {
        // Clear 'active' class from siblings
        const siblings = element.parentNode.children;
        if (element.classList.contains('active')) {
            floorCh = false;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            return
        }
        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove('active');
        }
        // Set 'active' class for clicked element
        element.classList.add('active');
        if (element.classList.contains('active')) {
            floorCh = true;
        } else {
            floorCh = false;
        }
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
                    toggleActive(listItem);
                    floorCh = false;
                    if (document.getElementById('MidLay3').style.scale === '1') {
                        fetch(backendURL + "/viewHis2")
                        .then((response) => response.json())
                        .then((data) => displayModPartList(data))
                        .catch((error) => console.error(error));
                    }
                    Cinfo.worksite = item.worksite;
                    Cinfo.floor = "";
                    callrHis();
                    document.getElementById('groupB').click()
                    autoFetch = true;
                    getPrst();
                    fetchAndDisplayData();
                });
                listContainer.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching worksites:', error);
        }
    };

    var fetchData2 = async () => {
        try {
            const listContainer2 = document.createElement('ul');
            const response = await fetch(backendURL + '/getFloors2');
            const data = await response.json();
            listContainer2.innerHTML = "";
            data.floors.forEach(item => {
                const listItem = document.createElement('li');
                listItem.className = 'list-item';
                listItem.textContent = item.floor;
                listItem.addEventListener('click', () => {
                    toggleActive2(listItem);
                    if (document.getElementById('MidLay3').style.display === 'flex') {
                        fetch(backendURL + "/viewHis2")
                        .then((response) => response.json())
                        .then((data) => displayModPartList(data))
                        .catch((error) => console.error(error));
                    }
                    Cinfo.floor = item.floor;
                });
                listContainer2.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error fetching worksites:', error);
        }
    };

    function filterQuiz() {
        fetch(backendURL + "/recQuiz")
        .then((response) => response.json())
        .then(data => {
            const script = document.createElement('script');
            script.innerHTML = data;
            script.id = "filterQuizScript";
            document.body.appendChild(script);
        })
        .catch((error) => console.error(error));
    }

    // Initialize by fetching worksites when the page loads.
    fetchData();
    document.getElementById('groupB').addEventListener('click', function() {
        if (workCh) {
            document.getElementById('fltB').classList.remove('active');
            this.classList.add('active');
            groupSort = true;
            partListContainer.innerHTML = "";
            savedData = [];
            svdta2 = [];
            nbr = "";
            partSort = "";
            firstL = 1;
            autoFetch = true;
            fetchAndDisplayData();
            document.getElementById('filterCont').style.border = 'none';
            document.getElementById('filterExpend').style.maxHeight = 0;
            document.getElementById('filterExpend').style.visibility = 'hidden';
        } else {
            alert("Please choose a worksite");
        }
    });
    function toggleCheckbox(thiss, x, y) {
        if (x) {
            document.querySelectorAll('.circular-checkbox').forEach(function(element) {
                element.classList.remove('toggle');
            });
        } else {
            if (!svdta.includes(y)) {
                svdta.push(y);
            } else {
                svdta = svdta.filter(item => item !== y);
            }
        }
        thiss.classList.toggle('toggle');
    }

    document.getElementById('shB').addEventListener('click', function() {
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            edP = "/sortSize1";
        } else {
            edP = "/sortSize2";
        }
        getPart();
    });

    async function fetchNewData() {
        try {
            const response = await fetch(backendURL + "/getOrders");
            const data = await response.json();
            console.log(data);
            ftchDta = data.filter(item => item.worksite === Cinfo.worksite);
            console.log(ftchDta);
        } catch (error) {
            console.error(error);
        }
    }
    async function getPrst() {
        fetch(backendURL + "/getPrst", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: Cinfo.user, work: Cinfo.worksite })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            prstGet = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    function savePrst(txt) {
        fetch(backendURL + "/savePrst", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: Cinfo.user, work: Cinfo.worksite, sort: partSort, constr: svdta, nbr: nbr, name: txt })
        })
        .then(response => {
            getPrst();
        });
    }

    function getPart() {
        svdta = svdta2;
        groupSort = false;
        unitSort = false;
        fetch(backendURL + edP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nbr: nbr, work: Cinfo.worksite, sort: partSort, constr: svdta })
            })
            .then(response => {
                if (!response.ok) {
                    document.getElementById('MidLay1').style.display = 'none';
                    document.getElementById('MidLay2').style.display = 'flex';
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('MidLay1').style.display = 'flex';
                document.getElementById('MidLay2').style.display = 'none';
                autoFetch = false;
                savedData = data.PartsWithSheets;
                while (ulll.children.length > 1) {
                    ulll.removeChild(ulll.children[0]);
                }
                nsheet = [];
                if (data.Summaries) {
                    nsheet = data.Summaries;
                }
                if (data.PartsWithSheets) {
                    displayPartList(data.PartsWithSheets);
                    setTimeout(() => {
                        let c1, c2, c3;
                        let noonne = {};Nsheet
                        document.querySelectorAll('.part-item').forEach(element => {
                            const prt = JSON.parse(element.getAttribute('data-part-data'));
                            if (sheetMap[prt.sheet] === undefined) {
                                sheetMap[prt.sheet] = 0;
                                sheetMap[prt.sheet + '_2'] = 0;
                            }
                            if (prt.check !== "1") {
                                sheetMap[prt.sheet] += 1;
                            }
                            sheetMap[prt.sheet + '_2'] += 1;
                        });
                        document.querySelectorAll('.part-item').forEach(element => {
                            const prt = JSON.parse(element.getAttribute('data-part-data'));
                            if (prt.check === "1" && prt.sheet === "") {
                                Array.from(document.getElementById("Nsheet").children).forEach(item0 => {
                                    const item = item0.children[0]
                                    if (item.innerText.split(':')[0].split(' ')[0] === "Type" || item.innerText.split(':')[0].split(' ')[0] === "Mold") {
                                        c1 = item.innerText.split(':')[0].split(' ')[0] + ' ' + item.innerText.split(':')[0].split(' ')[1];
                                        c2 = item.innerText.split(':')[0].split(' ')[2];
                                        c3 = (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/)[0] : "";
                                    } else {
                                        c1 = item.innerText.split(':')[0].split(' ')[0];
                                        c2 = item.innerText.split(':')[0].split(' ')[1];
                                        c3 = (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/)[0] : "";
                                    }
                                    if (c1 === prt.type && c2 === prt.thickness && c3 === prt.length2) {
                                        item0.children[1].innerText -= 1;
                                    }
                                });
                            } else if (prt.check === "1" && prt.sheet !== "") {
                                Array.from(document.getElementById("Nsheet").children).forEach(item0 => {
                                    const item = item0.children[0]
                                    if (item.innerText.split(':')[0].split(' ')[0] === "Type" || item.innerText.split(':')[0].split(' ')[0] === "Mold") {
                                        c1 = item.innerText.split(':')[0].split(' ')[0] + ' ' + item.innerText.split(':')[0].split(' ')[1];
                                        c2 = item.innerText.split(':')[0].split(' ')[2];
                                        c3 = (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/)[0] : "";
                                    } else {
                                        c1 = item.innerText.split(':')[0].split(' ')[0];
                                        c2 = item.innerText.split(':')[0].split(' ')[1];
                                        c3 = (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/)[0] : "";
                                    }
                                    if (c1 === prt.type && c2 === prt.thickness && c3 === prt.length2) {
                                        if (sheetMap[prt.sheet] === 0 && noonne[prt.sheet] === undefined) {
                                            noonne[prt.sheet] = true;
                                            item0.children[1].innerText -= 1;
                                        }
                                    }
                                });
                            }
                        });
                    }, "800");
                } else {
                    displayPartList(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function rmPrst(txt) {
        fetch(backendURL + "/rmPrst", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: Cinfo.user, work: Cinfo.worksite, name: txt })
        })
        .then(response => {
            getPrst();
        });
    }

//____________________________________________________________________________________________________________________________________________________
// Parts logic
// Function to generate a unique ID for each part
function generatePartId(part) {
        return part.part; // Use part.part as the unique identifier
    }

    function isEmptyPart(part) {
        // Function to check if a part is empty (all dimensions are empty)
        return (
            part.dA === "" &&
            part.dB === "" &&
            part.dC === "" &&
            part.dD === "" &&
            part.dE === "" &&
            part.dH === "" &&
            part.dR === "" &&
            part.dR_P === "" &&
            part.dW === ""
        );
    }

    function addDetail(ul, label, value) {
        const excludedKeys = ["User", "Worksite", "Price", "Rand", "UniqueID", "UniqueID2", "Side", "Unit", "Order", "Floor", "Time", "Checktime", "Check", "Sheet", "Order2", "Length2", "Sum", "Img", "GroupO", "Priority", Exlen];
        if (label === 'Mrg') {
            const detailItem = document.createElement("li");
            detailItem.textContent = 'Time: 23:55 / 2055-55-55';
            detailItem.style.marginBottom = '4vw';
            detailItem.style.opacity = 0;
            ul.appendChild(detailItem);
            return;
        }
        if (!excludedKeys.includes(label) && value.trim() !== "") {
            const detailItem = document.createElement("li");
            detailItem.textContent = `${label}: ${value}`;
            ul.appendChild(detailItem);
        }
    }

    function toggleBlur(focusDivId) {
        const body = document.body;
        body.classList.toggle('blur');
        if (body.classList.contains('blur')) {
            focusDivId.style.zIndex = '2';
        } else {
            focusDivId.style.zIndex = '';
        }
    }

    function createPartItem(part) {
        partOrderNBR ++;
        const partItem = document.createElement("div");
        partItem.setAttribute('data-part-data', JSON.stringify(part));
        partItem.setAttribute('data-uniqueID2', part.uniqueID2);
        partItem.classList.add("part-item");

        const container = document.createElement("div");
        container.style.display = 'flex';
        const title = partTitles[part.part] || part.part;
        const title2 = part.unit;
        const h2 = document.createElement("h2");
        const h22 = document.createElement("h2");
        const h222 = document.createElement("h2");
        const h2222 = document.createElement("h2");
        const separ1 = document.createElement("h2");
        const separ2 = document.createElement("h2");
        const separ3 = document.createElement("h2");
        h2.textContent = title;
        h22.textContent = title2;
        h222.textContent = part.order;
        h2222.textContent = part.floor;
        separ1.textContent = '|';
        separ2.textContent = '|';
        separ3.textContent = '|';
        h2.setAttribute('data-part-name', title);
        h2.style.marginRight = '0.4vw';
        h2222.style.marginRight = '0.4vw';
        h22.style.marginRight = '0.4vw';
        h222.style.marginLeft = 'auto';
        separ1.style.marginRight = '0.4vw';
        separ2.style.marginRight = '0.4vw';
        separ3.style.marginRight = '0.4vw';
        separ1.style.color = '#1E90FF';
        separ2.style.color = '#1E90FF';
        separ3.style.color = '#1E90FF';
        container.appendChild(h2);
        container.appendChild(separ1);
        container.appendChild(h2222);
        container.appendChild(separ2);
        container.appendChild(h22);
        container.appendChild(separ3);
        container.appendChild(h222);
        partItem.appendChild(container);
        if (part.type === "Mold Tuff") {
            partItem.style.boxShadow = '0 0 0 0.4vw blue';
        } else if (part.type === "DensGlass") {
            partItem.style.boxShadow = '0 0 0 0.4vw green';
        } else if (part.type === "Type C") {
            partItem.style.boxShadow = '0 0 0 0.4vw yellow';
        } else if (part.type === "Type X") {
            partItem.style.boxShadow = '0 0 0 0.4vw red';
        }

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'expandable1';
        contentWrapper.style.marginBottom = '1vw';

        const ul = document.createElement("ul");
        ul.style.position = 'relative';
        ul.style.marginTop = '1vw';
        ul.style.marginLeft = '1vw';

        if (part.length === part.length2) {
            Exlen = "Length";
        } else {
            Exlen = "";
            part.length = part.length + " inches"
        }
        for (const key in part) {
            if (key !== "part" && key !== "delch") {
                addDetail(ul, key.charAt(0).toUpperCase() + key.slice(1), part[key]);
            }
        }
        addDetail(ul, 'Mrg', true);
        const detailItem = document.createElement("li");
        detailItem.textContent = `Time: ${part.time}`;
        detailItem.style.position = 'absolute';
        detailItem.style.bottom = 0;
        ul.appendChild(detailItem);
        contentWrapper.appendChild(ul);

        const partInfo = partData[part.part];
        if (partInfo && partInfo.imageUrl) {
            const bigScreenB = document.createElement('img');
            bigScreenB.className = 'bigScreenB';
            bigScreenB.src = "https://192.168.2.32:443/fscreen";
            const bigSwiperDiv = document.createElement('div');
            bigSwiperDiv.className = "theIMGdivClass";
            bigSwiperDiv.partOrderNBR = partOrderNBR;
            bigSwiperDiv.style.width = '19vw';
            bigSwiperDiv.style.marginLeft = '1vw';
            bigSwiperDiv.style.borderLeft = 'solid #4b4b4b 0.4vw';
            bigSwiperDiv.style.position = 'relative';
            const swiperDiv = document.createElement('div');
            swiperDiv.className = 'swiper mySwiper';
            swiperDiv.style.margin = '0';
            const swiperWrapper = document.createElement('div');
            swiperWrapper.className = 'swiper-wrapper';
            const swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';
            const img = document.createElement('img');
            img.src = partInfo.imageUrl;
            img.style.width = "100%";
            img.style.height = "25vw";
            swiperSlide.appendChild(img);
            swiperWrapper.appendChild(swiperSlide);

            if (part.img.length > 0) {
                part.img.forEach(imgLnk => {
                var img2 = document.createElement('img');
                img2.style.width = "100%";
                img2.style.maxHeight = "25vw";
                
                fetch(backendURL + "/upIMG", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: imgLnk })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.blob();
                })
                .then(blob => {
                    var imageUrl = URL.createObjectURL(blob);
                    img2.src = imageUrl;
                    const swiperSlide = document.createElement('div');
                    swiperSlide.className = 'swiper-slide';
                    swiperSlide.appendChild(img2);
                    swiperWrapper.appendChild(swiperSlide);
                })
                .catch(error => {
                    //console.error('There has been a problem with your fetch operation:', error);
                });
                });
            }
            const swiperPagination = document.createElement('div');
            swiperPagination.className = 'swiper-pagination';
            swiperDiv.appendChild(swiperWrapper);
            swiperDiv.appendChild(swiperPagination);
            bigSwiperDiv.appendChild(swiperDiv);
            bigSwiperDiv.appendChild(bigScreenB);
            contentWrapper.appendChild(bigSwiperDiv);
            if (onnccee) {
            setTimeout(() => {
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
              }, "0");
              onnccee = false;
            }
            bigScreenB.addEventListener('click', function () {
                var imgdiv = document.createElement('div');
                var imgdivRel = document.createElement('div');
                var imgdivimg = document.createElement('img');
                const bigScreenB = document.createElement('img');
                bigScreenB.className = 'bigScreenB';
                bigScreenB.src = "https://192.168.2.32:443/fscreen";
                bigScreenB.style.right = '1vw';
                bigScreenB.style.top = '1vw';
                imgdivRel.style.position = 'relative';
                imgdiv.style.position = 'fixed';
                imgdiv.style.top = '50%';
                imgdiv.style.left = '50%';
                imgdiv.style.transform = 'translate(-50%, -50%)';
                imgdiv.style.transition = 'opacity 0.2s ease-in-out';
                imgdiv.style.opacity = '0';
                imgdivimg.src = this.parentNode.children[0].children[0].children[swiper[this.parentNode.partOrderNBR-1].activeIndex].children[0].src;
                imgdivimg.style.height = '95vh';
                imgdivimg.style.width = 'auto';
                imgdivimg.style.border = 'solid 0.3vw black';
                imgdivimg.style.borderRadius = '2vw';
                imgdivRel.appendChild(imgdivimg);
                imgdivRel.appendChild(bigScreenB);
                imgdiv.appendChild(imgdivRel);
                document.getElementsByClassName('Mid')[0].appendChild(imgdiv);
                setTimeout(function() {
                    imgdiv.style.opacity = '1';
                }, 0);
                document.body.classList.add('blur');
                imgdiv.style.zIndex = '2';
                bigScreenB.addEventListener('click', function() {
                    imgdiv.style.opacity = '0';
                    setTimeout(function() {
                        imgdiv.remove();
                        document.body.classList.remove('blur');
                        imgdiv = null;
                    }, 200);
                });
            });
        }

        partItem.appendChild(contentWrapper);
        if (part.sheet !== "" && oldSheet != part.sheet) {
            if (alternate) {
                alternate = false;
            } else {
                alternate = true;
            }
        }
        if (part.sheet !== ""  && !alternate) {
            partItem.style.backgroundColor = 'rgb(95, 59, 27)';
        } else if (part.sheet !== ""  && alternate) {
            partItem.style.backgroundColor = 'rgb(39, 18, 0)';
        }
        oldSheet = part.sheet;
        container.addEventListener("click", function() {
        if (contentWrapper.classList.contains('visible')) {
            contentWrapper.classList.remove('visible');
            contentWrapper.style.maxHeight = '0';
        } else {
            contentWrapper.classList.add('visible');
            contentWrapper.style.maxHeight = '80vh'; // This should be greater than the actual height of the content
        }
        });
        const checkButton = document.createElement('button');
        checkButton.textContent = "✓";
        checkButton.addEventListener('click', function() {
            const isCurrentlyChecked = this.style.backgroundColor === 'green';
            this.style.backgroundColor = isCurrentlyChecked ? '' : 'green';
            if (this.style.backgroundColor === 'green') {
                checkNUBR ++;
                if (checkNUBR > 0) {
                    document.getElementById('rmvAllCheck').style.backgroundColor = '#ff2020';
                }
                const parentPartItem = this.closest('.part-item');
                if (parentPartItem) {
                    parentPartItem.style.border = '2px solid green';
                }
                if (nsheet.length !== 0) {
                    let jsonDataString = JSON.parse(parentPartItem.getAttribute('data-part-data'));
                    let c1, c2, c3;
                    Array.from(document.getElementById("Nsheet").children).forEach(item0 => {
                        const item = item0.children[0];
                        if (item.innerText.split(':')[0].split(' ')[0] === "Type" || item.innerText.split(':')[0].split(' ')[0] === "Mold") {
                            c1 = item.innerText.split(':')[0].split(' ')[0] + ' ' + item.innerText.split(':')[0].split(' ')[1];
                            c2 = item.innerText.split(':')[0].split(' ')[2];
                            c3 = (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/)[0] : "";
                        } else {
                            c1 = item.innerText.split(':')[0].split(' ')[0];
                            c2 = item.innerText.split(':')[0].split(' ')[1];
                            c3 = (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/)[0] : "";
                        }
                        if (jsonDataString.sheet === "" && c1 === jsonDataString.type && c2 === jsonDataString.thickness && c3 === jsonDataString.length2) {
                            item0.children[1].innerText -= 1;
                        } else if (jsonDataString.sheet !== "" && c1 === jsonDataString.type && c2 === jsonDataString.thickness && c3 === jsonDataString.length2) {
                            sheetMap[jsonDataString.sheet] -= 1;
                            if (sheetMap[jsonDataString.sheet] === 0) {
                                item0.children[1].innerText -= 1;
                            }
                        }
                    });
                }
            } else {
                checkNUBR --;
                if (checkNUBR < 1) {
                    document.getElementById('rmvAllCheck').style.backgroundColor = '#5c5c5c';
                }
                const parentPartItem = this.closest('.part-item');
                if (parentPartItem) {
                    parentPartItem.style.border = '2px solid white';
                }
                if (nsheet.length !== 0) {
                    let jsonDataString = JSON.parse(parentPartItem.getAttribute('data-part-data'));
                    let c1, c2, c3;
                    Array.from(document.getElementById("Nsheet").children).forEach(item0 => {
                        const item = item0.children[0];
                        if (item.innerText.split(':')[0].split(' ')[0] === "Type" || item.innerText.split(':')[0].split(' ')[0] === "Mold") {
                            c1 = item.innerText.split(':')[0].split(' ')[0] + ' ' + item.innerText.split(':')[0].split(' ')[1];
                            c2 = item.innerText.split(':')[0].split(' ')[2];
                            c3 = (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[3] || "").match(/\d+/)[0] : "";
                        } else {
                            c1 = item.innerText.split(':')[0].split(' ')[0];
                            c2 = item.innerText.split(':')[0].split(' ')[1];
                            c3 = (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/) ? (item.innerText.split(':')[0].split(' ')[2] || "").match(/\d+/)[0] : "";
                        }
                        if (jsonDataString.sheet === "" && c1 === jsonDataString.type && c2 === jsonDataString.thickness && c3 === jsonDataString.length2) {
                            item0.children[1].innerText = parseInt(item0.children[1].innerText) + 1;
                        } else if (jsonDataString.sheet !== "" && c1 === jsonDataString.type && c2 === jsonDataString.thickness && c3 === jsonDataString.length2) {
                            sheetMap[jsonDataString.sheet] += 1;
                            if (sheetMap[jsonDataString.sheet] === 1) {
                                item0.children[1].innerText = parseInt(item0.children[1].innerText) + 1;
                            }
                        }
                    });
                }
            }
            var check = ""
            var Uid2 = part.uniqueID2
            if (this.style.backgroundColor === 'green') {
                check = "1"
            }
            if (this.style.backgroundColor === 'green') {
                delCheck(part, partItem);
            } else {
                delCheck2(part, partItem);
            }
            if  (!AllCD) {
                calculateAndSendUnitProgress(Uid2, check);
            }
            AllCD = false
        });
        const container2 = document.createElement("div");
        container2.style.display = 'flex';
        const len22 = document.createElement("h2");
        if (part.length2) {
            len22.textContent = "Length: " + part.length2 + " ";
        } else {
            len22.textContent = "Length: " + part.length;
        }
        len22.style.marginLeft = "2vw";
        len22.style.marginTop = "0.7vw";
        container2.appendChild(checkButton);
        container2.appendChild(len22);
        partItem.appendChild(container2);
        if (part.check === "1") {
            checkButton.style.backgroundColor = 'green';
            const parentPartItem = checkButton.closest('.part-item');
            setTimeout(() => {
                delCheck(part, partItem);
            }, 600);
            if (parentPartItem) {
                parentPartItem.style.border = '2px solid green';
            }
        }
        return partItem;
    }

    function calculateAndSendUnitProgress(Uid2, check) {
        fetch(backendURL + "/unitProgress1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            uid2: Uid2,
            check: check
        })
        })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
        });
    }

    function rmvAllCheck() {
        if (confirm("Are you sure ?")) {
            var sendDelPart = [];
            var DelPart = [];
            var delCol = [];
            document.querySelectorAll('.part-item').forEach(element => {
                if (element.style.border === '2px solid green') {
                    const prt = JSON.parse(element.getAttribute('data-part-data'));
                    sendDelPart.push(prt.uniqueID2);
                    DelPart.push(element);
                    if (element.parentNode.lastElementChild.tagName === 'BUTTON' && !delCol.includes(element.parentNode)) {
                        delCol.push(element.parentNode);
                    }
                }
            });
            const jsonArray = sendDelPart.map(value => ({ uniqueID2: value }));
            if (sendDelPart.length > 0) {
                fetch(backendURL + "/delReceive", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonArray)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Server responded with status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(text => {
                    if (text && text.trim() !== "") {
                        return JSON.parse(text);
                    } else {
                        return { success: true };
                    }
                })
                .then(data => {
                    if(data.success) {
                        DelPart.forEach(i => {
                            i.remove();
                            checkNUBR --;
                            if (checkNUBR < 1) {
                                document.getElementById('rmvAllCheck').style.backgroundColor = '#5c5c5c';
                            }
                        });
                        delCol.forEach(i => {
                            i.remove();
                        });
                        callrHis();
                    } else {
                        console.error("Error deleting parts:", data.errorMessage);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            }
        }
    }

    function delCheck(part, y) {
        for (let i = 0; i < dict.length; i++) {
            let item = dict[i];
            let key = Object.keys(item)[0];
            if (part.uniqueID === key) {
                item[key] -= 1;                  
                if (item[key] === 0) {
                    const btn = document.createElement('button');
                    btn.className = 'partRowDel'
                    btn.innerText = 'Delete';
                    y.parentNode.appendChild(btn);
                    btn.addEventListener('click', function() {
                        checkForAllChecked(part);
                    });
                }
            }
        }
    }

    function delCheck2(part, y) {
        const btns = y.parentNode.getElementsByClassName('partRowDel');
        if (btns.length > 0) {
            btns[0].remove();
        }
        for (let i = 0; i < dict.length; i++) {
            let item = dict[i];
            let key = Object.keys(item)[0];
            if (part.uniqueID === key) {
                item[key] += 1;
            }
        }
    }

    function checkForAllChecked(part) {
        const unitList = document.querySelector(`.unit-list[data-UniqueID2="${part.uniqueID}"]`);
        AllCD = true
        const matchingUniqueID2 = [];
        for (const item of savedData) {
            if (item.uniqueID === part.uniqueID) {
                matchingUniqueID2.push(item.uniqueID2);
            }
        }
        savedData = savedData.filter(item => item.uniqueID !== part.uniqueID);
        const jsonArray = matchingUniqueID2.map(value => ({ uniqueID2: value }));
        // Now send this data with the POST request:
        fetch(backendURL + "/delReceive", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonArray)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            // Check if there's content in the response
            if (text && text.trim() !== "") {
                return JSON.parse(text);
            } else {
                // If there's no content, return a default object indicating success
                return { success: true };
            }
        })
        .then(data => {
            if(data.success) {
                if (unitList) {
                    unitList.remove();
                }
                for (let i = 0; i < jsonArray.length; i++) {
                    checkNUBR--;
                    if (checkNUBR < 1) {
                        document.getElementById('rmvAllCheck').style.backgroundColor = '#5c5c5c';
                    }
                }
                callrHis();
            } else {
                // Handle any errors or unsuccessful deletions here
                console.error("Error deleting parts:", data.errorMessage);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
        }
function extractUserInfo(data) {
if (data.length > 0) {
    userValue = data[0].user || "";   // Set default value if 'user' is not present
    worksiteValue = data[0].worksite || "";   // Set default value if 'worksite' is not present
    floorValue = data[0].floor || "";   // Set default value if 'floor' is not present
    unitValue = data[0].unit || "";   // Set default value if 'unit' is not present
}
}

function createNewUnitList(part, uniqueID) {
const unitList = document.createElement('div');
unitList.className = 'unit-list';
unitList.setAttribute('data-unit', part.unit);
unitList.setAttribute('data-UniqueID2', uniqueID);

// Insert the new unitList at the top of the partListContainer
partListContainer.insertBefore(unitList, partListContainer.firstChild);
return unitList;
}
function createNewUnitList2(part, uniqueID) {
const unitList = document.createElement('div');
unitList.className = 'unit-list';
unitList.setAttribute('data-unit', part.unit);
unitList.setAttribute('data-UniqueID2', uniqueID);

// Insert the new unitList at the bottom of the partListContainer
partListContainer.appendChild(unitList);
return unitList;
}
function generateUniqueID() {
return Math.random().toString(36).substr(2, 9);
}
function fractionToDecimal(frac = "") {
// Ensure frac is a string and not an empty string.
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
function decimalToFraction(decimal) {
const tolerance = 0.0001;
let wholeNumberPart = Math.floor(decimal);
let fractionalPart = decimal - wholeNumberPart;
let numerator = fractionalPart;
let denominator = 1;

while (Math.abs(fractionalPart * denominator - Math.round(fractionalPart * denominator)) > tolerance) {
    denominator++;
    numerator = Math.round(fractionalPart * denominator);
}

if (wholeNumberPart && numerator) {
    return `${wholeNumberPart}.${numerator}/${denominator}`;
} else if (!wholeNumberPart && numerator) {
    return `${numerator}/${denominator}`;
} else {
    return `${wholeNumberPart}`;
}
}
// Helper function to add two fractions/decimals in string form and return as string
function addFractions(frac1, frac2) {
const result = fractionToDecimal(frac1) + fractionToDecimal(frac2);
return decimalToFraction(result);
}

function smallHis(parts) {
parts.sort((a, b) => {
    const timeA = b.checktime.split(' / ')[0];
    const timeB = a.checktime.split(' / ')[0];
    const [hourA, minuteA] = timeA.split(':').map(Number);
    const [hourB, minuteB] = timeB.split(':').map(Number);
    if (hourA !== hourB) {
        return hourA - hourB;
    } else {
        return minuteA - minuteB;
    }
});
const partsArray = Array.isArray(parts) ? parts : [parts];
partsArray.forEach(part => {
    if (part.checktime !== "") {
        const extractedDate = part.checktime.split(" / ")[1];
        const [year, month, day] = extractedDate.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();  // 0-indexed
        const currentDay = currentDate.getDate();
        const today = new Date(currentYear, currentMonth, currentDay);
        if (part.worksite === Cinfo.worksite && parsedDate.getTime() === today.getTime()) {
            const ul = document.createElement("div");
            ul.classList.add("part-description");
            ul.style.marginTop = '1.5vh';
            for (const key in part) {
                if (key !== "part" && key !== "delch") {
                    addDetail(ul, key.charAt(0).toUpperCase() + key.slice(1), part[key]);
                }
            }
            const detailItem = document.createElement("div");
            detailItem.textContent = `Time: ${part.checktime}`;
            detailItem.style.marginTop = '3vh';
            detailItem.style.marginBottom = '2vh';
            ul.appendChild(detailItem);
            var titleElement = document.createElement("span");
            titleElement.innerText = partData[part.part].title;
            titleElement.style.lineHeight = '2.3vw';
            var lst = document.createElement("div");
            lst.className = "stlHis";
            lst.appendChild(titleElement);
            lst.appendChild(ul);
            var tgl = false; 
            lst.addEventListener('click', function() {
                if (!tgl) {
                    lst.style.maxHeight = '16em';
                    setTimeout(() => {
                        ul.style.visibility = 'visible';
                        tgl = true;
                      }, "100");
                      
                } else {
                    lst.style.maxHeight = '2.5em';
                    ul.style.visibility = 'hidden';
                    tgl = false;
                }
            });
            LocalHis.appendChild(lst);
        }
    }
});
}

function callrHis() {
LocalHis.innerHTML = "";
fetch(backendURL + "/viewHis2")
    .then((response) => response.json())
    .then((data) => smallHis(data))
    .catch((error) => console.error(error));
}

function displayPartList(parts) {
parts.forEach(parts => {
    parts.sum = "";
});
// Extract user, worksite, floor, and unit values from the received data
extractUserInfo(parts);

const filteredData = parts.filter(part => !isEmptyPart(part));

if (filteredData.length === 0) {
    partListContainer.innerHTML = "No matching parts found.";
    return;
}

let lastRand;
let currentUnitList = null;
let uniqueID;
var boxLen = 0;
var tmp = {};
let oldun = "";
let restrict;
var bnbr = 1000;
partOrderNBR = 0;
onnccee = true;
dict = [];
if (groupSort) {
    filteredData.reverse().forEach(part => {
    if (lastRand !== part.rand) {
        uniqueID = generateUniqueID();
        if (firstL === 1) {
            currentUnitList = createNewUnitList2(part, uniqueID);
        } else {
            currentUnitList = createNewUnitList2(part, uniqueID);
        }
        lastRand = part.rand;
        boxLen = 0;
    }
    boxLen += 1;
    if (oldun === "") {
        oldun = uniqueID
    }
    if (uniqueID == oldun) {
    } else {
        dict.push(tmp);
    }
    tmp = {[uniqueID]: boxLen};
    oldun = uniqueID
    part.uniqueID = uniqueID;
    const partItem = createPartItem(part);
    currentUnitList.appendChild(partItem);
});
firstL = 0;
} else if (unitSort) {
    filteredData.reverse().forEach(part => {
    if (lastRand !== part.unit) {
        uniqueID = generateUniqueID();
        currentUnitList = createNewUnitList2(part, uniqueID);
        lastRand = part.unit;
        boxLen = 0;
    }
    boxLen += 1;
    if (oldun === "") {
        oldun = uniqueID
    }
    if (uniqueID == oldun) {
    } else {
        dict.push(tmp);
    }
    tmp = {[uniqueID]: boxLen};
    oldun = uniqueID
    part.uniqueID = uniqueID;
    const partItem = createPartItem(part);
    currentUnitList.appendChild(partItem);
});
} else {
    partListContainer.innerHTML = ""
    filteredData.forEach(part => {
    if (bnbr >= nbr) {
        uniqueID = generateUniqueID();
        currentUnitList = createNewUnitList2(part, uniqueID);
        bnbr = 0;
        boxLen = 0;
    }
    bnbr += 1;
    oldbox = boxLen;
    boxLen += 1;
    if (oldun === "") {
        oldun = uniqueID
    }
    if (uniqueID == oldun) {
    } else {
        dict.push(tmp);
    }
    tmp = {[uniqueID]: boxLen};
    oldun = uniqueID
    part.uniqueID = uniqueID;
    const partItem = createPartItem(part);
    currentUnitList.appendChild(partItem);
});
}
/*let lastTapTime = 0;
document.querySelectorAll('.theIMGdivClass').forEach(image => {
    image.addEventListener('dblclick', function() {
        const midDiv = document.getElementsByClassName('Mid');
        var imgdivimg = document.createElement('img');
        imgdivimg.style.position = 'fixed';
        imgdivimg.style.top = '50%';
        imgdivimg.style.left = '50%';
        imgdivimg.style.transform = 'translate(-50%, -50%)';
        imgdivimg.style.transition = 'opacity 0.2s ease-in-out';
        imgdivimg.style.opacity = '0';
        imgdivimg.src = this.children[0].children[0].children[swiper[this.partOrderNBR-1].activeIndex].children[0].src;
        imgdivimg.style.height = '95vh';
        imgdivimg.style.width = 'auto';
        imgdivimg.style.border = 'solid 0.3vw black';
        imgdivimg.style.borderRadius = '2vw';
        midDiv[0].appendChild(imgdivimg);
        setTimeout(function() {
            imgdivimg.style.opacity = '1';
        }, 0);
        document.body.classList.add('blur');
        imgdivimg.style.zIndex = '2';
        imgdivimg.addEventListener('dblclick', function() {
            imgdivimg.style.opacity = '0';
            setTimeout(function() {
                imgdivimg.remove();
                document.body.classList.remove('blur');
                imgdivimg = null;
            }, 200);
        });
    });

image.addEventListener('touchend', function(event) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    if (tapLength < 500 && tapLength > 0) {
        const midDiv = document.getElementsByClassName('Mid');
        var imgdivimg = document.createElement('img');
        imgdivimg.style.position = 'fixed';
        imgdivimg.style.top = '50%';
        imgdivimg.style.left = '50%';
        imgdivimg.style.transform = 'translate(-50%, -50%)';
        imgdivimg.style.transition = 'opacity 0.2s ease-in-out';
        imgdivimg.style.opacity = '0';
        imgdivimg.src = this.src;
        imgdivimg.style.width = '50vw';
        imgdivimg.style.maxHeight = '85vh';
        imgdivimg.style.height = 'auto';
        imgdivimg.style.border = 'solid 0.3vw black';
        imgdivimg.style.borderRadius = '2vw';
        midDiv[0].appendChild(imgdivimg);
        setTimeout(function() {
            imgdivimg.style.opacity = '1';
        }, 0);
        document.body.classList.add('blur');
        imgdivimg.style.zIndex = '2';
        imgdivimg.addEventListener('dblclick', function() {
            imgdivimg.style.opacity = '0';
            setTimeout(function() {
                imgdivimg.remove();
                document.body.classList.remove('blur');
                imgdivimg = null;
            }, 200);
        });
        event.preventDefault();
    }
    lastTapTime = currentTime;
});
});*/
document.getElementById("Norder").children[1].children[0].textContent = document.querySelectorAll('.part-item').length;
document.getElementById("Norder").style.display = "flex";
nsheet.forEach(sheet => {
    let li = document.createElement("div");
    let txt = document.createElement("div");
    let nbr = document.createElement("div");
    let spanNbr = document.createElement("span");
    li.className = 'Numb';
    nbr.className = 'NumbNBR';
    txt.style.position = "absolute";
    txt.style.left = "0.8vw";
    txt.textContent = `${sheet.type} ${sheet.thickness} ${sheet.length}ft:`;
    spanNbr.textContent = sheet.count;
    nbr.appendChild(spanNbr);
    li.appendChild(txt);
    li.appendChild(nbr);
    document.getElementById("Nsheet").prepend(li);
});
dict.push(tmp);
dict2 = dict.reduce((acc, curr) => {
    return {...acc, ...curr};
}, {});
}

function removeDeletedPart(partItem) {
    partListContainer.removeChild(partItem);
}
var uniqueNewData = [];
function fetchAndDisplayData() {
fetch(backendURL + "/getOrders")
.then((response) => response.json())
.then((data) => {
    var passNoti = true;
    data = data.filter(item => item.worksite === Cinfo.worksite);
    if (savedDataNotif.length !== 0 && savedDataNotif[0].worksite !== data[0].worksite) {
        passNoti = false;
    }
     if (passNoti && data.length > savedDataNotif.length) {
        const difference = data.length - savedDataNotif.length;
        const newElements = data.slice(0, difference);
        if (savedDataNotif.length > 0) {
            notifPanel(newElements);
        }
    }
    savedDataNotif = data;
    if (autoFetch && document.getElementById('MidLay3').style.display === '') {
        while (ulll.children.length > 1) {
            ulll.removeChild(ulll.children[0]);
        }
        nsheet = [];
        if (floorCh) {
            data = data.filter(item => item.floor === Cinfo.floor);
        }
        if (!data) {
            document.getElementById('MidLay1').style.display = 'none';
            document.getElementById('MidLay2').style.display = 'flex';
            return
        } else {
            document.getElementById('MidLay1').style.display = 'flex';
            document.getElementById('MidLay2').style.display = 'none';
        }
        if (data.length > savedData.length) {
            const difference = data.length - savedData.length;
            const newElements = data.slice(0, difference);
            displayPartList(newElements);
            savedData = data;
        }
    }
})
.catch((error) => console.error(error));
}
setInterval(fetchAndDisplayData, 10000);

//_____________________________________________________________________________________________________________________
//Right Logic
var MidLay3 = document.getElementById("MidLay3");
document.getElementById('changeUrlBtn').addEventListener('click', function() {
    let lastS;
    if (document.getElementById('MidLay1').style.display === 'flex') {
        lastS = 'MidLay1';
    } else if (document.getElementById('MidLay2').style.display === 'flex') {
        lastS = 'MidLay2';
    }
    if (document.getElementById('MidLay3').style.scale === '' || document.getElementById('MidLay3').style.scale === '0') {
        fetch(backendURL + "/viewHis2")
        .then((response) => response.json())
        .then((data) => displayModPartList(data))
        .catch((error) => console.error(error));
        document.getElementById('changeUrlBtn').style.border = '0.25vw solid green';
        document.getElementById(lastS).style.scale = 0;
        document.getElementById('MidLay3').style.scale = 1;
    } else {
        document.getElementById('changeUrlBtn').style.border = 'none';
        document.getElementById('MidLay3').style.scale = 0;
        document.getElementById(lastS).style.scale = 1;
    }
});
function generateModPartId(part) {
        return part.modPart;
    }
    function isEmptyModPart(part) {
        return (
            part.dA === "" &&
            part.dB === "" &&
            part.dC === "" &&
            part.dD === "" &&
            part.dE === "" &&
            part.dH === "" &&
            part.dR === "" &&
            part.dR_P === "" &&
            part.dW === ""
        );
    }
    function addDetail2(ul, label, value, counterObj) {
        const excludedKeys = ["User", "Worksite", "Price", "Rand", "UniqueID", "UniqueID2", "Side", "Unit", "Order", "Floor", "Time", "Checktime", "Check", "Sheet", "Order2", "Length2", "Sum", "Img", "GroupO", "Priority", Exlen];
        if (label === 'Mrg') {
            const detailItem = document.createElement("li");
            detailItem.textContent = 'Time: 23:55 / 2055-55-55';
            detailItem.style.marginBottom = '4vw';
            detailItem.style.opacity = 0;
            ul.appendChild(detailItem);
            return;
        }
        if (!excludedKeys.includes(label) && value.trim() !== "") {
            const detailItem = document.createElement("li");
            detailItem.textContent = `${label}: ${value}`;
            ul.appendChild(detailItem);
            counterObj.nbrOfHeight++;
        }
    }
    function createModPartItem(part) {
        const partItem = document.createElement("div");
        partItem.setAttribute('data-part-data', JSON.stringify(part));
        partItem.classList.add("modpart-item");
    
        const container = document.createElement("div");
        container.style.display = 'flex';
        const title = partTitles[part.part] || part.part;
        const title2 = part.unit;
        const h2 = document.createElement("h2");
        const h22 = document.createElement("h2");
        const h222 = document.createElement("h2");
        const h2222 = document.createElement("h2");
        const separ1 = document.createElement("h2");
        const separ2 = document.createElement("h2");
        const separ3 = document.createElement("h2");
        h2.textContent = title;
        h22.textContent = title2;
        h222.textContent = part.order;
        h2222.textContent = part.floor;
        separ1.textContent = '|';
        separ2.textContent = '|';
        separ3.textContent = '|';
        h2.setAttribute('data-part-name', title);
        h2.style.marginRight = '0.4vw';
        h2222.style.marginRight = '0.4vw';
        h22.style.marginRight = '0.4vw';
        h222.style.marginLeft = 'auto';
        separ1.style.marginRight = '0.4vw';
        separ2.style.marginRight = '0.4vw';
        separ3.style.marginRight = '0.4vw';
        separ1.style.color = '#1E90FF';
        separ2.style.color = '#1E90FF';
        separ3.style.color = '#1E90FF';
        container.appendChild(h2);
        container.appendChild(separ1);
        container.appendChild(h2222);
        container.appendChild(separ2);
        container.appendChild(h22);
        container.appendChild(separ3);
        container.appendChild(h222);
        partItem.appendChild(container);
        if (part.type === "Mold Tuff") {
            partItem.style.boxShadow = '0 0 0 0.4vw blue';
        } else if (part.type === "DensGlass") {
            partItem.style.boxShadow = '0 0 0 0.4vw green';
        } else if (part.type === "Type C") {
            partItem.style.boxShadow = '0 0 0 0.4vw yellow';
        } else if (part.type === "Type X") {
            partItem.style.boxShadow = '0 0 0 0.4vw red';
        }
    
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'expandable1';
        contentWrapper.style.marginBottom = '1vw';
    
        const ul = document.createElement("ul");
        ul.style.position = 'relative';
        ul.style.marginTop = '1vw';
        ul.style.marginLeft = '1vw';
        ul.style.width = '100%';
    
        if (part.length === part.length2) {
            Exlen = "Length";
        } else {
            Exlen = "";
            if (!part.length.includes("inches")) {
                part.length = part.length + " inches"
            }
        }
        var heightCounter = { nbrOfHeight: 0 };
        for (const key in part) {
            if (key !== "part" && key !== "delch") {
                addDetail2(ul, key.charAt(0).toUpperCase() + key.slice(1), part[key], heightCounter);
            }
        }
        addDetail2(ul, 'Mrg', true, "", 0);
        const detailItem = document.createElement("li");
        detailItem.textContent = `Time: ${part.time}`;
        detailItem.style.position = 'absolute';
        detailItem.style.bottom = 0;
        detailItem.style.width = '40vw';
        ul.appendChild(detailItem);
        contentWrapper.appendChild(ul);
    
        const imgDiv = document.createElement('div');
        const partInfo = partData[part.part];
        if (partInfo && partInfo.imageUrl) {
            const img = document.createElement("img");
            img.src = partInfo.imageUrl;
            img.alt = partInfo.title || 'Part Image';
            img.style.maxWidth = "100%";
            img.style.maxHeight = "100%";
            //img.style.marginLeft = '20%';
            img.style.borderLeft = 'solid 0.4vw #4b4b4b';
            imgDiv.appendChild(img);
        }
    
        contentWrapper.appendChild(imgDiv);
        partItem.appendChild(contentWrapper);
        container.addEventListener("click", function() {
        if (contentWrapper.classList.contains('visible')) {
            contentWrapper.classList.remove('visible');
            contentWrapper.style.maxHeight = '0';
        } else {
            contentWrapper.classList.add('visible');
            contentWrapper.style.maxHeight = heightCounter.nbrOfHeight * 3.4 + 'vw';
        }
        });
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Retrieve Part";
        deleteButton.addEventListener("click", () => {
            const userConfirmed = window.confirm("Are you sure you want to retrieve that part?");  
            if (userConfirmed) {
                handleModRetrieve(part, partItem);
            } else {
                //console.log('User declined');
            }
        });
        const container2 = document.createElement("div");
        container2.style.display = 'flex';
        const len22 = document.createElement("h2");
        if (part.length2) {
            len22.textContent = "Length: " + part.length2 + " ";
        } else {
            len22.textContent = "Length: " + part.length;
        }
        len22.style.marginLeft = "2vw";
        len22.style.marginTop = "0.7vw";
        container2.appendChild(deleteButton);
        container2.appendChild(len22);
        partItem.appendChild(container2);
        return partItem;
    }
function extractModUserInfo(data) {
if (data.length > 0) {
    userValue = data[0].user || "";   // Set default value if 'user' is not present
    worksiteValue = data[0].worksite || "";   // Set default value if 'worksite' is not present
    floorValue = data[0].floor || "";   // Set default value if 'floor' is not present
    unitValue = data[0].unit || "";   // Set default value if 'unit' is not present
}
}
function displayModPartList(parts) {
    parts = parts.filter(item => item.worksite === Cinfo.worksite);
    if (floorCh) {
        parts = parts.filter(item => item.floor === Cinfo.floor);
    }
    MidLay3.innerHTML = "";
    extractModUserInfo(parts);
    const filteredData = parts.filter(part => !isEmptyModPart(part));
    if (filteredData.length === 0) {
        MidLay3.innerHTML = "No matching parts found.";
        return;
    }
    const Tdiv = document.createElement('div');
    Tdiv.style.padding = '1vw';
    filteredData.reverse().forEach(part => {
        const partItem = createModPartItem(part);
        Tdiv.appendChild(partItem);
    });
    MidLay3.appendChild(Tdiv);
}
    function handleModRetrieve(part, partItem) {
        const url = backendURL + "/retreiveHis";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(part),
        };

        fetch(url, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return;
            })
            .then(() => {
                partItem.remove();
                alert('Part Retrieved');
            })
            .catch((error) => console.error("Error deleting part:", error));
}
