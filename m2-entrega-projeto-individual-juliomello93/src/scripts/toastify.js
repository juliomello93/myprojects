export class Toast{
    static create(texto,color){
        Toastify({
            text: texto,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: color,
            },            
          })
          .showToast();
    }
}