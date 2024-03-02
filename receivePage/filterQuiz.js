if (workCh) {
    document.getElementById('filterInputR').value = 10;
    document.getElementById('filterSelectP').value = "";
    document.getElementById('filterInputR').addEventListener('change', function(event) {
        nbr = event.target.value
        getPart();
    });
    document.getElementById('filterSelectP').addEventListener('change', function(event) {
        partSort = event.target.value
        getPart();
    });
    svdta = [];
    const wrpr0 = document.createElement('div');
    const quiz = document.createElement('div');
    const quiz2 = document.createElement('div');
    const quiz3 = document.createElement('div');
    const quiz4 = document.createElement('div');
    const quiz5 = document.createElement('div');
    const dict = {
        1: quiz,
        2: quiz2,
        3: quiz3,
        4: quiz4,
        5: quiz5
    };
    const body = document.body;
    const addNew = document.createElement('button');
    const prev= document.createElement('button');
    const close = document.createElement('button');
    const next = document.createElement('button');
    const pres = document.createElement('h2');
    var isunit = false;
    var isunit2 = false;
    var tmparv = false;
    var lastQZ = 1;
    var svdta0 = "";
    var skipB = false;
    var isallp = false;
    quiz.className = 'quiz';
    wrpr0.className = 'Qwrapper0';
    pres.innerText = 'Saved Preset:'
    quiz.appendChild(pres);
    if (prstGet) {
        prstGet.forEach(prst => {
            const dv = document.createElement('div');
            dv.style.position = 'relative';
            const btn = document.createElement('button');
            const rmbtn = document.createElement('button');
            btn.className = 'shrinkB'
            rmbtn.className = 'shrinkB'
            btn.innerText = prst.name;
            rmbtn.innerText = 'X';
            rmbtn.style.color = 'black';
            rmbtn.style.backgroundColor = '#d10000';
            rmbtn.style.width = '3vw';
            rmbtn.style.position = 'absolute';
            rmbtn.style.top = 0;
            rmbtn.style.left = '10vw';
            rmbtn.style.border = 'solid 0.15vw black';
            rmbtn.value = prst.name;
            btn.style.width = '12vw';
            btn.style.border = 'solid 0.15vw black';
            btn.style.marginBottom = '5%';
            btn.style.backgroundColor = '#1E90FF';
            btn.addEventListener('click', function() {
                nbr = prst.nbr;
                partsort = prst.sort;
                svdta2 = prst.constr;
                getPart();
                close.click();
                document.getElementById('groupB').classList.remove('active');
                document.getElementById('fltB').classList.add('active');
                document.getElementById('filterCont').style.border = 'solid #1E90FF 0.4vw';
                document.getElementById('filterExpend').style.maxHeight = '60vh';
                document.getElementById('filterExpend').style.visibility = 'visible';
            });
            rmbtn.addEventListener('click', function() {
                rmPrst(this.value);
                dv.removeChild(this);
                dv.removeChild(btn);
            });
            dv.appendChild(btn);
            dv.appendChild(rmbtn);
            quiz.appendChild(dv);
        });
    }
    addNew.innerText = 'Add New';
    prev.innerText = 'Previous';
    close.innerText = 'Close';
    next.innerText = 'Next';
    addNew.className = 'shrinkB';
    prev.className = 'shrinkB'
    prev.style.backgroundColor = '#1E90FF';
    prev.style.marginBottom = '2vw';
    prev.style.visibility = 'hidden';
    prev.style.justifyContent = 'center';
    prev.style.alignItems = 'center';
    close.className = 'shrinkB'
    close.style.backgroundColor = '#202020';
    close.style.marginBottom = '2vw';
    close.style.border = 'solid 0.2px black';
    next.className = 'shrinkB'
    next.style.marginBottom = '2vw';
    next.style.visibility = 'hidden';
    addNew.style.width = '10vw'
    addNew.addEventListener('click', function() {
        const ques1 = document.createElement('h2');
        const ch1 = document.createElement('h2');
        const ch2 = document.createElement('h2');
        const ch3 = document.createElement('h2');
        const ch4 = document.createElement('h2');
        const wrP = document.createElement('div');
        const wrQ1 = document.createElement('div')
        const wrQ2 = document.createElement('div')
        const circB1 = document.createElement('button');
        const circB4 = document.createElement('button');
        const inCirc1 = document.createElement('div');
        const inCirc4 = document.createElement('div');
        const exCirc1 = document.createElement('div');
        const exCirc2 = document.createElement('div');
        const exCirc3 = document.createElement('div');
        const exCirc4 = document.createElement('div');
        const exCh1 = document.createElement('div');
        const exCh2 = document.createElement('div');
        const exCh3 = document.createElement('div');
        const exCh4 = document.createElement('div');
        exCirc1.style.height = '5vh';
        exCirc2.style.height = '5vh';
        exCirc3.style.height = '5vh';
        exCirc4.style.height = '5vh';
        exCirc1.style.display = 'flex';
        exCirc2.style.display = 'flex';
        exCirc3.style.display = 'flex';
        exCirc4.style.display = 'flex';
        exCirc1.style.alignItems = 'center';
        exCirc2.style.alignItems = 'center';
        exCirc3.style.alignItems = 'center';
        exCirc4.style.alignItems = 'center';
        exCh1.style.height = '5vh';
        exCh2.style.height = '5vh';
        exCh3.style.height = '5vh';
        exCh4.style.height = '5vh';
        exCh1.style.display = 'flex';
        exCh2.style.display = 'flex';
        exCh3.style.display = 'flex';
        exCh4.style.display = 'flex';
        exCh1.style.alignItems = 'center';
        exCh2.style.alignItems = 'center';
        exCh3.style.alignItems = 'center';
        exCh4.style.alignItems = 'center';
        wrQ1.style.display = 'flex';
        wrQ1.style.flexDirection = 'column';
        wrQ1.style.justifyContent = 'space-between';
        wrQ1.style.height = '25vh';
        wrQ2.style.display = 'flex';
        wrQ2.style.flexDirection = 'column';
        wrQ2.style.justifyContent = 'space-between';
        wrQ2.style.height = '25vh';
        wrQ2.style.marginLeft = '2vw';
        inCirc1.className = 'circular-check';
        inCirc4.className = 'circular-check';
        circB1.className = 'circular-checkbox';
        circB4.className = 'circular-checkbox';
        circB1.appendChild(inCirc1);
        circB4.appendChild(inCirc4);
        const circB2 = document.createElement('button');
        const inCirc2 = document.createElement('div');
        inCirc2.className = 'circular-check';
        circB2.className = 'circular-checkbox';
        circB2.appendChild(inCirc2);
        const circB3 = document.createElement('button');
        const inCirc3 = document.createElement('div');
        inCirc3.className = 'circular-check';
        circB3.className = 'circular-checkbox';
        circB3.appendChild(inCirc3);
        wrP.style.display = 'flex';
        wrP.style.flexDirection = 'row';
        wrP.style.marginTop = '9vh';
        wrP.style.fontSize = '0.9vw';
        ques1.innerText = 'Filter parts by:'
        ques1.style.fontWeight = 'bold';
        ques1.style.fontSize = '2vw';
        ques1.style.boxShadow = '0 5px 0 0 #1E90FF';
        ques1.style.borderRadius = '0 0 8px 8px';
        ch1.innerText = 'Specific group order or multiple group orders';
        ch2.innerText = 'Specific floor or multiple floors';
        ch3.innerText = 'Specific unit or multiple units';
        ch4.innerText = 'All orders';
        lastQZ = 2;
        quiz2.className = 'quiz';
        circB1.addEventListener('click', function() {
            toggleCheckbox(this, true);
            const aQues1 = document.createElement('h2');
            const aWrP = document.createElement('div');
            aQues1.innerText = 'Select your orders:';
            aQues1.style.fontWeight = 'bold';
            aQues1.style.fontSize = '2vw';
            aQues1.style.boxShadow = '0 5px 0 0 #1E90FF';
            aQues1.style.borderRadius = '0 0 8px 8px';
            aWrP.style.display = 'flex';
            aWrP.style.flexDirection = 'column';
            aWrP.style.marginTop = '3vh';
            aWrP.style.fontSize = '0.9vw';
            const uniqueGroupOs = new Set();
            fetchNewData()
                .then(() => {
                    ftchDta.forEach((data, index) => {
                        if (!uniqueGroupOs.has(data.groupO)) {
                            const aWrQ1 = document.createElement('div');
                            const avoid = document.createElement('div');
                            avoid.style.width = '2vw';
                            aWrQ1.style.display = 'flex';
                            aWrQ1.style.flexDirection = 'row';
                            aWrQ1.style.justifyContent = 'space-between';
                            const achoiceText = document.createElement('h2');
                            achoiceText.innerText = data.groupO;
                            const circleButton = document.createElement('button');
                            circleButton.className = 'circular-checkbox';
                            const inCircle = document.createElement('div');
                            inCircle.className = 'circular-check';
                            circleButton.appendChild(inCircle);
                            circleButton.addEventListener('click', function() {
                                toggleCheckbox(this, false, data.groupO);
                            });
                            const choiceExtWrapper = document.createElement('div');
                            choiceExtWrapper.appendChild(achoiceText);
                            aWrQ1.appendChild(choiceExtWrapper);
                            aWrQ1.appendChild(avoid);
                            const circleExtWrapper = document.createElement('div');
                            circleExtWrapper.appendChild(circleButton);
                            circleExtWrapper.style.display = 'flex';
                            circleExtWrapper.style.alignItems = 'center';
                            aWrQ1.appendChild(circleExtWrapper);
                            aWrP.prepend(aWrQ1);
                            uniqueGroupOs.add(data.groupO);
                        }
                    });
                });
            lastQZ = 3;
            quiz3.className = 'quiz';
            quiz3.style.overflow = 'auto';
            quiz3.appendChild(aQues1);
            quiz3.appendChild(aWrP);
            wrpr0.appendChild(quiz3);
            setTimeout(function() {
                quiz3.style.opacity = 1;
                prev.style.visibility = 'visible';
                next.style.visibility = 'visible';
            }, 0);
            setTimeout(function() {
                quiz2.style.opacity = 0;
                wrpr0.removeChild(quiz2);
            }, 300);
        });
        circB2.addEventListener('click', function() {
            toggleCheckbox(this, true);
            const aQues1 = document.createElement('h2');
            const aWrP = document.createElement('div');
            aQues1.innerText = 'Select your floors:';
            aQues1.style.fontWeight = 'bold';
            aQues1.style.fontSize = '2vw';
            aQues1.style.boxShadow = '0 5px 0 0 #1E90FF';
            aQues1.style.borderRadius = '0 0 8px 8px';
            aWrP.style.display = 'flex';
            aWrP.style.flexDirection = 'column';
            aWrP.style.marginTop = '3vh';
            aWrP.style.fontSize = '0.9vw';
            const uniqueGroupOs = new Set();
            fetchNewData()
                .then(() => {
                    ftchDta.forEach((data, index) => {
                        if (!uniqueGroupOs.has(data.floor)) {
                            const aWrQ1 = document.createElement('div');
                            const avoid = document.createElement('div');
                            avoid.style.width = '2vw';
                            aWrQ1.style.display = 'flex';
                            aWrQ1.style.flexDirection = 'row';
                            aWrQ1.style.justifyContent = 'space-between';
                            const achoiceText = document.createElement('h2');
                            achoiceText.innerText = data.floor;
                            const circleButton = document.createElement('button');
                            circleButton.className = 'circular-checkbox';
                            const inCircle = document.createElement('div');
                            inCircle.className = 'circular-check';
                            circleButton.appendChild(inCircle);
                            circleButton.addEventListener('click', function() {
                                toggleCheckbox(this, false, data.floor);
                            });
                            const choiceExtWrapper = document.createElement('div');
                            choiceExtWrapper.appendChild(achoiceText);
                            aWrQ1.appendChild(choiceExtWrapper);
                            aWrQ1.appendChild(avoid);
                            const circleExtWrapper = document.createElement('div');
                            circleExtWrapper.appendChild(circleButton);
                            circleExtWrapper.style.display = 'flex';
                            circleExtWrapper.style.alignItems = 'center';
                            aWrQ1.appendChild(circleExtWrapper);
                            aWrP.prepend(aWrQ1);
                            uniqueGroupOs.add(data.floor);
                        }
                    });
                });
            lastQZ = 3;
            quiz3.className = 'quiz';
            quiz3.style.overflow = 'auto';
            quiz3.appendChild(aQues1);
            quiz3.appendChild(aWrP);
            wrpr0.appendChild(quiz3);
            setTimeout(function() {
                quiz3.style.opacity = 1;
                prev.style.visibility = 'visible';
                next.style.visibility = 'visible';
            }, 0);
            setTimeout(function() {
                quiz2.style.opacity = 0;
                wrpr0.removeChild(quiz2);
            }, 300);
        });
        circB3.addEventListener('click', function() {
            toggleCheckbox(this, true);
            const aQues1 = document.createElement('h2');
            const aWrP = document.createElement('div');
            aQues1.innerText = "Select the floor of your unit:";
            aQues1.style.fontWeight = 'bold';
            aQues1.style.fontSize = '2vw';
            aQues1.style.boxShadow = '0 5px 0 0 #1E90FF';
            aQues1.style.borderRadius = '0 0 8px 8px';
            aWrP.style.display = 'flex';
            aWrP.style.flexDirection = 'column';
            aWrP.style.marginTop = '3vh';
            aWrP.style.fontSize = '0.9vw';
            const uniqueGroupOs = new Set();
            fetchNewData()
                .then(() => {
                    ftchDta.forEach((data, index) => {
                        if (!uniqueGroupOs.has(data.floor)) {
                            const aWrQ1 = document.createElement('div');
                            const avoid = document.createElement('div');
                            avoid.style.width = '2vw';
                            aWrQ1.style.display = 'flex';
                            aWrQ1.style.flexDirection = 'row';
                            aWrQ1.style.justifyContent = 'space-between';
                            const achoiceText = document.createElement('h2');
                            achoiceText.innerText = data.floor;
                            const circleButton = document.createElement('button');
                            circleButton.className = 'circular-checkbox';
                            const inCircle = document.createElement('div');
                            inCircle.className = 'circular-check';
                            circleButton.appendChild(inCircle);
                            circleButton.addEventListener('click', function() {
                                toggleCheckbox(this, true);
                                skipB = false;
                                svdta = [];
                                svdta.push(data.floor);
                                svdta0 = data.floor;
                            });
                            const choiceExtWrapper = document.createElement('div');
                            choiceExtWrapper.appendChild(achoiceText);
                            aWrQ1.appendChild(choiceExtWrapper);
                            aWrQ1.appendChild(avoid);
                            const circleExtWrapper = document.createElement('div');
                            circleExtWrapper.appendChild(circleButton);
                            circleExtWrapper.style.display = 'flex';
                            circleExtWrapper.style.alignItems = 'center';
                            aWrQ1.appendChild(circleExtWrapper);
                            aWrP.prepend(aWrQ1);
                            uniqueGroupOs.add(data.floor);
                        }
                    });
                });
                const aWrQ1 = document.createElement('div');
                const avoid = document.createElement('div');
                avoid.style.width = '2vw';
                aWrQ1.style.display = 'flex';
                aWrQ1.style.flexDirection = 'row';
                aWrQ1.style.justifyContent = 'space-between';
                const achoiceText = document.createElement('h2');
                achoiceText.innerText = "Skip";
                const circleButton = document.createElement('button');
                circleButton.className = 'circular-checkbox';
                const inCircle = document.createElement('div');
                inCircle.className = 'circular-check';
                circleButton.appendChild(inCircle);
                circleButton.addEventListener('click', function() {
                    toggleCheckbox(this, true);
                    svdta = [];
                    skipB = true;
                });
                const choiceExtWrapper = document.createElement('div');
                choiceExtWrapper.appendChild(achoiceText);
                aWrQ1.appendChild(choiceExtWrapper);
                aWrQ1.appendChild(avoid);
                const circleExtWrapper = document.createElement('div');
                circleExtWrapper.appendChild(circleButton);
                circleExtWrapper.style.display = 'flex';
                circleExtWrapper.style.alignItems = 'center';
                aWrQ1.appendChild(circleExtWrapper);
                aWrP.prepend(aWrQ1);
            lastQZ = 3;
            quiz3.className = 'quiz';
            quiz3.style.overflow = 'auto';
            quiz3.appendChild(aQues1);
            quiz3.appendChild(aWrP);
            wrpr0.appendChild(quiz3);
            setTimeout(function() {
                quiz3.style.opacity = 1;
                prev.style.visibility = 'visible';
                next.style.visibility = 'visible';
            }, 0);
            setTimeout(function() {
                quiz2.style.opacity = 0;
                wrpr0.removeChild(quiz2);
            }, 300);
            isunit = true;
        });
        circB4.addEventListener('click', function() {
            toggleCheckbox(this, true);
            lastQZ = 3;
            isallp = true;
            svdta.push("All orders");
            next.click();
        });
        exCh1.appendChild(ch1);
        exCh2.appendChild(ch2);
        exCh3.appendChild(ch3);
        exCh4.appendChild(ch4);
        wrQ1.appendChild(exCh1);
        wrQ1.appendChild(exCh2);
        wrQ1.appendChild(exCh3);
        wrQ1.appendChild(exCh4);
        exCirc1.appendChild(circB1);
        exCirc2.appendChild(circB2);
        exCirc3.appendChild(circB3);
        exCirc4.appendChild(circB4);
        wrQ2.appendChild(exCirc1);
        wrQ2.appendChild(exCirc2);
        wrQ2.appendChild(exCirc3);
        wrQ2.appendChild(exCirc4);
        quiz2.appendChild(ques1);
        wrP.appendChild(wrQ1);
        wrP.appendChild(wrQ2);
        quiz2.appendChild(wrP);                  
        wrpr0.appendChild(quiz2);
        setTimeout(function() {
            quiz2.style.opacity = 1;
            prev.style.visibility = 'visible';
        }, 0);
        setTimeout(function() {
            quiz.style.opacity = 0;
            wrpr0.removeChild(quiz);
        }, 300);
    });
    prev.addEventListener('click', function() {
        if (isallp) {
            next.style.visibility = 'hidden';
            document.querySelectorAll('.circular-checkbox').forEach(function(element) {
                element.classList.remove('toggle');
            });
            svdta = [];
            dict[lastQZ-2].style.opacity = 1;
            dict[lastQZ].style.opacity = 0;
            wrpr0.removeChild(dict[lastQZ]);
            dict[lastQZ].innerHTML = '';
            lastQZ -= 2;
            isallp = false;
            return;
        }
        if (lastQZ !== 5 && !isunit2) {
            tmparv = false;
            wrpr0.appendChild(dict[lastQZ-1]);
            setTimeout(function() {
                if (lastQZ - 1 === 1) {
                    prev.style.visibility = 'hidden';
                    next.style.visibility = 'hidden';
                }
                if (lastQZ - 1 === 2) {
                    next.style.visibility = 'hidden';
                    document.querySelectorAll('.circular-checkbox').forEach(function(element) {
                        element.classList.remove('toggle');
                    });
                    svdta = [];
                    isunit = false;
                }
                if (lastQZ - 1 > 2) {
                    next.style.visibility = 'visible';
                }
                dict[lastQZ-1].style.opacity = 1;
                dict[lastQZ].style.opacity = 0;
                wrpr0.removeChild(dict[lastQZ]);
                dict[lastQZ].innerHTML = '';
                lastQZ -= 1;
            }, 0);
        } else if (lastQZ == 5 && !isunit2){
            wrpr0.appendChild(dict[lastQZ-2]);
            setTimeout(function() {
                dict[lastQZ-2].style.opacity = 1;
                dict[lastQZ].style.opacity = 0;
                wrpr0.removeChild(dict[lastQZ]);
                dict[lastQZ].innerHTML = '';
                lastQZ -= 2;
            }, 0);
            isunit = true;
            svdta.push(svdta0);
        } else {
            wrpr0.appendChild(dict[lastQZ+1]);
            setTimeout(function() {
                dict[lastQZ+1].style.opacity = 1;
                dict[lastQZ].style.opacity = 0;
                wrpr0.removeChild(dict[lastQZ]);
                dict[lastQZ].innerHTML = '';
                lastQZ += 1;
            }, 0);
            isunit2 = false;
            next.style.visibility = 'visible';
        }
    });
    next.addEventListener('click', function() {
        if (!isunit) {
            svdta2 = svdta;
            const aQues1 = document.createElement('h2');
            const aWrP = document.createElement('div');
            aQues1.innerText = 'Save or apply your preset:';
            aQues1.style.fontWeight = 'bold';
            aQues1.style.fontSize = '2vw';
            aQues1.style.boxShadow = '0 5px 0 0 #1E90FF';
            aQues1.style.borderRadius = '0 0 8px 8px';
            aWrP.style.display = 'flex';
            aWrP.style.flexDirection = 'column';
            aWrP.style.marginTop = '3vh';
            aWrP.style.fontSize = '0.9vw';
            aWrP.style.justifyContent = 'center';
            aWrP.style.alignItems = 'center';
            const fform = document.createElement('form');
            const inputElement = document.createElement('input');
            const inputElement2 = document.createElement('input');
            const prest = document.createElement('h2');
            const prestnbr = document.createElement('h2');
            const prestprt = document.createElement('h2');
            const slect = document.createElement('select');
            var selectElement = document.createElement('select');
            selectElement.style.width = '8vw';
            selectElement.style.fontSize = '1.2vw';
            var options = [
                { value: '', text: 'All part' },
                { value: 'part1', text: '90° Profile' },
                { value: 'part2', text: '30° Knife Edge' },
                { value: 'part3', text: '45° Knife Edge' },
                { value: 'part4', text: '90° 3 Way Profile' },
                { value: 'part5', text: '135° Bulkhead Profile' },
                { value: 'part6', text: '135° Profile' },
                { value: 'part7', text: 'C-Cap Profile' },
                { value: 'part8', text: 'Column Profile' },
                { value: 'part9', text: 'Fire Rated Enclosure Double' },
                { value: 'part10', text: 'Fire Rated Enclosure' },
                { value: 'part11', text: 'Hat Profile' },
                { value: 'part12', text: 'Multi-Step profile' },
                { value: 'part13', text: 'Radius Bulkhead' },
                { value: 'part14', text: 'Radius Profile' },
                { value: 'part15', text: '90° 4 Way Profile' }
            ];
            options.forEach(function (option) {
                var optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.text;
                selectElement.appendChild(optionElement);
            });
            fform.style.display = 'flex';
            fform.style.flexDirection = 'column';
            fform.style.justifyContent = 'center';
            fform.style.alignItems = 'center';
            prest.innerText = 'Preset name:'
            prestnbr.innerText = 'Parts displayed by row:'
            prestprt.innerText = 'Parts filter:'
            inputElement.type = 'text';
            inputElement.style.fontSize = '1vw';
            inputElement.style.width = '20vw';
            inputElement2.id = 'partnbr';
            inputElement2.type = 'text';
            inputElement2.style.fontSize = '1vw';
            inputElement2.style.width = '2vw';
            inputElement2.value = 10;
            let currentDate = new Date();
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            inputElement.value = `${year}/${month}/${day}`;
            fform.appendChild(prest);
            fform.appendChild(inputElement);
            fform.appendChild(prestnbr);
            fform.appendChild(inputElement2);
            fform.appendChild(prestprt);
            fform.appendChild(selectElement);
            aWrP.appendChild(fform);
            const appl = document.createElement('button');
            appl.className = 'shrinkB';
            appl.innerText = 'Apply';
            appl.style.backgroundColor = 'darkgreen';
            appl.style.marginTop = '5vh';
            const applS = document.createElement('button');
            applS.className = 'shrinkB';
            applS.innerText = 'Apply and save';
            applS.style.marginTop = '3vh';
            aWrP.appendChild(appl);
            aWrP.appendChild(applS);
            lastQZ = 4;
            quiz4.className = 'quiz';
            quiz4.appendChild(aQues1);
            quiz4.appendChild(aWrP);
            wrpr0.appendChild(quiz4);
            setTimeout(function() {
                quiz4.style.opacity = 1;
                next.style.visibility = 'hidden';
            }, 0);
            setTimeout(function() {
                quiz3.style.opacity = 0;
                wrpr0.removeChild(quiz3);
            }, 300);
            selectElement.addEventListener('change', function(event) {
                partSort = event.target.value;
            });
            appl.addEventListener('click', function() {
                document.getElementById('groupB').classList.remove('active');
                document.getElementById('fltB').classList.add('active');
                document.getElementById('filterCont').style.border = 'solid #1E90FF 0.4vw';
                document.getElementById('filterExpend').style.maxHeight = '60vh';
                document.getElementById('filterExpend').style.visibility = 'visible';
                nbr = inputElement2.value;
                getPart();
                close.click();
            });
            applS.addEventListener('click', function() {
                document.getElementById('groupB').classList.remove('active');
                document.getElementById('fltB').classList.add('active');
                document.getElementById('filterCont').style.border = 'solid #1E90FF 0.4vw';
                document.getElementById('filterExpend').style.maxHeight = '60vh';
                document.getElementById('filterExpend').style.visibility = 'visible';
                nbr = inputElement2.value;
                getPart();
                savePrst(inputElement.value);
                close.click();
            });
            if (tmparv) {
                isunit2 = true;
            }
        } else {
            const aQues1 = document.createElement('h2');
            const aWrP = document.createElement('div');
            aQues1.innerText = 'Select your units:';
            aQues1.style.fontWeight = 'bold';
            aQues1.style.fontSize = '2vw';
            aQues1.style.boxShadow = '0 5px 0 0 #1E90FF';
            aQues1.style.borderRadius = '0 0 8px 8px';
            aWrP.style.display = 'flex';
            aWrP.style.flexDirection = 'column';
            aWrP.style.marginTop = '3vh';
            aWrP.style.fontSize = '0.9vw';
            const uniqueGroupOs = new Set();
            fetchNewData()
                .then(() => {
                    ftchDta.forEach((data, index) => {
                        if (data.floor === svdta[0] || skipB) {
                            if (!uniqueGroupOs.has(data.unit)) {
                                const aWrQ1 = document.createElement('div');
                                const avoid = document.createElement('div');
                                avoid.style.width = '2vw';
                                aWrQ1.style.display = 'flex';
                                aWrQ1.style.flexDirection = 'row';
                                aWrQ1.style.justifyContent = 'space-between';
                                const achoiceText = document.createElement('h2');
                                achoiceText.innerText = data.unit;
                                const circleButton = document.createElement('button');
                                circleButton.className = 'circular-checkbox';
                                const inCircle = document.createElement('div');
                                inCircle.className = 'circular-check';
                                circleButton.appendChild(inCircle);
                                circleButton.addEventListener('click', function() {
                                    toggleCheckbox(this, false, data.unit);
                                });
                                const choiceExtWrapper = document.createElement('div');
                                choiceExtWrapper.appendChild(achoiceText);
                                aWrQ1.appendChild(choiceExtWrapper);
                                aWrQ1.appendChild(avoid);
                                const circleExtWrapper = document.createElement('div');
                                circleExtWrapper.appendChild(circleButton);
                                circleExtWrapper.style.display = 'flex';
                                circleExtWrapper.style.alignItems = 'center';
                                aWrQ1.appendChild(circleExtWrapper);
                                aWrP.prepend(aWrQ1);
                                uniqueGroupOs.add(data.unit);
                            }
                        }
                    });
                    svdta = [];
                    skipB = false;
                });
            lastQZ = 5;
            quiz5.className = 'quiz';
            quiz5.style.overflow = 'auto';
            quiz5.appendChild(aQues1);
            quiz5.appendChild(aWrP);
            wrpr0.appendChild(quiz5);
            setTimeout(function() {
                quiz5.style.opacity = 1;
                next.style.visibility = 'visible';
            }, 0);
            setTimeout(function() {
                quiz3.style.opacity = 0;
                wrpr0.removeChild(quiz3);
            }, 300);
            isunit = false;
            tmparv = true;
        }
    });
    close.addEventListener('click', function() {
        toggleBlur(wrpr0)
        dict[lastQZ].style.opacity = 0;
        wrpr0.style.opacity = 0;
        setTimeout(function() {
            body.removeChild(wrpr0);
            dict[lastQZ].innerHTML = '';
            wrpr0.removeChild(dict[lastQZ]);
            lastQZ = 1;
        }, 400);
        svdta = [];
        isunit = false;
        tmparv = false;
        document.getElementById('filterQuizScript').remove();
    });
    quiz.appendChild(addNew);
    wrpr0.appendChild(quiz);
    wrpr0.appendChild(next);
    wrpr0.appendChild(prev);
    wrpr0.appendChild(close);
    body.appendChild(wrpr0);
    setTimeout(function() {
        wrpr0.style.opacity = 1;
    }, 0);
    setTimeout(function() {
        quiz.style.opacity = 1;
    }, 0);
    toggleBlur(wrpr0)
} else {
    alert("Please choose a worksite");
    document.getElementById('filterQuizScript').remove();
}