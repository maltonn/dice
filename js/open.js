cookie = {}
/*
document.cookie.split(';').forEach(e => cookie[decodeURIComponent(e.split('=')[0])] = Number(e.split('=')[1]))
*/
data = [{ 'elm': 'オフラインです','user':'0','degre':'0'}]

Userid2Name={
    '0':'anymous ',
    '1':'みなりん ',
    '2':'Ruinvil ',
    '3':'Moscwa  ',
    '4':'酔月　 　'
}

function randint(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function Dic2ParamString(obj) {
    let str = "?";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    }
    return str
}
//はじめに要素をすべて取得
function GetAll(dic) {
    dic['method'] = 'pick'
    dic['user']='Moscwa'
    $(function () {
        $.ajax({
            url: 'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api' + Dic2ParamString(dic),
            type: 'GET',
            //data:JSON.stringify(dic),
            contentType: 'application/json',
        })
            .done((res) => {
                loader.style.display = 'none'
                data = eval(res)
                now_number.innerText = '現在登録されている属性は' + data.length + '個です！'
            })
            .fail((res) => {
                //window.alert('通信に失敗しました')
                loader.style.display = 'none'
                console.log(res);
            })
    });
}

//アニメーション起動＆要素の追加
function Lounch(data) {
    animation.style.display = 'block'
    setTimeout(() => {
        animation.style.opacity = '0'
        setTimeout(() => {
            animation.style.display = 'none'
            animation.style.opacity = '1'
        }, 1000)
    }, 4300)
    tr = document.createElement('tr')
    while (true) {
        chosen = data[randint(data.length)]
        element=chosen['elm']
        degree=chosen['degree']
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
        if (!cookie[element]) {
            cookie[element] = 1
            break
        } else {
            cookie[element] += 1
            if (cookie[element] % 5 == 0) {
                break
            }
        }
    }
    element_h1.innerText = element

    td = document.createElement('td')
    td.innerText = element

    td2 = document.createElement('td')
    td2.innerText = ('★'.repeat(degree)+'　'.repeat(5)).slice(0,5)

    td3 = document.createElement('td')
    td3.innerText = user=='anymous'?user:'(hidden)'
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
}
params = {'sid':7}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}
GetAll(params)

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

//リフレッシュ
NowNo = 1
function Refresh() {
    li = document.createElement('li')
    li.innerHTML = '<table  class="uk-table uk-table-striped"><tbody></tbody></table>'
    li.children[0].children[0].innerHTML = main_body.innerHTML
    icons = li.getElementsByTagName('span')//close iconを消す
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
