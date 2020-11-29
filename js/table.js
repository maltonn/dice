params = {'sid':7}
try {
    (decodeURI(location.href).split('?')[1]).split('&').forEach(e => params[e.split('=')[0]] = e.split('=')[1])
} catch (e) {
    console.log(e)
}


function MakeTable(res) {
    data = eval(res)
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
    keys_lst.push('edit')
    for (key of keys_lst) {
        th = document.createElement('th')
        th.innerText = key
        th.classList.add('uk-text-left')
        table_keys.appendChild(th)
    }
    for (d of data) {
        tr = document.createElement('tr')
        tr.setAttribute('data-primary_key',d['primary_key'])
        for (key of keys_lst) {
            td = document.createElement('td')
            if (key=='edit'){
                icon=document.createElement('button')
                icon.setAttribute('uk-icon','icon: pencil')
                icon.setAttribute('data-status','waiting')
                icon.style.color='black'
                icon.classList.add('pointer','uk-button','uk-button-link')
                icon.addEventListener('click',function(){
                    tr=this.parentNode.parentNode
                    if (this.getAttribute('data-status')=='waiting'){
                        this.setAttribute('data-status','editing')
                        tds=tr.getElementsByTagName('td')
                        for(i=0;i<tds.length-1;i++){
                            input=document.createElement('input')
                            input.classList.add('uk-input','uk-width-1-3')
                            input.value=tds[i].innerText
                            tds[i].innerHTML=''
                            tds[i].append(input)
                        }
                        this.setAttribute('uk-icon','icon: cloud-upload; ratio: 1.2')
                    }else if(this.getAttribute('data-status')=='editing'){
                        this.setAttribute('data-status','done')
                        this.style.display='None'
                        inputs=[...tr.getElementsByTagName('input')]
                        dic1={
                            'sid':7,
                            'method':'add',
                        }
                        
                        for(i=0;i<inputs.length;i++){
                            dic1[keys_lst[i]]=inputs[i].value
                            inputs[i].parentNode.innerHTML=inputs[i].value
                        }
                        console.log(dic1)
                        Send(dic1,null)

                        dic2={
                            'sid':7,
                            'method':'delete',
                            'primary_key':tr.getAttribute('data-primary_key')
                        }
                        Send(dic2,null)
                        this.outerHTML=''
                    }
                })
                td.appendChild(icon)
                
            }else{
                td.innerText = d[key] || ''
            }
            tr.appendChild(td)
        }
        
        main_body.appendChild(tr)
    }
}

params['method']='pick'
Send(params,MakeTable)


function CallBack(res){

}