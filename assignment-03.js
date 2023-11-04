var tablesave = [];         //used to store a copy of the table so that it can be restored
var rowsave = [];           //used to stoer a copy of a row so that it can be inserted into tablesave
var rsave=1;                //used to store the number of rows during a save
var assignmentNumsave=5;    //used to store the number of assignments during a save
var container="";           //used to store temparary data. like var names 
var r=1;                    //How many rows there are currently
var av=0;                   //the average for a row
var unsub=0;                //How many assignments that are unsubmitted
var gradeNum=0;             //Used to tell what type of grading to display results in
var assignmentNum=5;        //How many assignments there are
var container2="row1";      //second var container


//Naming for cells:
// r0cellN r0cellI r0cell1 ... r0cell7 r0cellA <-this top row is the Heading row
// r1cellN r1cellI r1cell1 ... r1cell7 r1cellA
// r2cellN r2cellI r2cell1 ... r2cell7 r2cellA

//Below function calls for 9 rows to be generated to meet the default of 10 rows
function start(){
    for(q=0;q<9;q++){
        addR();
    }
    avg()
    save();
}

//Below function gens new rows with cells
function addR(){
    r++;
    var container = document.getElementById("myTable");
    var x=0;
    var rowContainer = container.insertRow(r);
    rowContainer.id = "row"+r;

    var container = rowContainer.insertCell(0);//insert name cell
    container.id = "r" + r + "cellN";
    container.setAttribute('contentEditable', 'true');
    document.getElementById("r" + r + "cellN").style.textAlign = "left";
    if(r%2==0){
        document.getElementById("r" + r + "cellN").style.backgroundColor="#e0e0e0";
    }

    var container = rowContainer.insertCell(1);//insert ID cell
    container.id = "r" + r + "cellI";
    container.setAttribute('contentEditable', 'true');
    document.getElementById("r" + r + "cellI").style.textAlign = "left";
    if(r%2==0){
        document.getElementById("r" + r + "cellI").style.backgroundColor="#e0e0e0";
    }

    for(i=assignmentNum;i>0;i--){//inserts assigment cells
        var container = rowContainer.insertCell(2);
        container.id = "r" + r + "cell" + i;
        container.setAttribute('contentEditable', 'true');
        document.getElementById("r"+ r + "cell"+i).style.background = "yellow";
        document.getElementById("r"+ r + "cell"+i).style.textAlign = "right";
        
        container2="inputSelect("+r+","+i+")"
        container.setAttribute("onclick", container2);
    }
    var container = rowContainer.insertCell(assignmentNum+2);
    container.id = "r" + r + "cellA";

    //Gives the name to the student
    document.getElementById("r"+ r + "cellN").innerHTML = "Student "+r;
    //Gives random student number
    document.getElementById("r"+ r + "cellI").innerHTML = Math.floor(Math.random()*899999999)+100000000;
    for(i=1;i<=assignmentNum;i++){
        document.getElementById("r"+r+"cell"+i).innerHTML = "-";
    }
    document.getElementById("r"+r+"cellA").innerHTML = "0%";
}

function addC(){
    for(i=1;i<=r;i++){//goes through rows inserting rows
        var container = (document.getElementById("row"+i)).insertCell(assignmentNum+2);
        container.id = "r" + i + "cell"+(assignmentNum+1);
        container.setAttribute('contentEditable', 'true');

        container2="inputSelect("+i+","+(assignmentNum+1)+")"
        container.setAttribute("onclick", container2);

        document.getElementById("r"+ i + "cell"+(assignmentNum+1)).style.background = "yellow";
        document.getElementById("r"+i+"cell"+(assignmentNum+1)).innerHTML = "-";
    }
    var container = rowH.insertCell(assignmentNum+2);//adds new head for the new assignment
    container.id = "r0cell"+(assignmentNum+1);
    document.getElementById("r0cell"+(assignmentNum+1)).innerHTML="<b>"+"Assignment "+(assignmentNum+1)+"</b>";
    document.getElementById("r0cell"+(assignmentNum+1)).style.textAlign = "center";
    //var newH = document.createElement("TH");
    //newH.innerHTML="Assignment "+(assignmentNum+1);
    //rowH.appendChild(newH);
    assignmentNum++;
}


