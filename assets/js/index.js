//  intialise  the alarm app and show current time


function play() {
    var audio = new Audio('./assets/audio/beep.mp3');
    audio.play();
  }

function intialiseApp(){
    
    

    setInterval(function(){
        let todayDate=new Date();
    let currentTime=todayDate.toLocaleTimeString();
    //  now this time hour digit can have single digit and lets add 0 for them so that all the hours times get the format of 2 digits
    let arr=currentTime.split(':');
    if(arr[0]<10){
        currentTime=`0${currentTime}`;
    }
    //  now lets check if the current timematches with the alarmList
    let alarmList=getAlarmList();
    if(alarmList){
        // now matching the current time 
        if(alarmList.indexOf(currentTime)>-1){
           
            
             play();

              setTimeout(function(){
                alert('Alarm: ' + currentTime);

              },500)
            
            
            // we may remove alarm also after the alarm alert by simply executing removeAlarm(time); 
        }
    }


    
    document.getElementById('current-time').innerHTML=`${currentTime}`;

    },1000)
    
}

// getting the list of alarms from the local storage 

function getAlarmList(){
    let alarmList=localStorage.getItem('alarmList');
    if(alarmList){
        return JSON.parse(alarmList)
    } else return false;
}

//  storing the list of alrms into the local Storage

function setAlarmList(alarmList){
    localStorage.setItem('alarmList',JSON.stringify(alarmList));
    return;
}

// now lets add the alarm set event handeler

document.getElementById('set-alarm').addEventListener('click',setAlarm);

function setAlarm(){

    let hour=document.getElementById('hour').value;
    let minute=document.getElementById('minute').value;
    let second=document.getElementById('second').value;
    let am_pm=document.getElementById('am-pm').value;
    //  now let get every unit fomated
   
    // validation are first so that we donot lost the typof as number

    if(hour==""|| minute==""|| second==""){
        alert('Please fill all the time fields');
        return;
    }
    if(hour>12|| hour<1){
        alert('please enter the valid hour');
        return;
    }
    if(minute>59|| minute<0){
        alert('Please enter the valid minutes');
        return;
    }
    if(second>59||second<0){
        alert('please eneter the valid second');
        return;
    }

    hour=parseInt(hour);
    if(hour<10){
        hour=`0${hour}`;
    }
    minute=parseInt(minute);
    if(minute<10){
        minute=`0${minute}`;
    }
    second=parseInt(second);
    if(second<10){
        second=`0${second}`;
    }
    // note here the timeString should be same format as the currentTime being presented

    let timeString=`${hour}:${minute}:${second} ${am_pm}`;

    let alarmList=getAlarmList();
    if(alarmList){
        // check if the alamSting already present

            if(alarmList.indexOf(timeString)===-1){
                
                alarmList.push(timeString);
            }else{
                alert('Alarm already present')
                
            }
    }else{
        alarmList=[timeString];
    }

    //  adding the new alarm list in the localStorage
    setAlarmList(alarmList);
    renderAlarmList(alarmList);
    document.getElementById('hour').value="";
    document.getElementById('minute').value="";
    document.getElementById('second').value="";




}


function renderAlarmList(alarmList){
    if(alarmList){
        //  first empty the list and the create new so that no duplicates are left back
        document.getElementById('alarm-listing').innerHTML="";

        alarmList.forEach((i)=>{
           


            let li= document.createElement('li');
            li.classList.add('list-group-item');
            li.classList.add('mt-2');
            li.classList.add('d-flex');
            li.classList.add('justify-content-between');
            li.classList.add('align-items-baseline');
            li.classList.add('blur');
            //  now adding there inner HTML structure
            li.innerHTML=`${i} <button class="btn btn-danger" onclick="removeAlarm('${i}')"><i class="fa-solid fa-trash"></i></button>`;
            document.getElementById('alarm-listing').appendChild(li);
        })   
    }
}

function removeAlarm(alarm){

    let alarmList=getAlarmList();

    if(alarmList){
        let a=alarmList.indexOf(alarm);
        if(a!=-1){
            alarmList.splice(a,1);
            setAlarmList(alarmList);
            renderAlarmList(alarmList);
            return;
        }else{
            return;
            
        }
    }
}
// 



(function(){
    let alarmList=getAlarmList();
    renderAlarmList(alarmList);
    intialiseApp();
})();
