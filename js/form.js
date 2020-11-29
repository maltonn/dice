loader.style.display = 'none'



params = {'sid':7}
try {
  (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
  console.log(e)
}


keys = Object.keys(params)
num = 1
dic = {'sid':7}
while (true) {
  hn = 'h' + num
  if (!keys.includes(hn)) {
    break
  }
  dic[params[hn]] = params[hn + 'v']
  num += 1
}


q_input_ids=['elm','degree','user']
document.getElementById('send_btn').addEventListener('click', () => {
  
  check_boxes=document.querySelectorAll('input[type=checkbox]')
  tmp_dic={}
  for(i=0;i<check_boxes.length;i++){
    box=check_boxes[i]
    if(box.checked){
      tmp_lst=box.id.split('-')
      if(tmp_dic[tmp_lst[1]]){
        tmp_dic[tmp_lst[1]]+=','+tmp_lst[2]
      }else{
        tmp_dic[tmp_lst[1]]=tmp_lst[2]  
      }
    }
  }
  checking_keys=Object.keys(tmp_dic)
  for(i=0;i<checking_keys.length;i++){
    key=checking_keys[i]
    dic[key]=tmp_dic[key]
  }

  for (id of q_input_ids) {
    tmp = document.getElementById(id)
    dic[id] = tmp.value
    if(id!='user'){
      tmp.value = ''
    }
  }
  console.log(dic)
  dic['method']='add'
  Send(dic,CallBack)
})

function CallBack(data){
  UIkit.notification({
    message: 'Success',
    status: 'success',
    pos: 'bottom-center',
    timeout: 1000,
  });
}