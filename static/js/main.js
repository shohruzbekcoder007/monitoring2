//logic
const logicFunction = () => {
    let logic = {
        t: false,
        message: document.createElement('div')
        // message: document.querySelector('#body-error')
    };
    for (let i = 11; i <= 22; i++) {
        let nyb11_home = document.querySelectorAll(`[data-date="${i}:0"]`);
        let nyb11_person = document.querySelectorAll(`[data-date="${i}:1"]`);
        for(let j = 0; j < nyb11_home.length; j++){
            if(nyb11_home[j].value != "" && nyb11_person[j].value == ""){
                logic.t = true;
                let uchastka_number = nyb11_home[j].parentElement.parentElement.children[1].children[0].value;
                let errorElement = document.createElement('p');
                errorElement.innerHTML = `${uchastka_number} hisob uchastkasi uchun aholi soni kiritilsin (sana: ${i}-noyabr)`
                logic.message.appendChild(errorElement);
            }
            if(nyb11_home[j].value == "" && nyb11_person[j].value != ""){
                logic.t = true;
                let uchastka_number = nyb11_home[j].parentElement.parentElement.children[1].children[0].value;
                let errorElement = document.createElement('p');
                errorElement.innerHTML = `${uchastka_number} hisob uchastkasi uchun turar joylar soni kiritilsin (sana: ${i}-noyabr)`
                logic.message.appendChild(errorElement);
            }
        }
    }
    console.log(logic);
    document.querySelector('#body-error').innerHTML = '';
    document.querySelector('#body-error').appendChild(logic.message);
    if(logic.t){
        document.querySelector('#modal-errors').classList.remove('dbn')
    }
    return logic.t;
}

// last date
const lastDate = () => {
    let date = new Date().getUTCDate();
    console.log(date);
    for(let i = 11; i < date; i++){
        let day1 = document.querySelectorAll(`[data-date="${i}:0"]`);
        day1.forEach(elem => {
            elem.disabled = true;
        })
        let day2 = document.querySelectorAll(`[data-date="${i}:1"]`);
        day2.forEach(elem => {
            elem.disabled = true;
        })
    }
}

// close error message
let close_error = document.querySelector('#close-error');
if(close_error != undefined){
    close_error.addEventListener('click', (event) => {
        document.querySelector('#modal-errors').classList.add('dbn')
    })
}

// update report
let update_report = document.querySelector("#update_report");
if (update_report != undefined) {
    update_report.addEventListener('click', (event) => {
        let t = logicFunction();
        if(!t){
            let uchastkalar = document.querySelectorAll('.hisob-uchastka');
            let reqBody = [];
            for(let i = 0; i < uchastkalar.length; i++) {
                let uchastka = {};
                let uchastka_id = uchastkalar[i].getAttribute('data-uchastka-id');
                if(uchastka_id == undefined || uchastka_id == null) continue
                let uchastka_number = uchastkalar[i].getAttribute('data-row-number');
                if(uchastka_number == undefined || uchastka_number == null) continue
                uchastka.id = uchastka_id;
                uchastka.number = uchastka_number;
                let inputs = uchastkalar[i].querySelectorAll(`input`)
                uchastka.col={}
                inputs.forEach(elem => {
                    if(elem.getAttribute('data-col') != null && elem.getAttribute('data-col') != undefined){
                        if(elem.value != ''){
                            uchastka.col[elem.getAttribute('data-col')] = elem.value
                        }else{
                            uchastka.col[elem.getAttribute('data-col')] = 0
                        }
                    }
                });
                reqBody.push(uchastka)
            }
            request = $.ajax({
                url: "/staff/update_report",
                type: "put",
                data: {data: reqBody}
            });
            request.done(function(response, textStatus, jqXHR) {
                console.log("Hooray, it worked!" + " topildi: " + response);
                location.reload();
            });
            request.fail(function(jqXHR, textStatus, errorThrown) {
                console.error(
                    "The following error occurred: " +
                    textStatus, errorThrown
                );
                alert("Malumotlarni kiritishda xatolikka yo'l qo'ydingiz!")
            });
            request.always(function() {
                let $form = $('.modal');
                let $inputs = $form.find("input, select, button, textarea");
                $inputs.prop("disabled", false);
            });
        }
    });
}

let search = document.querySelector("#search-btn");
if (search != undefined) {
    search.addEventListener('click', (event) => {
        let temp = document.querySelector('#search-input').value
        let url = event.target.getAttribute('data_href');
        location.href = url+`&temp=${temp}`
    });
}

let next_btn = document.querySelector("#btn-next");
if (next_btn != undefined) {
    next_btn.addEventListener('click', (event) => {
        let url = event.target.getAttribute('data_href');
        location.href = url;
    });
}

let prev_btn = document.querySelector("#btn-prev");
if (prev_btn != undefined) {
    prev_btn.addEventListener('click', (event) => {
        let url = event.target.getAttribute('data_href');
        location.href = url;
    });
}

const summaColInput = (gr) => {
    let col = document.querySelectorAll(`[data-col="${gr}"]`);
    let summa = 0;
    col.forEach(elem => {
        if(+elem.value){
            summa = summa + (+elem.value);
        }
    })
    document.querySelector(`[col-number="${gr}"]`).textContent = summa;
}

const summaRowInput = (row) => {
    let rows = document.querySelectorAll(`[data-row="${row}"]`);
    let summa1 = 0;
    let summa2 = 0;
    rows.forEach((elem, index) => {
        if(index%2 != 0){
            if(+elem.value){
                summa1 = summa1 + (+elem.value);
            }
        } else {
            if(+elem.value){
                summa2 = summa2 + (+elem.value);
            }
        }
    })
    summarow = document.querySelectorAll(`[row-number="${row}"]`);
    summarow[1].textContent = summa1;
    summarow[0].textContent = summa2;
}

const total_xonadon = () => {
    let col = document.querySelectorAll(`[data-col="g25"]`);
    let sum = 0;
    col.forEach(elem => {
        if(+elem.textContent){
            sum = sum + (+elem.textContent);
        }
    });
    return sum;
}

const total_axoli = () => {
    let col = document.querySelectorAll(`[data-col="g26"]`);
    let sum = 0;
    col.forEach(elem => {
        if(+elem.textContent){
            sum = sum + (+elem.textContent);
        }
    });
    return sum;
}

$(document).ready(function() {
    for(let i = 1; i < document.querySelectorAll('tbody tr').length; i++){
        summaRowInput('row' + i)
    }
    lastDate();
});
