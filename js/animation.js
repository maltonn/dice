//first_screenないの三角形をランダム配置
//初回のみ


function SetTriangles(cols){
    first_screen.innerHTML=''
    for(i=0;i<30;i++){
        tr=document.createElement('div')
        tr.classList.add('triangle')
        tr.style.borderColor='transparent transparent #'+cols[randint(cols.length)]+' transparent'
        tr.style.left=randint(100)+'%'
        tr.style.top=randint(300)+'%'
        tr.style.transform='rotate('+randint(180)+'deg)'
        first_screen.appendChild(tr)
    }
}

cols=['33AAEE','EE6666','BBDE22','FFDB42']
SetTriangles(cols)