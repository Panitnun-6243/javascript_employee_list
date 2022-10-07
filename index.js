//GET request
const loadTable = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://www.melivecode.com/api/users");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var trHTML = "";
      const objects = JSON.parse(this.responseText);
      for (let object of objects) {
        trHTML += "<tr>";
        trHTML += "<td>" + object["id"] + "</td>";
        trHTML +=
          "<td><img width='50px' class='avatar' src='" +
          object["avatar"] +
          "'></td>";
        trHTML += "<td>" + object["fname"] + "</td>";
        trHTML += "<td>" + object["lname"] + "</td>";
        trHTML += "<td>" + object["username"] + "</td>";
        trHTML +=
          "<td><div style='margin-right:5px;display: flex;flex-direction: row;column-gap: 10px;'><button type='button' class='btn btn-outline-info' onclick='showUserUpdateDialog(" + object['id'] + ")'>Edit</button><button type='button' class='btn btn-outline-warning'>Delete</button></div></td>";
        trHTML += "</tr>";
      }
      document.getElementById("tableData").innerHTML = trHTML;
    }
  };
};
loadTable();
//Add new member modal dialog
const showUserCreateDialog = () => {
  Swal.fire({
    title: "Add new employee",
    html:
      '<input id="fname" class="swal2-input" placeholder="First name">' +
      '<input id="lname" class="swal2-input" placeholder="Last name">' +
      '<input id="username" class="swal2-input" placeholder="Username">' +
      '<input id="email" class="swal2-input" placeholder="Email">' +
      '<input id="avatar" class="swal2-input" placeholder="Avatar link">',
    focusConfirm: false,
    preConfirm: () => {
      userCreate()
    },
  });
};
//POST request
const userCreate = () => {
  const fname = document.getElementById("fname").value
  const lname = document.getElementById("lname").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const avatar = document.getElementById("avatar").value
  const xhttp =  new XMLHttpRequest()
  xhttp.open("POST", "https://www.melivecode.com/api/users/create")
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhttp.send(JSON.stringify({
    "fname": fname,
    "lname": lname,
    "username": username,
    "email": email,
    "avatar": avatar
  }))
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      const object = JSON.parse(this.responseText);
      Swal.fire(object['message'])
      loadTable()
    }
  }
}
//Update new member modal dialog
const showUserUpdateDialog = (id) => {
  const xhttp = new XMLHttpRequest()
  xhttp.open("GET", "https://www.melivecode.com/api/users/" + id);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const object = JSON.parse(this.responseText);
      const user = object['user']
      Swal.fire({
        title: `Edit employee info id: ${id}`,
        html:
          '<input id="id" type="hidden" class="swal2-input" placeholder="First name" value="'+ user['id'] +'">' +
          '<input id="fname" class="swal2-input" placeholder="First name" value="'+ user['fname'] +'">' +
          '<input id="lname" class="swal2-input" placeholder="Last name" value="'+ user['lname'] +'">' +
          '<input id="username" class="swal2-input" placeholder="Username" value="'+ user['username'] +'">' +
          '<input id="email" class="swal2-input" placeholder="Email" value="'+ user['email'] +'">' +
          '<input id="avatar" class="swal2-input" placeholder="Avatar link" value="'+ user['avatar'] +'">',
        focusConfirm: false,
        preConfirm: () => {
          userUpdate()
        },
      });
    }}
}
//PUT request
const userUpdate = () => {
  const id = document.getElementById("id").value
  const fname = document.getElementById("fname").value
  const lname = document.getElementById("lname").value
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const avatar = document.getElementById("avatar").value
  const xhttp = new XMLHttpRequest()
  xhttp.open("PUT", "https://www.melivecode.com/api/users/update")
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xhttp.send(JSON.stringify({
    "id": id,
    "fname": fname,
    "lname": lname,
    "username": username,
    "email": email,
    "avatar": avatar
  }))
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      const object = JSON.parse(this.responseText);
      Swal.fire(object['message'])
      loadTable()
    }
  }
} 