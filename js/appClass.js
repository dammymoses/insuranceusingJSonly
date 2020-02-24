//declaration
const Year = document.getElementById('year');
const Form= document.getElementById('request-quote');
const result =document.getElementById('result');
//class
class HTMLUI{

displayYears(){
const Max= new Date().getFullYear();
const Min = Max-20;

for(let i=Max; i>Min; i--){
const showYear=document.createElement('option');
showYear.textContent=i;
showYear.value=i;
Year.appendChild(showYear);
     }
    }
displayErrorMessage(Message){
    const formGroup = document.querySelector('.form-group');
    const div = document.createElement('div');
    div.textContent=Message;
    div.classList='error';
    Form.insertBefore(div,formGroup);
    setTimeout(()=>{
        document.querySelector('.error').remove()
    },3000)
    
}
displayResult(price,insurance){
    let make = insurance.make;
    
    switch(make){
        case '1': make ='America';
                 break;
        case '2': make ='Asian';
                 break;
        case '3': make ='Europen';
                 break;
    }
    
    const div = document.createElement('div');
    div.innerHTML=`
        <p class='header'>Summary</p>
        <p>Make: ${make}</p>
        <p>Year: ${insurance.year}</p>
        <p>Level: ${insurance.level}</p>
        <p>Total: $${price}</p>
    `
    document.querySelector('#loading img').style.display='block';
    setTimeout(()=>{
        document.querySelector('#loading img').style.display='none';
        result.appendChild(div);
    },1000)
   

}
}

class Insurance{
    constructor(make,year,level){
        this.make=make;
        this.year=year;
        this.level=level;
    }
    getInsurance(insurance){
        let price;
        const base=2000;
        let make = insurance.make;
        let level = insurance.level;
        switch(make){
            case '1': price = base * 1.15; break;
            case'2': price = base * 1.05; break;
            case'3': price = base * 1.35; break;
        }
        price = price -((this.calculateYearDifference(insurance) * 3)*price)/100;
        let newPrice=this.usingLevel(price,level)
        return newPrice;
    }
    calculateYearDifference(insurance){
        const currentYear = new Date().getFullYear();
        const  selectedYear= insurance.year;
        const yearsdifference = currentYear - selectedYear;
        return yearsdifference
    }
    usingLevel(price,level){
        if(level === 'basic'){
            price =price * 1.30;
        }
        else{
            price =price * 1.50
        }
        return price;
    }
}
const html = new HTMLUI();
 
//eventListener
eventListener();

function eventListener(){
    html.displayYears()
Form.addEventListener('submit',function(e){
    e.preventDefault();
    const make = document.getElementById('make').value;
    const year= document.getElementById('year').value;
    const level = document.querySelector('input[name="level"]:checked').value;
    const result = document.querySelector('#result div');
    if (make === '' || year === '' || level === ''){
        html.displayErrorMessage('All field are mandtory')
    }
    else{
        
        if(result !== null){
            result.remove()
        }
        const insurance = new Insurance(make,year,level);
        const price=insurance.getInsurance(insurance);
        insurance.calculateYearDifference(insurance);
        html.displayResult(price,insurance);
    }
})
}