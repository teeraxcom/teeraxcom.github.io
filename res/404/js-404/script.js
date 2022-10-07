function parralax(event) {
  document.querySelectorAll('.feature-graphics img').forEach(elem => {
    let moving_value = elem.getAttribute('data-value')
    let x = (event.clientX * moving_value) / 100
    let y = (event.clientY * moving_value) / 200

    elem.style.transform = `translate(${x}px) translateY(${y}px)`
    elem.style.transform = `translate(${x}px) translateY(${y}px)`
  })
}
document.addEventListener('mousemove', parralax)

// const btns = document.querySelectorAll('.search-box')

// btns.forEach(btn => {
//   btn.addEventListener('mousemove', e => {
//     const position = btn.getBoundingClientRect()
//     const x = e.pageX - position.left - position.width / 2
//     const y = e.pageY - position.top - position.height / 2

//     btn.style.transform = `translate(${x * 0.3}px , ${y * 0.5}px)`
//   })
//   btn.addEventListener('mouseout', () => {
//     btn.style.transform = `translate(0px, 0px)`
//   })
// })
