import { LitElement, html, css } from 'lit';

const logo = new URL('../assets/open-wc-logo.svg', import.meta.url).href;

const api = 'https://api.tvmaze.com/'

export class TvMaze extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        color: #1a2b42;
        max-width: 94%;
        margin: 0 auto;
        text-align: center;
        background-color: var(--tv-maze-background-color);
      }

      body{
        background-color: #e5e5e5!important;
      }

      main {
        flex-grow: 1;
        width:100%;
      }

      .logo {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
      #search{
        border: 5px solid #aba9a9;
        height: 3vh;
        width: 30%;
        margin-bottom: 5rem;
      }

      .card {
        border-bottom: 1px solid #aba9a9;
        box-shadow: 3px 2px 6px 0px rgb(0 0 0 / 20%);
        transition: 0.3s;

        display:flex;
        margin: 1rem;
      }

      .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
      }

      .container {
        padding: 2px 16px;
      }
      .text-nowrap {
        font-size: 16px;
        white-space:nowrap;
        line-height: 0.4;
      }
      .title {
        font-size: 20px;
      }
      .w-33{
        width:33%
      }
      .details{
        margin-left: 2rem;
        margin-top: 2rem;
      }

       @media (min-width: 1000px) {
        .row{
          display: flex;
        }
        .card{
          width: 30%;
        }
      }
    `;
  }

  constructor() {
    super();
    this.title = 'My app';
  }



  render() {
    return html`
      <main>
          <span><i class="fa fa-search"></i></span>
          <input id="search" class="form-control" type="text" placeholder="Search TV Shows" @keyup=${this._handleSearch}>
          <div id="results">

         <div class="row"><div class="card"><img src="https://static.tvmaze.com/uploads/images/medium_portrait/57/144821.jpg" class="w-33">            <div class="container">              <p class="text-nowrap title"><b>Amagami SS</b></p>              <p class="text-nowrap">No Rating Yet</p>              <p class=" details"><p>A second-year high school boy finds himself uneasy during Christmas time due to an experience in the past. However, this year at Christma ...</p>            </div>          </div><div class="card">           <img src="https://static.tvmaze.com/uploads/images/medium_portrait/98/247081.jpg" class="w-33">            <div class="container">              <p class="text-nowrap title"><b>SS-GB</b></p>              <p class="text-nowrap">Rating 7.1</p>              <p class=" details"><p>Drama series based on the novel by Len Deighton. It is 1941, and the Germans have won the Battle of Britain. Detective Douglas Archer fin ...</p>            </div>          </div><div class="card">           <img src="https://static.tvmaze.com/uploads/images/medium_portrait/376/940673.jpg" class="w-33">            <div class="container">              <p class="text-nowrap title"><b>Inside the SS</b></p>              <p class="text-nowrap">No Rating Yet</p>              <p class=" details"><p>To better understand the nature of fanaticism, retrace the bloody history of the young volunteers who joined the SS, the Schutzstaffel. H ...</p>            </div>          </div></div><div class="row"><div class="card">           <img src="https://static.tvmaze.com/uploads/images/medium_portrait/42/107276.jpg" class="w-33">            <div class="container">              <p class="text-nowrap title"><b>Inu x Boku SS</b></p>              <p class="text-nowrap">No Rating Yet</p>              <p class=" details"><p>Protected by the highest security, the Maison de Ayakashi is rumored to be haunted, where only eccentrics could live. In reality, it is a ...</p>            </div>          </div><div class="card">           <img src="https://static.tvmaze.com/uploads/images/medium_portrait/92/230050.jpg" class="w-33">            <div class="container">              <p class="text-nowrap title"><b>Hostages of the SS</b></p>              <p class="text-nowrap">No Rating Yet</p>              <p class=" details"><p>April 1945. In a dramatic operation the SS transports 139 special prisoners, and kin of the prisoners, into the Alps. The plan: to use th ...</p>            </div>          </div><div class="card">           <img src="https://static.tvmaze.com/uploads/images/medium_portrait/259/649384.jpg" class="w-33">            <div class="container">              <p class="text-nowrap title"><b>Die SS - Eine Warnung der Geschichte</b></p>              <p class="text-nowrap">No Rating Yet</p>              <p class=" details"><p>It was the epitome of terror. It carried out the mass murder. Like no other organization in Hitler's empire, it embodied the deadly delus ...</p>            </div>          </div></div>

         </div>
     </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/oliverlanuza/"
          >OwlTG</a
        >.
      </p>
    `;
  }

  _handleSearch(e) {

    this.keyword = e.srcElement.value;
    axios.get(api + 'search/shows?q=' + this.keyword, {
     }).then((response) => {

      this.buildResults(response.data);

    }).catch((error) =>{
      console.log('Something went wrong!', error)
    })


  }


  buildResults(res){

    var html = "";
    res.forEach(function(val, index){

      if((index+1)%3 == 1 || index == 0 ){ // beginning of row
        html += `<div class="row">`;
      }

      let content = (val.show.summary.length > 145)?  val.show.summary.substr(0,140) + " ..." : val.show.summary
      let rating = (val.show.rating.average) ? 'Rating ' + val.show.rating.average :  'No Rating Yet';

      html += '<div class="card">\
           <img src="' + val.show.image.medium + '" class="w-33">\
            <div class="container">\
              <p class="text-nowrap title"><b>' + val.show.name + '</b></p>\
              <p class="text-nowrap">' + rating + '</p>\
              <p class=" details">'+ content +'</p>\
            </div>\
          </div>';

      if((index+1)%3 == 0){  // end of row
       html += `</div>`;
      }
    });


    var resultDOM = document.getElementById('results');
    resultDOM.innerHTML(html);

    return html ;


  }

}
