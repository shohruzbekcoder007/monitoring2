// update report
let update_report = document.querySelector("#update_report");
if (update_report != undefined) {
    update_report.addEventListener('click', (event) => {
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
    });
}

// document.querySelector('#next_report').addEventListener('click', () => {
//     let report = document.querySelector('#next_report');
//     request = $.ajax({
//         url: "/staff",
//         type: "post",
//         data: {
//             skip: 10,
//             user_name: report.getAttribute('report_name'),
//             password: report.getAttribute('report_text'),
//         }
//     });
//     request.done(function(response, textStatus, jqXHR) {
//         console.log("Hooray, it worked!" + " topildi: " + response);
//         location.reload();
//     });
//     request.fail(function(jqXHR, textStatus, errorThrown) {
//         console.error(
//             "The following error occurred: " +
//             textStatus, errorThrown
//         );
//         alert("Malumotlarni kiritishda xatolikka yo'l qo'ydingiz!")
//     });
//     request.always(function() {
//         let $form = $('.modal');
//         let $inputs = $form.find("input, select, button, textarea");
//         $inputs.prop("disabled", false);
//     });
// })

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
    // for(let i = 1; i < 25; i++){
    //     summaColInput('g'+i);
    // }
    for(let i = 1; i < document.querySelectorAll('tbody tr').length; i++){
        summaRowInput('row' + i)
    }
    // document.querySelector(`[col-number="g25"]`).textContent = total_xonadon();
    // document.querySelector(`[col-number="g26"]`).textContent = total_axoli();
    // document.querySelector('#aholi').textContent = total_axoli();
    // document.querySelector('#xonadon').textContent = total_xonadon();
});
