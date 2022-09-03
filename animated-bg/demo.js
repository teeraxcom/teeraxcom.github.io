const effectBtns=document.querySelectorAll(".nav-sidebar .nav-btn"),titles=document.querySelectorAll(".title span"),themeSwitch=document.querySelector(".theme-switch"),colors=document.querySelectorAll(".color"),dropdownTriggerForBtn=document.querySelector(".dropdown-trigger-for-btn"),dropdownForBtn=document.querySelector(".dropdown-for-btn"),altComponents=document.querySelectorAll(".alt"),classBtns=dropdownForBtn.querySelectorAll("span"),code=document.querySelector(".code"),codeCopyBtn=document.getElementById("copy");let currentItem=0;const sizeClasses=["a1-s1","a2-s1","a2-s1-o","a4-s1","a4-s2","a4-s2-o","a5-s1","a5-s1-o","a8-s1","a8-s1-o","a10-s1","a10-s1-o","a10-s2","a10-s2-o","a16-s1","a20-s1","a20-s1-o","a20-s2","a20-s2-o","a25-s1","a40-s1","a40-s1-o","a40-s2","a40-s2-o","a50-s1","a50-s1-o","a100-s1"];function toCode(a){code.textContent="",code.textContent=a.outerHTML,indent(),hljs.highlightAll()}function toCode2(){altComponents.forEach((a,b)=>{b==currentItem&&(code.textContent="",code.textContent=a.outerHTML,indent(),hljs.highlightAll())})}function indent(){var a,b;let c=code.textContent;function d(a,e){for(var c,f=new Array((e++)+1).join("  "),g=new Array(e-1).join("  "),b=0;b<a.children.length;b++)c=document.createTextNode("\n"+f),a.insertBefore(c,a.children[b]),d(a.children[b],e),a.lastElementChild==a.children[b]&&(c=document.createTextNode("\n"+g),a.appendChild(c));return a}code.textContent=(a=c,(b=document.createElement("div")).innerHTML=a.trim(),d(b,0).innerHTML)}function copy(){let a=code.textContent;navigator.clipboard.writeText(a),tooltip(text="Copied")}function tooltip(a="Copy to clipboard"){let b=document.getElementById("myTooltip");b.innerHTML=a}function mousePointerOut(){tooltip(text="Copy to clipboard")}function once(){let a="effect-1";document.getElementById(a).classList.add("active"),altComponents.forEach(c=>{for(let b=0;b<11;b++)c.classList.remove(`effect-${b}`);c.classList.add(a),titles.forEach(b=>{b.innerHTML=a.replace(/\D/g,"")})}),toCode(altComponents[0])}dropdownTriggerForBtn.addEventListener("click",()=>{dropdownTriggerForBtn.classList.toggle("active"),dropdownForBtn.classList.toggle("active")}),classBtns.forEach(a=>{a.addEventListener("click",()=>{altComponents.forEach(b=>{for(let c=0;c<sizeClasses.length;c++)b.classList.remove(sizeClasses[c]);b.classList.add(a.id),b.classList.contains("alt-btn")?b.querySelector(".alt-item span").innerHTML=a.id:b.querySelector(".alt-item h3 span").innerHTML=a.id,toCode2()}),dropdownTriggerForBtn.innerHTML=a.id;for(let b=0;b<sizeClasses.length;b++)classBtns.forEach(a=>{a.classList.remove("active")});a.classList.add("active"),createSpans()})}),themeSwitch.addEventListener("click",()=>{themeSwitch.classList.toggle("active"),altComponents.forEach(a=>{a.classList.toggle("dark-theme"),toCode2()})}),colors.forEach(a=>{a.addEventListener("click",()=>{altComponents.forEach(b=>{for(let c=0;c<4;c++)b.classList.remove("blue"),b.classList.remove("orange"),b.classList.remove("green"),b.classList.remove("pink"),b.classList.remove("black");b.classList.toggle(a.id),toCode2()})})}),effectBtns.forEach(a=>{a.addEventListener("click",()=>{effectBtns.forEach(a=>{a.classList.remove("active")}),altComponents.forEach(c=>{for(let b=0;b<11;b++)c.classList.remove(`effect-${b}`);c.classList.add(a.id),toCode2()}),a.classList.add("active"),titles.forEach(b=>{b.innerHTML=a.id.replace(/\D/g,"")})})}),altComponents.forEach((a,b)=>{a.addEventListener("mouseover",()=>{toCode(a),currentItem=b})}),codeCopyBtn.addEventListener("click",()=>{copy()}),codeCopyBtn.addEventListener("mouseleave",()=>{mousePointerOut()}),once()
    // disable right click
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.onkeydown = function (e) {
        // disable F12 key
        if(e.key == 'F12' || e.code == 'F12' ) {
            return false;
        }

        // disable I key
        if(e.ctrlKey && e.shiftKey && e.key == 'I'){
            return false;
        }

        // disable J key
        if(e.ctrlKey && e.shiftKey && e.key == 'J') {
            return false;
        }

        // disable U key
        if(e.ctrlKey && e.key == "U") {
            return false;
        }
    }

    // CM

    document.getElementById('cm-reload').addEventListener('click', ()=>{
      location.reload()
    })

    const contextMenu = document.getElementById("context-menu");
    const scope = document.querySelector("body");

    const normalizePozition = (mouseX, mouseY) => {
      // ? compute what is the mouse position relative to the container element (scope)
      let {
        left: scopeOffsetX,
        top: scopeOffsetY,
      } = scope.getBoundingClientRect();
      
      scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
      scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;
     
      const scopeX = mouseX - scopeOffsetX;
      const scopeY = mouseY - scopeOffsetY;

      // ? check if the element will go out of bounds
      const outOfBoundsOnX =
        scopeX + contextMenu.clientWidth > scope.clientWidth;

      const outOfBoundsOnY =
        scopeY + contextMenu.clientHeight > scope.clientHeight;

      let normalizedX = mouseX;
      let normalizedY = mouseY;

      // ? normalize on X
      if (outOfBoundsOnX) {
        normalizedX =
          scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
      }

      // ? normalize on Y
      if (outOfBoundsOnY) {
        normalizedY =
          scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
      }

      return { normalizedX, normalizedY };
    };

    scope.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      const { clientX: mouseX, clientY: mouseY } = event;

      const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

      contextMenu.classList.remove("visible");

      contextMenu.style.top = `${normalizedY}px`;
      contextMenu.style.left = `${normalizedX}px`;

      setTimeout(() => {
        contextMenu.classList.add("visible");
      });
    });

    scope.addEventListener("click", (e) => {
      // ? close the menu if the user clicks outside of it
      if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
      }
    });