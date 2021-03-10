cookie = {}
/*
document.cookie.split(';').forEach(e => cookie[decodeURIComponent(e.split('=')[0])] = Number(e.split('=')[1]))
*/
data = [{ 'elm': 'オフラインです','user':'0','degre':'0'}]

/*
data = [
    { 'elm': '要素1','user':'0','degree':'1'},
    { 'elm': '要素2','user':'1','degree':'2'},
    { 'elm': '要素3','user':'Moscwa','degree':'3'},
    { 'elm': '要素4','user':'example','degree':'4'},
]
*/

ng_warning=[]

Userid2Name={
    '0':'anymous ',
    '1':'みなりん ',
    '2':'Ruinvil ',
    '3':'Moscwa  ',
    '4':'酔月　 　'
}

//アニメーション起動＆要素の追加
black_triangles_flag=false
function Lounch(data) {
    counter=0
    while (true) {
        counter+=1
        if(counter>1000){
            window.alert('条件に合う要素が存在しません')
            return
        }
        chosen = data[randint(data.length)]
        element=chosen['elm']
        degree=Number(chosen['degree'])

        flag=false
        for(i=0;i<ng_warning.length;i++){
            if (chosen['warning'] && chosen['warning'].includes(ng_warning[i])){
                flag=true
                break
            }
        }
        if(flag){
            continue
        }

        if(chosen['user']){
            user=Userid2Name[chosen['user']]//user_idの場合
            if(!user){
                user=chosen['user']//usernameを直入力の場合
            }
        }else{
            user='anymous'
        }
        if(! degree==undefined || !((max_deg==-1 || degree<=max_deg) && (min_deg==-1 || min_deg<=degree))){
            continue
        }
        if (cookie[element]==undefined) {
            if(degree<=3){
                cookie[element] = 0
                break
            }else{
                cookie[element] = -1
            }
        } else {
            cookie[element] += 1
            if (cookie[element] % (degree<=3?5:7) == 0) {
                break
            }
        }
    }
    
    stars=document.getElementsByClassName('star')
    for(i=0;i<stars.length;i++){
        if(i<degree){
            stars[i].style.display='block'
        }else{
            stars[i].style.display='none'
        }
    }

    box_col='#00FFDD'//水色 
    timeout=7700

    if(degree==3){
        box_col='#ff9900'//金
        timeout=8300
    }
    if(degree>=4){
        timeout=8900
        box_col='#884499'//紫
        SetTriangles(['BB6588','CCAA87','8889CC','DDAACB'])
        circle1.style.backgroundColor='#BB6588'
        circle3.style.backgroundColor='#CCAA87'
        circle5.style.backgroundColor='#8889CC'
        black_triangles_flag=true
    }else{
        if(black_triangles_flag){
            SetTriangles(['33AAEE','EE6666','BBDE22','FFDB42'])
            circle1.style.backgroundColor='#33AAEE'
            circle3.style.backgroundColor='#EE6666'
            circle5.style.backgroundColor='#BBDE22'
            black_triangles_flag=false
        }
    }
    
    box_main.style.backgroundColor=box_col
    box_border.style.border='3px solid '+box_col

    animation.style.display = 'block'
    setTimeout(() => {
        animation.style.opacity = '0'
        setTimeout(() => {
            animation.style.display = 'none'
            animation.style.opacity = '1'
        }, 1000)
    }, timeout)

    tr = document.createElement('tr')
    element_h1.innerText = element

    td = document.createElement('td')
    td.innerText = element

    td2 = document.createElement('td')
    td2.innerText = ('★'.repeat(degree)+'　'.repeat(5)).slice(0,5)

    td3 = document.createElement('td')
    td3.innerText = user=='anymous '?user:'(hidden)'
    td3.setAttribute('data-user',user)
    td3.classList.add('data-user')
    td3.addEventListener('click',function(){
        this.innerText=this.getAttribute('data-user')
    })

    td_close = document.createElement('td')
    td_close.classList.add('uk-text-right')
    span = document.createElement('span')
    span.setAttribute('uk-icon', 'icon:close')
    span.classList.add('pointer')
    span.addEventListener('click', function () {
        this.parentNode.parentNode.outerHTML = ''
    })
    td_close.appendChild(span)
    
    tr.appendChild(td)
    tr.appendChild(td3)
    tr.appendChild(td2)
    tr.appendChild(td_close)
    

    main_body.appendChild(tr)
    /*
    for (key of Object.keys(cookie)) {
        document.cookie = encodeURIComponent(key.trim()) + '=' + cookie[key]
    }
    */
   now_covered_number.innerText='（うち未開封'+(data.length-Object.keys(cookie).length)+'個）'
}
params = {'sid':7}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}

params['method']='pick'
Send(params,CallBack)
function CallBack(res){
    data = eval(res)
    now_number.innerText = '現在登録されている属性は' + data.length + '個です！'
    now_covered_number.innerText='（うち未開封'+(data.length-Object.keys(cookie).length)+'個）'
}

//キーボードショートカット
document.addEventListener('keydown', (e) => {
    console.log(e.code)
    if (e.code == 'Space' || e.code == 'Enter') {
        Lounch(data)
    }else if (e.code == 'Backspace') {
        main_body.children[main_body.children.length - 1].outerHTML = ''
    }else if (e.code == 'KeyR') {
        Refresh()
    }else if(e.code=='KeyS'){
        tmp=document.getElementById('settings')
        tmp.style.display=tmp.style.display=='block'?'none':'block'
    }else if(e.code=='KeyO'){
        usernames=document.getElementsByClassName('data-user')
        for(i=0;i<usernames.length;i++){
            usernames[i].innerText=usernames[i].getAttribute('data-user')
        } 
    }
})

//ダイスを振る
document.getElementById('get_btn').addEventListener('click', () => {
    Lounch(data)
})
document.getElementById('reload_btn').addEventListener('click', () => {
    Send(params,CallBack)
})

//リフレッシュ
NowNo = 1
function Refresh() {
    li = document.createElement('li')
    li.innerHTML = '<table  class="uk-table uk-table-striped"><tbody></tbody></table>'
    li.children[0].children[0].innerHTML = main_body.innerHTML
    icons = [...li.getElementsByTagName('span')]//close iconを消す
    for (icon of icons) {
        icon.outerHTML = ''
    }
    switcher_contents.appendChild(li)

    li2 = document.createElement('li')
    li2.innerHTML = '<a>No.' + NowNo + '</a>'
    NowNo++
    switcher.appendChild(li2)
    main_body.innerHTML = ''
}

document.getElementById('settings_btn').addEventListener('click', () => {
    document.getElementById('settings').style.display = 'block'
})

max_deg=-1
min_deg=-1
document.getElementById('close_settings').addEventListener('click', () => {
    document.getElementById('settings').style.display = 'none'
})
document.getElementById('max_degree_input').addEventListener('change',function(){
    max_deg=this.value
})
document.getElementById('max_degree_input').addEventListener('change',function(){
    max_deg=this.value
})
document.getElementById('min_degree_input').addEventListener('change',function(){
    min_deg=this.value
})
