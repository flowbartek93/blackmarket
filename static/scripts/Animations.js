 export class Animations {
     constructor({
             form,
             background,
             body,
         }

     ) {

         this.form = form;
         this.background = background;
         this.body = body;
     }


     run() {

         this.body.style.backgroundColor = "black";
         setTimeout(() => {
             this.form.style.display = "none";
         }, 700)
         this.fadeOut();
         this.loading();


     }

     fadeOut() {

         let bgOpacity = 1;
         const fadeOutAnim = setInterval(() => {
             if (bgOpacity < 0) {
                 clearInterval(fadeOutAnim);
             } else {
                 bgOpacity -= 0.10;
                 this.background.style.filter = `opacity(${bgOpacity}) saturate(0)`;
             }
         }, 100)

     }

     loading() {
         const loader = document.querySelector('.loading');
         let loaderStageParagraph = document.querySelector('.loading__stage');
         loader.style.display = "flex";
         const stages = [
             'Connecting to database...',
             'Establishing secure connection...',
             'Hiding IP...',
         ]
         let stage = 0;
         const loading = setInterval(() => {
             if (stage > 2) {
                 window.location.href = "shop.html"
             } else {
                 loaderStageParagraph.textContent = `${stages[stage]}`
                 stage++;
             }

         }, 2000)
     }

 }