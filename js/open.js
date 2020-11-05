cookie = {}
/*
document.cookie.split(';').forEach(e => cookie[decodeURIComponent(e.split('=')[0])] = Number(e.split('=')[1]))
*/
data = [{ 'elm': 'オフラインです' }]
function randint(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
params = {}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}
function GetAll(dic) {
    dic['method'] = 'pick'
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
GetAll(params)

get_btn.addEventListener('click', () => {
    Lounch(data)
})

document.addEventListener('keydown', (e) => {
    console.log(e.code)
    if (e.code == 'Space' || e.code == 'Enter') {
        Lounch(data)
    }
    else if (e.code == 'Backspace') {
        main_body.children[main_body.children.length - 1].outerHTML = ''
    }
    else if (e.code == 'KeyR') {
        Refresh()
    }
})

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
        element = data[randint(data.length)]['elm']
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
    td2.classList.add('uk-text-right')
    span = document.createElement('span')
    span.setAttribute('uk-icon', 'icon:close')
    span.classList.add('pointer')
    span.addEventListener('click', function () {
        this.parentNode.parentNode.outerHTML = ''
    })

    td2.appendChild(span)
    tr.appendChild(td)
    tr.appendChild(td2)

    main_body.appendChild(tr)
    /*
    for (key of Object.keys(cookie)) {
        document.cookie = encodeURIComponent(key.trim()) + '=' + cookie[key]
    }
    */
}

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

//設定画面
/*
UIkit.offcanvas(document.getElementById('offcanvas-usage'))
UIkit.offcanvas(document.getElementById('offcanvas-usage')).show();;
*/