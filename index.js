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
        trHTML += "<td><img width='50px' class='avatar' src='" + object["avatar"] + "'></td>";
        trHTML += "<td>" + object["fname"] + "</td>";
        trHTML += "<td>" + object["lname"] + "</td>";
        trHTML += "<td>" + object["username"] + "</td>";
        trHTML += "<td><div style='margin-right:5px;display: flex;flex-direction: row;column-gap: 10px;'><button type='button' class='btn btn-outline-info'><i class='bi bi-trash text-light'></i> Edit</button><button type='button' class='btn btn-outline-warning'><i class='bi bi-trash text-light'></i> Delete</button></div></td>"
        trHTML += "</tr>";
      }
      document.getElementById("tableData").innerHTML = trHTML
    }
  };
};
loadTable();
