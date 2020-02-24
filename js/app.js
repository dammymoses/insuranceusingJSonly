const form=document.getElementById('request-quote');

const html = new HTMLUI();
document.addEventListener('DOMContentLoaded',function(){
    
    html.displayYears();
});
form.addEventListener('submit',function(e){
    e.preventDefault();

    const make=document.getElementById('make').value;
    const year = document.getElementById('year').value;

    const level=document.querySelector('input[name="level"]:checked').value

    if(make === ''|| year===''|| level===''){
        html.displayError('All the field are mandatory');
    }
    else{
        const result=document.querySelector('#result div');
        if(result != null){
            result.remove()
        }
        
       const insurance = new Insurance(make,year,level);
       const price = insurance.calculateQuotation(insurance)
       
       html.displayResult(price,insurance);
    }
})


function Insurance(make,year,level){

        this.make=make;
        this.year=year;
        this.level= level;
}
Insurance.prototype.calculateQuotation = function(insurance){
    let price;
    const base =2000;
    const make =insurance.make;
    
    switch(make){
        case '1': 
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3': 
            price= base * 1.35;
             break;
    }
    const year = insurance.year;
    const difference = this.getYearDifference(year);
    
    price = price -((difference * 3)*price)/100;
    //console.log(price);
    const level =this.level
     price = this.calculateLevel(price,level)
    return price;
}

Insurance.prototype.getYearDifference = function(year){
    return new Date().getFullYear()-year;
}

Insurance.prototype.calculateLevel = function(price,level){
    
    if(level === 'basic'){
        price =price * 1.30;
    }
    else{
        price =price * 1.50
    }
    return price;
}





function HTMLUI(){}
    HTMLUI.prototype.displayYears=function(){
        const max = new Date().getFullYear(),
                min= max-20;

        const selectYears=document.getElementById('year');

        for(let i=max; i>min; i--){
            const option=document.createElement('option');
            option.value=i;
            option.textContent=i;
            selectYears.appendChild(option);
            console.log(i);
        }
    }

    HTMLUI.prototype.displayError=function(message){
       const oneError=document.querySelectorAll('.error').length;
        const div = document.createElement('div');
        div.classList='error';
        div.innerHTML=`<p>${message}</p>`;

        if (oneError > 0){

        }
        else{
            form.insertBefore(div,document.querySelector('.form-group'));
            setTimeout(function(){
                document.querySelector('.error').remove();
                },3000)
        }
    }

HTMLUI.prototype.displayResult=function(price, insurance){
// console.log(price, make, year, level);
const make=insurance.make;
let p;
const year=insurance.year;
const level=insurance.level;
switch(make){
    case '1': p='America' 
    break;
    case '2': p='Asian' 
    break;
    case '3': p='Europen' 
    break;
    
}
const result=document.getElementById('result');
const div = document.createElement('div');
div.innerHTML=`
<p class="header">Summuary</p>
<p>Make:${p}</p>
<p>Year:${year}</p>
<p>Level:${level}</p>
<p >Total:$${price}</p>`;
const image =document.querySelector('#loading img');
 image.style.display='block';
setTimeout(function(){
    image.style.display='none';  
     result.appendChild(div); 
},3000)


}