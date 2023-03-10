var form=document.getElementById('my-form');

form.addEventListener('submit',SaveToLocalStorage);

function SaveToLocalStorage(event){
    event.preventDefault();

    const name=event.target.username.value;
    const email=event.target.useremail.value;
    const mobno=event.target.userphonno.value;

    const obj= { 
        name,
        email,
        mobno
    }

    axios.post("https://crudcrud.com/api/4ea9c83eed0b4d1e983595cc7d7606cc/appointmentData",obj)
    .then((response)=>{
        showUserOnScreen(response.data)

    })
    .catch((err)=>{
        document.body.innerHTML+="<h2>Something went Wrong</h2>";
        console.log(err);
    })

    // localStorage.setItem(obj.email,JSON.stringify(obj));
    // showUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/4ea9c83eed0b4d1e983595cc7d7606cc/appointmentData")
    .then((response)=>{
        for (var i=0;i<response.data.length;i++){
            showUserOnScreen(response.data[i])
        }
    })
    .catch((err)=>{
        console.log(err);
    })
})

function showUserOnScreen(obj){
    const parentElem=document.getElementById('userlist');
    const childElem=document.createElement('li');

    childElem.textContent=obj.name +" - "+ obj.email+" - "+obj.mobno;

    const deleteButton=document.createElement('input');
    deleteButton.type='button';
    deleteButton.value='DELETE';
    deleteButton.onclick=()=>{
        axios.delete(`https://crudcrud.com/api/4ea9c83eed0b4d1e983595cc7d7606cc/appointmentData/${obj._id}`)
    .then((response)=>{
        parentElem.removeChild(childElem);
        // console.log(response);


    })
    .catch((err)=>{
        document.body.innerHTML+="<h2>Something went Wrong</h2>";
        console.log(err);
    })

    }
    // const editButton=document.createElement('input');
    // editButton.type='button';
    // editButton.value='EDIT';
    // editButton.onclick=()=>{
    //     localStorage.removeItem(obj.email);
    //     parentElem.removeChild(childElem);
    //     document.getElementById('username').value=obj.name
    //     document.getElementById('useremail').value=obj.email
    //     document.getElementById('userphonno').value=obj.mobno

    // }

    childElem.appendChild(deleteButton);
    // childElem.appendChild(editButton);

    parentElem.appendChild(childElem);

}