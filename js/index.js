import './../style/style.css';
import './../style/bootstrap.min.css';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import axios from 'axios';

const swiper = new Swiper('.swiper', { 
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }, 

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

     autoplay: {
         delay: 1000,
     },
});


$(document).ready(function () {
    var resultSum = 0;
    
    $("#type_deposit").change(function () {
        var val = $(this).val();
        if (val == "Вид вклада") {
            $("#long_deposit").html("<option>Срок вклада</option>");
        }
        else if (val == "Пополняемый") {
            $("#long_deposit").html("<option value='20'>6 месяцев - 20%</option> <option value='22'>1 год - 22%</option> <option value='15'>1,5 года - 15%</option> <option value='10'>2 года - 10%</option>");
        } else if (val == "Срочный") {
            $("#long_deposit").html("<option value='20'>3 месяца - 20%</option> <option value='22'>6 месяцев - 22%</option> <option value='23'>9 месяцев - 23%</option> <option value='24'>1 год - 24%</option> <option value='18'>1,5 года - 18%</option> <option value='15'>2 года - 15%</option>");
        }
    });
    
    $("#calc").click(function () {
       
        var sum = $('#sum').val();
        
        var type = $('#type_deposit').val();
        var long = $('#long_deposit').val();
        if (type == "Пополняемый") {
            resultSum = Number(sum) + (sum*(long)*0.01); // 0.01 из-за того, что пополняемый
        }
        else if (type == "Срочный") {
            resultSum = Number(sum) + (sum*(long)*0.015); // 0.015 из-за того, что срочный
        }
        document.getElementById('result').innerHTML = ("Вклад " + type + " на срок " + $('#long_deposit option:selected').text() + " на сумму " + sum + " руб." + "<br>В конце срока вы получите " + resultSum + " руб.");  
    });

});

axios
    .get('https://api.hh.ru/vacancies', {
        params:{
            per_page: 30,
            text: 'Разработчик C++'    
        }
    })
    .then(response => {
        console.log(response); 
        document.getElementById('1.name').innerHTML = (response.data.items[0].name);
        document.getElementById('1.salaryFrom').innerHTML = (response.data.items[0].salary.from);
        document.getElementById('1.salaryTo').innerHTML = (response.data.items[0].salary.to);
        $("#link1").html('<a href=' + response.data.items[0].alternate_url +' target=_blank >Переход на вакансию</a>');
        

        document.getElementById('2.name').innerHTML = (response.data.items[1].name);
        document.getElementById('2.salaryFrom').innerHTML = (response.data.items[1].salary.from);
        document.getElementById('2.salaryTo').innerHTML = (response.data.items[1].salary.to);
        $("#link2").html('<a href=' + response.data.items[1].alternate_url +' target=_blank >Переход на вакансию</a>');

        document.getElementById('3.name').innerHTML = (response.data.items[2].name);
        document.getElementById('3.salaryFrom').innerHTML = (response.data.items[2].salary.from);
        document.getElementById('3.salaryTo').innerHTML = (response.data.items[2].salary.to);
        $("#link3").html('<a href=' + response.data.items[2].alternate_url +' target=_blank >Переход на вакансию</a>');
    })
    .catch((error)=>{
        console.error(error);
    });