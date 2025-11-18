function loadPageAsyncPOST() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "loadpage.php", true); 
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        document.getElementById("content").innerHTML = this.responseText;
    };

    xhr.send("fname=Henry&lname=Ford");
}

function loadPageSyncGET() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "pages/page2.html", false); 

    xhr.send();

    document.getElementById("content").innerHTML = xhr.responseText;
}

function loadStudents() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "student.json", true); 

    xhr.onload = function() {
        let data = JSON.parse(this.responseText);

        let html = `
            <h2>Оюутны мэдээлэл</h2>
            <table border="1" cellpadding="8">
                <tr>
                    <th>Овог</th>
                    <th>Нэр</th>
                    <th>Код</th>
                    <th>Нас</th>
                    <th>Төрсөн огноо</th>
                    <th>Голч дүн</th>
                    <th>Чөлөө авсан эсэх</th>
                </tr>
        `;

        data.forEach(st => {
            html += `
                <tr>
                    <td>${st.ovog}</td>
                    <td>${st.ner}</td>
                    <td>${st.code}</td>
                    <td>${st.nas}</td>
                    <td>${st.tursun}</td>
                    <td>${st.golch}</td>
                    <td>${st.chuluu ? "Тийм" : "Үгүй"}</td>
                </tr>
            `;
        });

        html += "</table>";

        document.getElementById("content").innerHTML = html;
    };

    xhr.send();
}