function avg(){
    av=0;
    unsub=0;
    for(n=1;n<=r;n++){ //looping rows
        for(m=1;m<=assignmentNum;m++){ //looping cells in "r" row
            container=("r"+ n + "cell"+m); //stores var name
            if(document.getElementById(container).innerHTML>=0 && document.getElementById(container).innerHTML<=100 && document.getElementById(container).innerHTML!=""){//parse int can make this work with letter and -!!!!!!
                av=av+parseInt(document.getElementById(container).innerHTML)
                document.getElementById(container).style.background="white";
                //document.getElementById(container).innerHTML=(document.getElementById(container).innerHTML).replace('-', '');
                if(n%2==0){
                    document.getElementById("r" + n + "cell"+m).style.backgroundColor="#e0e0e0";
                }
            }
            else{
                document.getElementById(container).style.background="yellow";
                document.getElementById(container).innerHTML="-";
                unsub++;
            }
            if(document.getElementById(container).innerHTML=="-"){
                document.getElementById(container).style.textAlign = "center";
            }
            else{
                document.getElementById(container).style.textAlign = "right";
            }
            
        }
        container=("r"+ n + "cellA");
        if(gradeNum==0){
            document.getElementById("r0cellA").innerHTML="Average [%]";
            document.getElementById(container).innerHTML=Math.round((av/assignmentNum))+"%";
        }  
        else if(gradeNum==1){//Letter Grade
            document.getElementById("r0cellA").innerHTML="Average [Letter]";
            letterGrade(Math.round((av/5)));
        }
        else if(gradeNum==2){  //Scale Grade
            document.getElementById("r0cellA").innerHTML="Average [4.0]";
            scaleGrade(Math.round((av/5)));
        }
        
        if(Math.round((av/assignmentNum))<60){
            document.getElementById(container).style.background="red";
            document.getElementById(container).style.color="white";
        }
        else if(Math.round((av/assignmentNum))>=60 && Math.round((av/assignmentNum))<=100){
            if(n%2==0){
                document.getElementById(container).style.backgroundColor="#e0e0e0";
            }
            else{
                document.getElementById(container).style.background="white";
            }
            
            document.getElementById(container).style.color="black";
        }
        av=0;
        document.getElementById("sub").innerHTML="Unsubmitted = "+unsub;
    }
}

function gradeChange(){//cycles through grade types
    if(gradeNum==2){
        gradeNum=0;
    }
    else{
        gradeNum++;
    }
}
var grade=0;
function letterGrade(grade){
    if(grade>=93 && grade<=100){
        document.getElementById(container).innerHTML="A";
    }
    else if(grade>=90 && grade<=92){
        document.getElementById(container).innerHTML="A-";
    }
    else if(grade>=87 && grade<=89){
        document.getElementById(container).innerHTML="B+";
    }
    else if(grade>=83 && grade<=86){
        document.getElementById(container).innerHTML="B";
    }
    else if(grade>=80 && grade<=82){
        document.getElementById(container).innerHTML="B-";
    }
    else if(grade>=77 && grade<=79){
        document.getElementById(container).innerHTML="C+";
    }
    else if(grade>=73 && grade<=76){
        document.getElementById(container).innerHTML="C";
    }
    else if(grade>=70 && grade<=72){
        document.getElementById(container).innerHTML="C-";
    }
    else if(grade>=67 && grade<=69){
        document.getElementById(container).innerHTML="D+";
    }
    else if(grade>=63 && grade<=66){
        document.getElementById(container).innerHTML="D";
    }
    else if(grade>=60 && grade<=62){
        document.getElementById(container).innerHTML="D-";
    }
    else{
        document.getElementById(container).innerHTML="F";
    }
}
function scaleGrade(grade){
    if(grade>=93 && grade<=100){
        document.getElementById(container).innerHTML="4.0";
    }
    else if(grade>=90 && grade<=92){
        document.getElementById(container).innerHTML="3.7";
    }
    else if(grade>=87 && grade<=89){
        document.getElementById(container).innerHTML="3.3";
    }
    else if(grade>=83 && grade<=86){
        document.getElementById(container).innerHTML="3.0";
    }
    else if(grade>=80 && grade<=82){
        document.getElementById(container).innerHTML="2.7";
    }
    else if(grade>=77 && grade<=79){
        document.getElementById(container).innerHTML="2.3";
    }
    else if(grade>=73 && grade<=76){
        document.getElementById(container).innerHTML="2.0";
    }
    else if(grade>=70 && grade<=72){
        document.getElementById(container).innerHTML="1.7";
    }
    else if(grade>=67 && grade<=69){
        document.getElementById(container).innerHTML="1.3";
    }
    else if(grade>=63 && grade<=66){
        document.getElementById(container).innerHTML="1.0";
    }
    else if(grade>=60 && grade<=62){
        document.getElementById(container).innerHTML="0.7";
    }
    else{
        document.getElementById(container).innerHTML="0.0";
    }
}

