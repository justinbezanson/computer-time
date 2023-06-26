const ITEMS_PER_SECOND: number = 15;
let CURRENT: number;
let LEN: number;
let list = document.querySelector("#list");
let done = document.querySelector("#done");

let names: string[] = [
    "30 minutes",
    "45 minutes",
    "60 minutes",
    "90 minutes",
    "120 minutes"
];

let doneNames: string[] = [];

function init() {
    drawLists();

    document.querySelector('#spin')?.addEventListener('click', function(e) {
        spin(randomNext(), ITEMS_PER_SECOND);
    });

    setDate();
}

function drawLists() {
    names.sort();
    doneNames.sort();

    drawList(names, '#list', false);

    LEN = names.length;
    CURRENT = randomNext();
}

function drawList(names: string[], selector: string, checked: boolean) {
    let list = document.querySelector(selector);
    if(list !== null) list.innerHTML = "";

    names.sort();

    names.forEach(name => {
        list?.appendChild(createNode(name, checked));
    });
}

function createNode(name: string, checked: boolean) : Node {
    let checkedProp = checked ? ' checked' : '';
    let html = `
        <div class="form-check mb-3 time" data-name="${name}">
            <label class="form-check-label"><span class="fst-italic pl-1">${name}</span></label>
        </div>
    `.trim();

    let template = document.createElement("template");
    template.innerHTML = html;

    return template.content.firstChild!;
}

function randomNext() : number {
    return Math.floor(Math.random() * LEN);
}

function spin(next: number, itemsPerSecond: number) {
    CURRENT = next;
    let timeout = setTimeout(onItem, (1 / ITEMS_PER_SECOND) * 1000);
  
    function onItem () {
        // stop if speed is low enough
      if (itemsPerSecond < 1)
        return;
        
      // spin to next item
      CURRENT++;
      if (CURRENT >= LEN)
      CURRENT = 0;
        
      // paint text
      draw();
      
      // reduce speed
      clearTimeout(timeout);
      itemsPerSecond--;
      timeout = setTimeout(onItem, (1 / itemsPerSecond) * 1000);
    }
}

function draw() {
    let times = document.querySelectorAll('#list .time');

    for (let i: number = 0 ; i < times.length ; i++) {
        let time = times[i] as HTMLElement;
        time.style.color = (i == CURRENT) ? 'red' : '#000000';
        time.style.fontWeight = (i == CURRENT) ? 'bold' : 'normal';
    }
}

function setDate() {
    let now = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let day = days[ now.getDay() ];
    let month = months[ now.getMonth() ];

    let dayOfWeek = document.querySelector('#day_of_week');    
    if(dayOfWeek !== null) {
        dayOfWeek.innerHTML = day;
    }

    let fullDate = document.querySelector('#full_date');    
    if(fullDate !== null) {
        fullDate.innerHTML = `${now.getDate()} ${month} ${now.getFullYear()}`;
    }
}

function removeName(name: string, arr:string[]) {
    const index = arr.indexOf(name);
    if(index > -1) {
        arr.splice(index, 1);
    }
}

init();