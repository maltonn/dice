loader.style.display = 'none'
function Send(dic, sid) {
  loader.style.display = 'block'
  dic['method'] = 'add'
  $(function () {
    $.ajax({
      url: 'https://sdyzrnc9i1.execute-api.us-east-2.amazonaws.com/default/light-api' + Dic2ParamString(dic),
      type: 'GET',
      //data:JSON.stringify(dic),
      contentType: 'application/json',
    })
      .done((data) => {
        console.log(data);
        loader.style.display = 'none'
        UIkit.notification({
          message: 'Success',
          status: 'success',
          pos: 'bottom-center',
          timeout: 1000,
        });

      })
      .fail((data) => {
        loader.style.display = 'none'
        window.alert('通信に失敗しました')
        console.log(data);
      })
  });
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

params = {}
try {
  (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
  console.log(e)
}

if (!params['sid']) {
  window.alert('Error : url must have a parametor : sid={int} ')
}

keys = Object.keys(params)
num = 1
q_input_ids = []

main_title.innerText = params['t'] || 'Form'
main_title_h1.innerText = params['t'] || ''

while (true) {
  qn = 'q' + num
  if (!keys.includes(qn)) {
    btn = document.createElement('button')
    btn.id = 'send_btn'
    btn.classList.add('uk-button', 'uk-button-primary')
    btn.innerText = '登録！'
    main.appendChild(btn)

    break
  }
  q_input_ids.push(params[qn])

  div = document.createElement('div')
  div.classList.add('uk-margin')

  legend = document.createElement('legend')
  legend.classList.add('uk-legend')
  legend.innerText = params[qn + 'lg'] || ''

  inner_div = document.createElement('div')
  inner_div.classList.add('uk-margin')

  input_tag = document.createElement('input')
  input_tag.id = params[qn]
  input_tag.classList.add('uk-input')
  input_tag.type = params[qn + 'tp'] || 'text'
  input_tag.placeholder = params[qn + 'ph'] || ''
  input_tag.required = params[qn + 'r'] ? true : false

  inner_div.appendChild(input_tag)

  div.appendChild(legend)
  div.appendChild(inner_div)

  main.appendChild(div)

  num += 1
}

num = 1
dic = {}
while (true) {
  hn = 'h' + num
  if (!keys.includes(hn)) {
    break
  }
  dic[params[hn]] = params[hn + 'v']
  num += 1
}
document.getElementById('send_btn').addEventListener('click', () => {
  dic['sid'] = params['sid']
  for (id of q_input_ids) {
    tmp = document.getElementById(id)
    dic[id] = tmp.value
    tmp.value = ''
  }
  console.log(dic)
  Send(dic, Number(params['sid']))
})
