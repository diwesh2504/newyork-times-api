//head
var cont=document.createElement('div');
document.body.append(cont);
cont.classList.add('container-fluid');
var jumbo=document.createElement('div');
jumbo.classList.add('jumbotron','font');
jumbo.setAttribute('style','color:purple');
jumbo.innerHTML="<h2>Welcome to New York Times</h2>";
cont.appendChild(jumbo);
//search bar
var bar=document.createElement('div');
document.body.append(bar);
bar.classList.add('container');
var row=document.createElement('div');
row.classList.add('row');
bar.appendChild(row);
var col1=document.createElement('div');
col1.classList.add('col-2');
row.appendChild(col1);
var col2=document.createElement('div');
col2.classList.add('col-6');
var input=document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('class','form-control');
input.setAttribute('id','genre');
input.setAttribute('placeholder','eg.Arts,Movies..');
col2.appendChild(input);
var small=document.createElement('small');
small.setAttribute('id','labelforinp');
small.setAttribute('class','form-text text-muted');
small.innerHTML="Search for articles by type.."
col2.appendChild(small);
row.appendChild(col2);
var col3=document.createElement('div');
col3.classList.add('col');
row.appendChild(col3);
//Search Button
var btnSearch=document.createElement('button');
btnSearch.classList.add('btn','btn-primary');
btnSearch.setAttribute('id','search');
btnSearch.setAttribute('onclick','displayStories()');
btnSearch.innerText="Search";
col3.append(btnSearch);
//Refresh Button
var btnRefresh=document.createElement('button');
btnRefresh.classList.add('btn','btn-primary');
btnRefresh.setAttribute('id','refresh');
btnRefresh.setAttribute('onclick','refresh()');
btnRefresh.innerText="Refresh";
col3.append(btnRefresh);

var story_main=document.createElement('div');
story_main.setAttribute('class','stories-main');
document.body.append(story_main);
var url='https://api.nytimes.com/svc/topstories/v2/';
var key='KC1uSGaWFya45XGPfYu8VcHAQMNMskUC';
async function displayStories(){
    // Getting Input From User
    var genre=document.getElementById('genre').value;
    var fetchURL=url+`${genre}.json?api-key=`+key;//Enter try here
    //Fetching Data from API
    try{
    var response=await fetch(fetchURL);
    var data=await response.json();
    var final=data.results;//For Manipulating Data.
    //Creating Card for the Stories.
    for(let i=0;i<final.length;i++){
    var card=document.createElement('div');
    card.classList.add('card');
    //Appending it to body
    story_main.appendChild(card);
    //Styling Card.
    //1.No gutter for Horizontal
    var cardInside=document.createElement('div');
    cardInside.classList.add('row','no-gutters');
    card.appendChild(cardInside);
    //2.a)Card Column(content)
    var cardCol=document.createElement('div');
    cardCol.classList.add('col-md-8');
    cardInside.appendChild(cardCol);
    //2.b)Card Body
    var cardBody=document.createElement('div');
    cardBody.classList.add('card-body');
    cardCol.appendChild(cardBody);
    //2.b.1)Title
    var title=document.createElement('h5');
    title.classList.add('card-title','title');
    cardBody.appendChild(title);
    title.innerHTML="<b>"+final[i].title+"</b>";
    //2.b.2)By Line Section and Created Date
    var details=document.createElement('h5');
    details.classList.add('details');
    cardBody.appendChild(details);
    details.innerHTML="<i>"+final[i].byline+"</i>"+"<br>Section:"+capital(final[i].section)+"&nbsp;&nbsp;"+"Date:"+formattedDate(final[i].created_date);
    //2.b.3)Item Type
    var itemtype=document.createElement('h5');
    itemtype.classList.add('mb-2','article');
    cardBody.appendChild(itemtype);
    itemtype.innerHTML=final[i].item_type;
    //2.b.5)Collapse Button
    var collapseButton=document.createElement('button');
    collapseButton.classList.add('btn','btn-outline-primary','btn-sm');
    collapseButton.setAttribute('data-toggle',"collapse");
    collapseButton.setAttribute('href',`#cardtext${i}`);
    collapseButton.innerHTML="Continue Reading..";
    cardBody.appendChild(collapseButton);
    //2.b.6)Collapse Body and Full Link.
    var collapseBody=document.createElement('div');
    collapseBody.classList.add('collapse','abstract');
    collapseBody.setAttribute('id',`cardtext${i}`);
    cardBody.appendChild(collapseBody);
    collapseBody.innerHTML=final[i].abstract;
    var link=document.createElement('a');
    collapseBody.appendChild(link);
    link.innerHTML="<br>Read Full Article";
    link.setAttribute('href',`${final[i].short_url}`)
    //3.Image thumbnail
    var imgdiv=document.createElement('div');
    imgdiv.classList.add('col','md-4');
    cardInside.appendChild(imgdiv);
    var image=document.createElement('img');
    imgdiv.appendChild(image);
    image.src=final[i].multimedia[4].url;//The 5th element contains articleinline.

    }
}catch(err){
    console.log(err);
}

}
function formattedDate(d){
    var months=['Jan','Feb','March','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    var a=d.split('T');
    var b=a[0].split('-');
    var str=months[+b[1]-1]+" "+b[2]+","+b[0];
    return str;
}
function capital(s){
    var temp=s.split("");str="";
    for(let i=0;i<temp.length;i++)
    {
        if(i==0)
          str+=temp[i].toUpperCase();
        else
          str+=temp[i];
    }
    return str;
}
function refresh(){
window.location.reload();
}