function save(){ //saves layout to array
    tablesave = [];
    rsave=r;
    assignmentNumsave=assignmentNum;
    for(n=1;n<=rsave;n++){
        container="r"+n+"cellN"; //save name
        rowsave.push(document.getElementById(container).innerHTML)

        container="r"+n+"cellI"; //save ID
        rowsave.push(document.getElementById(container).innerHTML)
        for(m=1;m<=assignmentNum;m++){
            container="r"+n+"cell"+m;
            rowsave.push(document.getElementById(container).innerHTML)
        }
        tablesave.push(rowsave);
        rowsave=[];
    }
}

function restore(){    
    if(rsave>r){    //adding rows back
        for(n=r;r<=rsave;n++){
            addR();
        }
    }
    if(assignmentNumsave>assignmentNum){    //adding cells back
        for(n=assignmentNum;assignmentNum<=assignmentNumsave;n++){
            addC();
        }
    }
    for(n=1;n<=rsave;n++){
        container="r"+n+"cellN"; //restore name
        document.getElementById(container).innerHTML=tablesave[n-1][0];

        container="r"+n+"cellI"; //restore ID
        document.getElementById(container).innerHTML=tablesave[n-1][1];
        for(m=1;m<=assignmentNum;m++){
            container="r"+n+"cell"+m;
            document.getElementById(container).innerHTML=tablesave[n-1][m+1];
        }
        
    }
    if(r>rsave){
        for(n=1;n<=(r-rsave);n++){//deleting rows
            document.getElementById("myTable").deleteRow(rsave+1);
        }
        r=rsave;
    }
        for(n=0;n<=r;n++){//deleting cells
            for(m=1;m<=(assignmentNum-assignmentNumsave);m++){
                if(n>0){
                    container=document.getElementById("row"+n);
                    container.deleteCell(assignmentNumsave+2);
                }
                else{
                    container=document.getElementById("rowH");
                    container.deleteCell(assignmentNumsave+2);
                }
                
            }
                
        }
    
    
    assignmentNum=assignmentNumsave;
    avg();
}


function inputSelect(x,y){
    avg();
    container="r"+x+"cell"+y;
    document.getElementById(container).innerHTML="";
}




function delR(){
    if(document.getElementById("rowDel").value<=r && document.getElementById("rowDel").value>=1){
        
        var target=parseInt(document.getElementById("rowDel").value);
        document.getElementById("myTable").deleteRow(target);
        for(n=target+1;n<=r;n++){
        document.getElementById("row"+(n)).id=("row"+(n-1));
        
        document.getElementById("r"+(n)+"cellN").id=("r"+(n-1)+"cellN");//change N cell id for row
        document.getElementById("r"+(n)+"cellI").id=("r"+(n-1)+"cellI");//change I cell id for row
        document.getElementById("r"+(n)+"cellA").id=("r"+(n-1)+"cellA");//change A cell id for row
        for(m=1;m<=assignmentNum;m++){
            document.getElementById("r"+(n)+"cell"+m).id=("r"+(n-1)+"cell"+m);//change cell id for row
            container=("r"+(n-1)+"cell"+m);
            container2="inputSelect("+(n)+","+m+")";
            document.getElementById(container).removeAttribute("onclick", container2);

            container2="inputSelect("+(n-1)+","+m+")";
            document.getElementById(container).setAttribute("onclick", container2);
        }
    }
    r--;
    }
    avg();
}

function delC(){//deletes cells
    if(assignmentNum>0){
        container=document.getElementById("rowH");
        container.deleteCell(assignmentNum+1);
        for(n=1;n<=r;n++){
            container=document.getElementById("row"+n);
            container.deleteCell(assignmentNum+1);

        }
        assignmentNum--;
    }
    avg();
}

