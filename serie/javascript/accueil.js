function createAnimation (itemSelector, centerProps, defaultProps, duration, onCompleteCallback) {
 const animation = {}
 
 const boxes = gsap.utils.toArray(itemSelector)
 const width = gsap.getProperty(boxes[0], "width")
 const totalLength = boxes.length
 const loopLength = totalLength / 3
 const list = boxes[0].parentNode
 const startIndex = loopLength
 const endIndex = 2 * loopLength
 let currentIndex = startIndex
 let direction = 0
 let disableBtn = false
 
 gsap.set(boxes[0].firstChild, centerProps)
 
 const scaledWidth = gsap.getProperty(boxes[0], "width")
 const windowWidth = gsap.getProperty('body', 'width')
 
 gsap.set(boxes[0].parentNode, {
   x: (windowWidth - scaledWidth) / 2
 })
 
 const createSegment = (i) => {
   return gsap.timeline().to(boxes[i].firstChild, {
     ...defaultProps,
     duration: duration,
     ease: 'none',
     immediateRender: false
   }).to(boxes[i+1].firstChild, {
     ...centerProps,
     duration: duration,
     ease: 'none',
     immediateRender: false
   }, "<").to(list, {
     x: `-=${width}`,
     duration: duration,
     ease: 'none',
     onComplete: onSegmentComplete,
     onReverseComplete: onSegmentComplete
   }, "<")
 }

 const fullAnim = gsap.timeline({ paused: true })
 
 onSegmentComplete = () => {
   if (currentIndex === endIndex + 1) {
     currentIndex = startIndex + 1
     fullAnim.currentLabel(`Label${currentIndex}`)
   } else if (currentIndex === startIndex - 1) {
     currentIndex = endIndex - 1
     fullAnim.currentLabel(`Label${currentIndex}`)
   }
 }
 
 fullAnim.addLabel('Label0')
   boxes.forEach((box, index) => {
   if (index === totalLength - 1) {
     return
   }
   fullAnim.add(createSegment(index)).addLabel(`Label${index + 1}`)
 })

 fullAnim.currentLabel(`Label${startIndex}`)
 
 animation.scrollLeft = () => {
   if (disableBtn) { return }
   disableBtn = true
   
   direction = -1
   fullAnim.tweenTo(`Label${currentIndex - 1}`, {
     duration: 0.5
   })
   currentIndex--
   
   setTimeout(() => {
     disableBtn = false
   }, duration * 1000 + 100)
 }
 
 animation.scrollRight = () => {
   if (disableBtn) { return }
   disableBtn = true
   
   direction = 1
   fullAnim.tweenTo(`Label${currentIndex + 1}`, {
     duration: 0.5
   })
   currentIndex++
   
   setTimeout(() => {
     disableBtn = false
   }, duration * 1000 + 100)
 }
 
 animation.currentIndex = () => currentIndex
 
 return animation
}

let autoplay = true
let timer = null
const autoplayStatusEl = document.querySelector('.autoplay-status')

const onComplete = () => {}

const infiScrollAnim = createAnimation('.box', {
 scale: 1.25,
 margin: '0 64 0 64',
 boxShadow: 'rgba(102, 232, 76, 0.25) 0px 50px 100px -20px, rgba(102, 232, 76, 0.3) 0px 30px 60px -30px'
}, {
 scale: 1,
 margin: '0 20 0 20',
 boxShadow: 'none'
}, 0.5, onComplete)
const infiScrollAnim2 = createAnimation('.box2', {
 scale: 1.25,
 margin: '0 64 0 64',
 boxShadow: 'rgba(102, 232, 76, 0.25) 0px 50px 100px -20px, rgba(102, 232, 76, 0.3) 0px 30px 60px -30px'
}, {
 scale: 1,
 margin: '0 20 0 20',
 boxShadow: 'none'
}, 0.5, onComplete)
const infiScrollAnim1 = createAnimation('.box1', {
 scale: 1.25,
 margin: '0 64 0 64',
 boxShadow: 'rgba(102, 232, 76, 0.25) 0px 50px 100px -20px, rgba(102, 232, 76, 0.3) 0px 30px 60px -30px'
}, {
 scale: 1,
 margin: '0 20 0 20',
 boxShadow: 'none'
}, 0.5, onComplete)


const leftAnim = () => {
 clearTimeout(timer)
 infiScrollAnim.scrollLeft()
 if (autoplay) {
   timer = setTimeout(rightAnim, 1000)
 }
}

const rightAnim = () => {
 clearTimeout(timer)
 infiScrollAnim.scrollRight()
 if (autoplay) {
   timer = setTimeout(rightAnim, 1000)
 }
}
const leftAnim2 = () => {
 clearTimeout(timer)
 infiScrollAnim2.scrollLeft()
 if (autoplay) {
   timer = setTimeout(rightAnim, 1000)
 }
}

const rightAnim2 = () => {
 clearTimeout(timer)
 infiScrollAnim2.scrollRight()
 if (autoplay) {
   timer = setTimeout(rightAnim, 1000)
 }
}
const leftAnim1 = () => {
 clearTimeout(timer)
 infiScrollAnim1.scrollLeft()
 if (autoplay) {
   timer = setTimeout(rightAnim, 1000)
 }
}

const rightAnim1 = () => {
 clearTimeout(timer)
 infiScrollAnim1.scrollRight()
 if (autoplay) {
   timer = setTimeout(rightAnim, 1000)
 }
}

if (autoplay) {
 timer = setTimeout(rightAnim, 1000)
}

function handleAutoplay () {
 autoplay = !autoplay
 
 if (autoplay) {
   autoplayStatusEl.innerHTML = 'ON'
   timer = setTimeout(rightAnim, 1000)
 } else {
   autoplayStatusEl.innerHTML = 'OFF'
   clearTimeout(timer)
 }
}

// const prevBtn = document.querySelector('.prev')
// prevBtn.addEventListener('click', leftAnim)
// const nextBtn = document.querySelector('.next')
// nextBtn.addEventListener('click', rightAnim)
const prevBtn2 = document.querySelector('.prev2')
prevBtn2.addEventListener('click', leftAnim2)
const nextBtn2 = document.querySelector('.next2')
nextBtn2.addEventListener('click', rightAnim2)
const prevBtn1 = document.querySelector('.prev1')
prevBtn1.addEventListener('click', leftAnim1)
const nextBtn1 = document.querySelector('.next1')
nextBtn1.addEventListener('click', rightAnim1)
const autoplayBtn = document.querySelector('.autoplay-container')
autoplayBtn.addEventListener('click', handleAutoplay)
