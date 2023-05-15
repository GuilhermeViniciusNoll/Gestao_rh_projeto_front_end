export function toast(color, text) {
  const toastContainer = document.querySelector('.toast__container')
  const toastParagraph = document.querySelector('.toast__container > p')

  switch (color) {
    case 'pass':
      color = '#36B37E'
      break;
      case 'fail':
      color = '#DC143C'
      break;
      case 'alert':
      color = '#FFAB00'
      break;
  }

  toastParagraph.innerText = text

  toastContainer.style = `background-color: ${color}; border-color: ${color}`

  toastContainer.classList.remove('hidden')

  setTimeout(() => {
    toastContainer.classList.add('hidden')
  }, 3000)
}