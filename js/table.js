params = {}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}

if (!params['sid']) {
    window.alert('Error : url must have a parametor : sid={int} ')
}

function randint(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function Get(dic) {
    dic['method'] = 'pick'
    $(function () {
        $.ajax({
            url: 'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api' + Dic2ParamString(dic),
            type: 'GET',
            //data:JSON.stringify(dic),
            contentType: 'application/json',
        })
            .done((data) => {
                loader.style.display = 'none'
                data = eval(data)
                MakeTable(data)
            })
            .fail((data) => {
                loader.style.display = 'none'
                window.alert('通信に失敗しました')
                console.log(data);
            })
    });
}

function MakeTable(data) {
    tmp = []
    for (d of data) {
        for (key of Object.keys(d)) {
            if (key != 'primary_key' && key != 'sid') {
                tmp.push(key)
            }
        }
    }
    st = new Set(tmp)
    keys_lst = [...st.values()]
    for (key of keys_lst) {
        th = document.createElement('th')
        th.innerText = key
        th.classList.add('uk-text-left')
        table_keys.appendChild(th)
    }
    for (d of data) {
        tr = document.createElement('tr')
        for (key of keys_lst) {
            td = document.createElement('td')
            td.innerText = d[key] || ''
            tr.appendChild(td)
        }
        main_body.appendChild(tr)
    }
}
function Dic2ParamString(obj) {
    let str = "?";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str
}

Get(params)