var table=document.getElementById('ScenarioTable');
    
             /*DELETES ROW*/

            function deleteRow(row){
                var i=row.parentNode.parentNode.rowIndex;
                var len = table.rows.length;
                if(len == 3){
                    alert('Cannot Delete');
                    return;
                }
                table.deleteRow(i);
                for(a=i;a<table.rows.length;a++){
                    table.rows[a].cells[1].innerHTML = a-1;
                }
            }

            /*DELETES COLUMN*/

            function deleteCol(col){
                var i = col.cellIndex;
                var len = table.rows.length;
                var length = table.rows[0].cells.length;
                if(length == 3){
                    alert('Cannot Delete');
                    return;
                }
                for(var a=0; a< len; a++) {
                    table.rows[a].deleteCell(i);    
                }
            }
            
            /*INSERTS ROWS*/

            function insRow(){
                
                var new_row = table.rows[2].cloneNode(true);
                var len = table.rows.length;
                new_row.cells[1].innerHTML = len-1;
                
                var inp1 = new_row.cells[2].getElementsByTagName('input')[0];
                inp1.id += len;                                                                //Id gets incremented by len 
                inp1.value = '';
                table.appendChild( new_row );
            }
            
            /*INSERTS COLUMNS*/

            function insCol(){
                var table=document.getElementById('ScenarioTable');
                var rows = document.getElementsByTagName('tr');
                i=0;
                while(r=rows[i++]){
                    var c = r.getElementsByTagName('td');
                    var clone = c[2].cloneNode(true);
                    c[0].parentNode.appendChild(clone);
                }
            }