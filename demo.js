const effectBtns = document.querySelectorAll('.nav-sidebar .nav-btn')
const titles = document.querySelectorAll('.title span')
const themeSwitch = document.querySelector('.theme-switch')
const colors = document.querySelectorAll('.color')

const dropdownTriggerForBtn = document.querySelector('.dropdown-trigger-for-btn')
const dropdownForBtn = document.querySelector('.dropdown-for-btn')

const altComponents = document.querySelectorAll('.alt')
const classBtns = dropdownForBtn.querySelectorAll('span')

const code = document.querySelector('.code')

const codeCopyBtn = document.getElementById("copy")

let currentItem = 0

const sizeClasses = [
  'a1-s1', 
  'a2-s1', 'a2-s1-o',
  'a4-s1', 'a4-s2', 'a4-s2-o',
  'a5-s1', 'a5-s1-o',
  'a8-s1', 'a8-s1-o',
  'a10-s1', 'a10-s1-o', 'a10-s2', 'a10-s2-o',
  'a16-s1',
  'a20-s1', 'a20-s1-o', 'a20-s2', 'a20-s2-o',
  'a25-s1',
  'a40-s1', 'a40-s1-o', 'a40-s2', 'a40-s2-o',
  'a50-s1', 'a50-s1-o',
  'a100-s1'
]

dropdownTriggerForBtn.addEventListener('click',()=> {
  dropdownTriggerForBtn.classList.toggle('active')
  dropdownForBtn.classList.toggle('active')
})

classBtns.forEach(btn => {
  btn.addEventListener('click', ()=>{

    altComponents.forEach(ac => {
      for (let i = 0; i < sizeClasses.length; i++) {
        ac.classList.remove(sizeClasses[i])
      }

      ac.classList.add(btn.id)

      if(ac.classList.contains('alt-btn')){
        ac.querySelector('.alt-item span').innerHTML = btn.id
      }else{
        ac.querySelector('.alt-item h3 span').innerHTML = btn.id
      }

      toCode2()
    })

    dropdownTriggerForBtn.innerHTML = btn.id

    for (let i = 0; i < sizeClasses.length; i++) {
      classBtns.forEach(btn2 => {
        btn2.classList.remove('active')
      })
    }

    btn.classList.add('active')
    createSpans()
  })
})

// Toggle Dark Theme
themeSwitch.addEventListener('click', ()=>{
  themeSwitch.classList.toggle('active')
  altComponents.forEach(ac => {
    ac.classList.toggle('dark-theme')
    toCode2()
  })
})

// Change Colors
colors.forEach(color => {
  color.addEventListener('click', ()=> {
    altComponents.forEach(alt => {
      for (let i = 0; i < 4; i++) {
        alt.classList.remove('blue')
        alt.classList.remove('orange')
        alt.classList.remove('green')
        alt.classList.remove('pink')
        alt.classList.remove('black')
      }
      alt.classList.toggle(color.id)
      toCode2()
    })
  })
})

// Change Effect classes
effectBtns.forEach(btn => {
  btn.addEventListener('click', ()=>{

    effectBtns.forEach(btn2 => {
      btn2.classList.remove('active')
    })

    altComponents.forEach(alt => {
      for (let i = 0; i < 11; i++) {
        alt.classList.remove(`effect-${i}`)
      }
      alt.classList.add(btn.id)

      toCode2()
    })

    btn.classList.add('active')

    titles.forEach(title => {
      title.innerHTML = btn.id.replace(/\D/g,'')
    })
  })
})

altComponents.forEach((ac, idx) => {
  ac.addEventListener('mouseover', ()=> {
    toCode(ac)
    currentItem = idx

    // const div = document.createElement('div')
    // div.classList.add('tooltip')
    // div = div.createElement('button')

    // const tooltip = document.querySelector('.tooltip')
    // tooltip.classList.add('active')

  })
})

function toCode (clickable){
  code.textContent = ''
  code.textContent =  clickable.outerHTML
  indent()
  hljs.highlightAll()
}
function toCode2 (){
  altComponents.forEach((ac, idx) => {
    if(idx == currentItem){
      code.textContent = ''
      code.textContent =  ac.outerHTML
      indent()
      hljs.highlightAll()
    }
  })
}

// Format Html
function indent() {
    let str = code.textContent
    code.textContent = process(str)

    function process(str) {
        
        var div = document.createElement('div');
        div.innerHTML = str.trim();
        
        return format(div, 0).innerHTML;
    }
    
    function format(node, level) {
        
        var indentBefore = new Array(level++ + 1).join('  '),
            indentAfter  = new Array(level - 1).join('  '), textNode;
        
        for (var i = 0; i < node.children.length; i++) {
            
            textNode = document.createTextNode('\n' + indentBefore);
            node.insertBefore(textNode, node.children[i]);
            
            format(node.children[i], level);
            
            if (node.lastElementChild == node.children[i]) {
                textNode = document.createTextNode('\n' + indentAfter);
                node.appendChild(textNode);
            }
        }
        
        return node;
    }
}


codeCopyBtn.addEventListener('click',()=> {
  copy()
})
codeCopyBtn.addEventListener('mouseleave',()=> {
  mousePointerOut()
})

function copy() {
  /* Get the text field */
  // const copyText = document.querySelector(".code")
  const copyText = code.textContent

  /* Select the text field */
  // copyText.select()
  // copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText)

  /* Alert the copied text */
  // alert("Copied the text: " + copyText.value)

  tooltip(text = 'Copied')
}

function tooltip(text = 'Copy to clipboard') {
  const tooltip = document.getElementById("myTooltip")
  tooltip.innerHTML = text
}
function mousePointerOut() {
  tooltip(text = 'Copy to clipboard')
}

// On page load ----------------------------------------------
once()
function once() {
  const initialEffect = 'effect-1'
  document.getElementById(initialEffect).classList.add('active')

  altComponents.forEach(alt => {
    for (let i = 0; i < 11; i++) {
      alt.classList.remove(`effect-${i}`)
    }
    alt.classList.add(initialEffect)

    titles.forEach(title => {
      title.innerHTML = initialEffect.replace(/\D/g,'')
    })
  })

  toCode(altComponents[0])
}
// END -------------------------------------------------------