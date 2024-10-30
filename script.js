const timeBox = document.querySelector(".time-box");
const inputTimeBox = document.querySelector(".input-time-box");
const select_hours = document.querySelector("#hours");
const select_minutes = document.querySelector("#minutes");
const select_am_pm = document.querySelector("#AMPM");
const btn = document.querySelector("button");
let time;
let current_time;
let alarm_time;
let count = 0;
let alarm_tone = new Audio("./assests/alarm.mp3");


function updateTime(){
    const date  = new Date();
    // console.log(date);

    const hours = date.getHours();
    let new_hours = hours > 12 ? hours%12 : hours;
    new_hours < 10 ? new_hours = '0' + new_hours : new_hours;

    let mins = date.getMinutes();
    mins < 10 ? mins = '0' + mins : mins;


    let second = date.getSeconds();
    second < 10 ? second = '0' + second : second;

    let am_pm;
    if(hours >= 12 && hours <24){
        am_pm = "PM";
    }
    else{
        am_pm = "AM";
    }

    time  = new_hours + ":" + mins + ":" + second;
    current_time = new_hours + ":" + mins;
    timeBox.textContent = time;

    if(alarm_time == current_time && am_pm == select_am_pm.value){
        alarm_tone.play();
        alarm_tone.loop = true;
    }

}

setInterval(updateTime,1000);

for(let i = 1; i<= 12; i++){
    let option = document.createElement("option");
    option.textContent = i;
    i < 10 ? option.textContent = '0' + i : i;
    select_hours.appendChild(option);
}

for(let i = 0; i<= 59; i++){
    let option = document.createElement("option");
    option.textContent = i;
    i < 10 ? option.textContent = '0' + i : i;
    select_minutes.appendChild(option);
}

function setAlarmTime(){

    count++;
    // console.log("count :",count);
    if(count%2 == 0){
        alarm_tone.pause();
        alarm_time = "";
        inputTimeBox.classList.remove("disable");
        btn.innerText = "Set Alarm";
        return;
    }


    if(select_hours.value == "" || select_minutes.value == ""){
        return alert("please select a valid time!")
    }
    alarm_time = select_hours.value + ":" + select_minutes.value;

    
    
    console.log("alarm_time" , alarm_time);
    console.log(" current_time :", current_time);
    inputTimeBox.classList.add("disable");
    btn.innerText = "Clear Alarm";
}

btn.addEventListener("click" , setAlarmTime);


