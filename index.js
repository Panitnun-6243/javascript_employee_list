//GET request
const loadTable = () => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://www.melivecode.com/api/users");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
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
          "<td><div style='margin-right:5px;display: flex;flex-direction: row;column-gap: 10px;'><button type='button' class='btn btn-outline-info'><i class='bi bi-trash text-light'></i> Edit</button><button type='button' class='btn btn-outline-warning'><i class='bi bi-trash text-light'></i> Delete</button></div></td>";
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
    title: "Multiple inputs",
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
      console.log(this.responseText)
      const object = JSON.parse(this.responseText);
      Swal.fire(object['message'])
      loadTable()
    }
  }
}