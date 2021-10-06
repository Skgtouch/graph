
window.addEventListener("load", function() {
    var clipRows=[];
    function paste() {
        var clipText;
        var clipTable;
        navigator.clipboard.readText()
        .then(text => {
            clipText = text;
            console.log('Pasted content: ', text);
            clipRows = clipText.split("\n");
            for (i=0; i<clipRows.length; i++) {
                // clipTable[];
                clipRows[i] = clipRows[i].split(String.fromCharCode(9));
            }
            // write out in a table
            newTable = document.createElement("table")
            newTable.border = 1;
            for (i=0; i<clipRows.length; i++) {
                newRow = newTable.insertRow();
                for (j=0; j<clipRows[i].length; j++) {
                    newCell = newRow.insertCell();
                    if (clipRows[i][j].length == 0) {
                        newCell.innerText = ' ';
                    }
                    else {
                        if(i === 0 && clipRows[i][j].includes(":0")) {
                            newCell.style.backgroundColor = "white";
                        }
                        newCell.innerText = clipRows[i][j];
                    }
                }
            }
            document.getElementById("content").appendChild(newTable);
            document.getElementById("submit").style.display = "block";
        })
        .catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }
    function copy() {
        var table = document.getElementsByTagName('table');
        navigator.clipboard.writeText(table[0].innerText);
    } 
    async function submit() {
        const result = [];
        console.log(clipRows);
        for(i = 0; i<clipRows.length - 1; i++) {
            var row = {}
            for(j = 0; j < clipRows[i].length; j++) {
                row[clipRows[0][j]] = clipRows[i+1][j] && clipRows[i+1][j].replace(/\r?\n|\r/, "");
            }
            result.push(row);
        }
        postData('https://google.com', {data: result});
    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
      }
    document.getElementById("copy").addEventListener("click", function() {
        copy();
    });
    document.getElementById("paste").addEventListener("click", function() {
        paste();
    });
    document.getElementById("submit").addEventListener("click", function() {
        submit();
    });
});
