
// global variables


const date = {
  now : new Date(),
  tommorow(){
    return new Date(this.now.getTime() + 24 * 60 * 60 * 1000);
  },
  format(){
    let month = ('0' + (this.tommorow().getMonth()+1)).slice(-2);
    let day = ('0' + this.tommorow().getDate()).slice(-2);
    let year = date.tommorow().getFullYear();
    let dateStr = year+'-'+month+'-'+day;
    return dateStr;
  },
  formatDp(){
    let month = ('0' + (this.tommorow().getMonth()+1)).slice(-2);
    let day = ('0' + this.tommorow().getDate()).slice(-2);
    let year = date.tommorow().getFullYear();
    let dateStr = month+'/'+day+'/'+year;
    return dateStr;
  }
}
const order = {
    items : [],
    default : false,
    total(){let total =0;
      for (i in this.items){
        total += this.items[i].qty*this.items[i].price;
      }
      return total;
    },
    discountRate(){
      try {return getDiscount()}
      catch { return 0};
    },
    discounted(){
      return Number((this.total() * this.discountRate()).toFixed(2));
    },
    TBP(){
      return Number(this.total()-this.discounted()).toFixed(2);
    },
    str(){let str="";
      if (this.total()===0)
        str = "Your Order list is empty!"
      else{
        for (i in this.items){
          if (this.items[i].qty>1)
            str += this.items[i].qty +" "+ this.items[i].name + "s" + ", "
          else if (this.items[i].qty===1)
            str += this.items[i].qty +" "+ this.items[i].name + ", "
        }
        str = str.slice(0, -2);
        str += ".";
        str = str.replace(/,(?=[^,]*$)/, ' and');
      }
      return str;
    },
  }


const default_order = $.extend(true,{}, order);

class Item_base{
  constructor(type, name, price, qty) {
    this.type = type;
    this.name = name;
    this.price = price;
    this.qty = qty;
  }
  add() {this.qty ++ ;this.localStorage()}
  remove() {this.qty >0 ? this.qty -- : "";this.localStorage()}
  reset() {this.qty=0;this.localStorage()}
}
class Item extends Item_base{
  constructor(type, name, price, qty) {
    super(type, name, price, qty)
    order.items.push(this);
    localStorage.setItem(this.name,JSON.stringify(this));
  }
  localStorage(){localStorage.setItem(this.name,JSON.stringify(this))}
}
class Item_default extends Item_base{
  constructor(type, name, price, qty) {
    super(type, name, price, qty)
    default_order.items.push(this);
    localStorage.setItem(`${this.name}_def`,JSON.stringify(this));
  }
  localStorage(){localStorage.setItem(`${this.name}_def`,JSON.stringify(this))}

}
let marker = "";
let handler="";
function getDiscount(){
  return Number(JSON.parse(document.getElementById('discount').textContent));
}
function getBalance(){
  return Number(JSON.parse(document.getElementById('balance-data').textContent));
}
function getItemPrice(item){
  return Number(JSON.parse(document.getElementById(item).textContent));
}
function getOrderTommorowStatus(){
  return document.getElementById(order-tomorrow).textContent
}
function saveItemOrder(){ // save in localstorage
  localStorage.setItem('order',JSON.stringify(order)); // remember order
}
function updateDate(){ // update date in html
  document.querySelector("#cal-month").innerHTML = date.tommorow().toDateString().slice(4,7); //initialize cal-order month
  document.querySelector("#cal-day").innerHTML = ('0' + date.tommorow().getDate()).slice(-2); //initialize cal-order day
}
function updateOrderHTML() { // update order in html
  document.querySelector("#text-order").innerHTML = order.str();
  if (order.total()>0){ // if items selected
    document.querySelector("#total-order").innerHTML = "<span>Total: " + order.total() + " AED</span>";// update total
    document.querySelector("#discounted").innerHTML = order.discounted() + " AED";// update discount
    document.querySelector("#total-TBP").innerHTML = "To be paid: " + order.TBP() + " AED";// update discount
    unhide(".hide-order"); //unhide elements
  }
  else {// if no items selected
    document.querySelector("#total-order").innerHTML = "";// update total
    hide(".hide-order"); // hide elements
    hide(".checkBox-hide");
  }
}
function updateQty(HTMLObj) {// update qty in html
  if (HTMLObj.qty)
    HTMLObj.qty.innerText = window[HTMLObj.name].qty
}
function updateQtyDefault(HTMLObj) {// update qty in html
  if (HTMLObj.qty)
    HTMLObj.qty.innerText = window[`${HTMLObj.name}_def`].qty
}
// global functions
function resizeFormButton(){
  var win = $(this);
  if (win.width() > 1000) {
    $('.resize-input-group').removeClass('input-group-sm');
    $('.resize-input-group').addClass('input-group-lg');
    $('.resize-btn').removeClass('btn-sm');
    $('.resize-btn').addClass('btn-lg');
    $('.form-group').removeClass('form-group-sm');
  } else {
    $('.resize-btn').removeClass('btn-lg');
    $('.resize-btn').addClass('btn-sm');
    $('.resize-input-group').removeClass('input-group-lg');
    $('.resize-input-group').addClass('input-group-sm');
    $('.form-group').addClass('form-group-sm');
  }
}
function hide(x){
  document.querySelectorAll(x).forEach(element => {
    element.style.visibility = 'hidden';
  });
}
function unhide(x){
  document.querySelectorAll(x).forEach(element => {
    element.style.visibility = 'visible';
  });
}
function run(x){
  document.querySelectorAll(x).forEach(element => {
    element.style.animationPlayState = "running";
  });
}
function pause(x){
  document.querySelectorAll(x).forEach(element => {
    element.style.animationPlayState = "paused";
  });
}
function setAutoComplete(){

  let options ={  //define options
    types: ['address'],
    componentRestrictions : {'country': 'AE'}
  };
  let input = document.getElementById('address');// define input field
  let autoComplete = new google.maps.places.Autocomplete(input, options); // get back auto complete
}

function initMap(geocode, id) {
  map = new google.maps.Map(document.getElementById(id), {
  center: geocode.geometry.location, // store location
  zoom: 17
});
google.maps.event.trigger(map, 'resize')
}
function setMarker(geocode) {
  marker = new google.maps.Marker({
  position: geocode.geometry.location,
  map: map,
  draggable: true,
  animation: google.maps.Animation.DROP,
  title: "My Place"
  })
  return marker;
}
function geocodeToString(obj) {
  let address ="";
  let area ="";
  for (let i=0; i<obj.length; i++){
    for (let j=0; j<obj[i].types.length; j++) {
      (obj[i].types[j] === "street_number") ? address += (obj[i].long_name + ", ") :"";
      (obj[i].types[j] === "route") ? address += obj[i].long_name :"";
      (obj[i].types[j] === "sublocality") ? area += obj[i].long_name :"";
    }
  }
  return {"address": address, "area": area,};
}
function pay(balance) {
  document.querySelector('#order').value = localStorage.order;
  document.querySelector('#geocode').value = localStorage.address;
  document.querySelector('#total').value = order.TBP();
  document.querySelector('#str').value = order.str();
  document.querySelector('#dateorder').value = date.format();
  let remaining = Number(order.TBP()-balance).toFixed(2)
  if ((order.TBP()-balance>0) && balance>=0) { //if remaining is positive
    let c = confirm(`Your remaining balance (${balance} AED) is not enough. Do you confirm the CB payment for the remaining amount of ${remaining} AED?`); //
    if (c) {
      handler.open({
        currency: 'aed',
        name: 'Robert Bread Delivery',
        description: 'Many thanks',
        amount: remaining*100,
      })
    }
  }
  else{
    let c = confirm(`${order.TBP()} AED will be debited from your current Robert balance. Do you confirm the payment?`);
    c ? document.querySelector("#main-form").submit() : "";
  }
}
function topup() {
  let amount = 0;
  let topup=0;
  const radios = document.querySelectorAll(".form-check-input")
  radios.forEach(element => {
    if (element.checked === true){
     charge = Number(element.dataset.charge);
     topup = Number(element.value);
     handler.open({
       currency: 'aed',
       name: 'Robert Bread Delivery',
       description: 'Topup '+topup+' AED',
       amount: charge*100,
     })
    }
  })
}
function checkArea(type, geocoder, address, area, callback) {
  let polyArea = new google.maps.Polygon({ paths: area });
  geocoder.geocode({[type]: address}, function(results, status) {
    if (status === 'OK') {
      if (google.maps.geometry.poly.containsLocation(results[0].geometry.location, polyArea)){
        callback(results[0]);
      }
      else {
        callback(1);
      }
    }
    else{
      callback("error");
    }
  });
}

function checkAreas(type, geocoder, address, areas, yes, no){
  let check = 0;
  let error = 0;
  for (let i =0; i < areas.length; i++) {
    checkArea(type, geocoder, address, areas[i].co, addr => {
      if (addr === "error"){
        error++
      }
      else if (addr === 1){
        check++;
      }
      else if (addr !== "error"){
        yes(addr);
      }
      (check === areas.length) ? no() :"";
      (error === areas.length) ? alert("The address format looks incorrect, try again") :"";
    })
  }
}


//DOM load
document.addEventListener('DOMContentLoaded', () => {

  resizeFormButton();
  $(window).on('resize', function() {
    resizeFormButton();
  });

  if (document.title==="Robert - Best Bread Delivery"){ // index
    setAutoComplete();
    $('#address').keypress( // prevent enter to sbmit the form and click button instead
      function(event){
        if (event.which == '13') {
          event.preventDefault();
          button.click();
        }
      }
    );
    const geocoder = new google.maps.Geocoder();
    const areas = JSON.parse(document.querySelector('#area-data').text)
    const button = document.getElementById('btn-address'); // define button
    button.onclick = () => {
      const address = document.getElementById('address').value;
      checkAreas("address", geocoder, address, areas,
      (addr) => { // if address in area
        document.querySelector("#inArea").value = "true-index";
        localStorage.address = JSON.stringify(addr);
        document.querySelector("#check-form").submit();
      },
      no => { // if not
        document.querySelector("#check-form").submit()
      }
      );
    }
    document.addEventListener('scroll',function(e) { //animations
      run(".carousel");
      run(".icon-home");
      run(".promo-description");
      return false;
    });
  };
  if (document.title==="Robert - Order"){ // order
    hide(".checkBox-load");
    updateDate();
    const itemHtml = document.querySelectorAll(".item");// get list of html items
    itemHtml.forEach(i => { // for eachtItem
      const HTMLObj = {}; // set an HTML object
      HTMLObj.type = i.parentElement.classList[1];
      HTMLObj.name = i.children[0].innerHTML;
      HTMLObj.price = Number(i.children[1].innerHTML.slice(0,-4));
      HTMLObj.qty = i.children[3];
      try {
        let test = JSON.parse(localStorage.getItem([HTMLObj.name])).name // if item already saved
        let savedItem = JSON.parse(localStorage.getItem([HTMLObj.name])); // get the saved item back on objects
        window[HTMLObj.name] = new Item(savedItem.type, savedItem.name, getItemPrice(HTMLObj.name), savedItem.qty);
      }
      catch(err){ // otherwize initialize a new item object
        console.log(err);
        window[HTMLObj.name] = new Item(HTMLObj.type, HTMLObj.name, HTMLObj.price, HTMLObj.qty.innerHTML);
      }
      const addButton = i.children[2];
      const removeButton = i.children[4];
      addButton.onclick = () =>{ // add button action
        window[HTMLObj.name].add();
        updateQty(HTMLObj);
        updateOrderHTML();
        saveItemOrder(HTMLObj);
      };
      removeButton.onclick = () =>{ // remove button action
        window[HTMLObj.name].remove();
        updateQty(HTMLObj);
        updateOrderHTML();
        saveItemOrder(HTMLObj);
      };
      updateQty(HTMLObj); // update HTML
      saveItemOrder(HTMLObj);
    })
    updateOrderHTML();

    let reset=document.querySelector("#reset");
    reset.onclick =() =>{
      for (let i=0; i<order.items.length; i++){
        window[order.items[i].name].reset(); // rest order object
        qty = document.querySelectorAll(".item")[i].children[3]; // set qty element
        updateQty({name:order.items[i].name, qty:qty}); // update
        updateOrderHTML();
        saveItemOrder({name:order.items[i].name});
      }
    }
    try {
    const AO_checkbox = document.querySelector("#AO-checkbox");
    AO_checkbox.addEventListener('click', (event) => {
      document.querySelector("#form-AO").submit()
    })
    }
    catch {console.log("AO_activated")}
  }
  // hash management for user nav
  (window.location.hash === "#AO") ? $('#myTab a[href="#AO"]').tab('show') :"";
  (window.location.hash === "#orders") ? $('#myTab a[href="#orders"]').tab('show') :"";
  (window.location.hash === "#delivery") ? $('#myTab a[href="#delivery"]').tab('show') :"";
  (window.location.hash === "#profile") ? $('#myTab a[href="#profile"]').tab('show') :"";



  if (document.title==="Robert - Confirm" || document.title==="Robert - Account" ){// confirm
    setAutoComplete();
    const geocoder = new google.maps.Geocoder();
    const areas = JSON.parse(document.querySelector('#area-data').text) // get Area available
    $('#address').keypress( // prevent enter to sbmit the form and click button instead
      function(event){
        if (event.which == '13') {
          event.preventDefault();
          button.click();
        }
    });
    let geocode = {};
    try{
      if (localStorage.address) {
        geocode = JSON.parse(localStorage.address); // check if dataloc in browser
        if ( typeof geocode =="number") {
          throw "number";
        }
      }
      else {
        return false;
      }
    }
    catch(err) {
      console.log(err);
      if (document.getElementById('user-geodata').textContent) { // check if  dataloc in user DB
      geocode = JSON.parse(document.getElementById('user-geodata').textContent)
      localStorage.address = JSON.stringify(geocode)
      }
      else{
        geocoder.geocode({['location']: {"lat":25.1714393,"lng":55.22058549999997}}, function(results, status) { // set standard
          if (status === 'OK') {
            alert("check if Robert delivers in your area!")
            geocode = console.log(results[0])
            localStorage.address = JSON.stringify(results[0])
          }
        });
      }
    }
    initMap(geocode,"map");
    const marker = setMarker(geocode);
    let addStr = geocodeToString(geocode.address_components);
    document.querySelector("#inputAddress").value = addStr.address;
    document.querySelector("#area").value = addStr.area;
    const button = document.getElementById('btn-address'); // define button
    button.onclick = () => {
      console.log("test")
      const address = document.getElementById('address').value;
      checkAreas("address", geocoder, address, areas,
        (addr) => { // if address in area
          let addStr = geocodeToString(addr.address_components);
          document.querySelector("#inputAddress").value = addStr.address;
          document.querySelector("#area").value = addStr.area;
          localStorage.address = JSON.stringify(addr);
          location.reload();
        },
        no => { // if not
          alert("not avialble in this area, try another location!")
        }
      );
    document.getElementById('address').value = "";
    }
    google.maps.event.addListener(marker, 'dragend', function (evt) {
      checkAreas("location", geocoder, {"lat":evt.latLng.lat(),"lng":evt.latLng.lng()}, areas,
        (addr) => { // if address in area
          console.log(addr);
          let addStr = geocodeToString(addr.address_components);
          document.querySelector("#inputAddress").value = addStr.address;
          document.querySelector("#area").value = addStr.area;
          localStorage.address = JSON.stringify(addr);
        },
        no => { // if not
          geocode = JSON.parse(localStorage.address);
          alert("not avialble in this area, try another location!");

        }
      );
    })
  }
  if (document.title==="Robert - Confirm"){// confirm
    handler = StripeCheckout.configure({
      key: 'pk_test_WUmBD14Gz3VhhEXMPm4IZebn',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        document.querySelector("#stripeToken").value = token.id;
        document.querySelector("#stripeEmail").value = token.email;
        document.querySelector("#main-form").submit();
      }
    });
  }
  if (document.title==="Robert - Account"){
    handler = StripeCheckout.configure({
      key: 'pk_test_WUmBD14Gz3VhhEXMPm4IZebn',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        document.querySelector("#stripeToken").value = token.id;
        document.querySelector("#stripeEmail").value = token.email;
        document.querySelector("#topup-form").submit();
      }
    });
  const itemHtml = document.querySelectorAll(".default-item");// get list of html items
  itemHtml.forEach(i => {// for eachtItem
    const HTMLObj = {};
    HTMLObj.name = i.children[0].children[0].innerHTML;
    HTMLObj.qty = i.children[1].children[1];
    HTMLObj.price = Number(i.previousElementSibling.previousElementSibling.value);
    HTMLObj.type = i.previousElementSibling.value;
    const addButton = i.children[1].lastElementChild;
    const removeButton = i.children[1].firstElementChild;
    window[`${HTMLObj.name}_def`] = new Item_default(HTMLObj.type, HTMLObj.name,HTMLObj.price,HTMLObj.qty.innerHTML);
    addButton.onclick = () =>{ // add button action
      window[`${HTMLObj.name}_def`].add();
      updateQtyDefault(HTMLObj);
    }
    removeButton.onclick = () =>{ // remove button action
      window[`${HTMLObj.name}_def`].remove();
      updateQtyDefault(HTMLObj);
    }
  })
  try{
    const button_DO = document.querySelector("#submit-update-DO");
    const form_DO = document.querySelector("#form-update-DO");
    button_DO.onclick =()=>{
      document.querySelector('#default_order').value = JSON.stringify(default_order);
      form_DO.submit()
    }
  } catch {console.log("AO_activated")}
  const balance = getBalance();
  let days_available = parseInt(balance/default_order.TBP());
  function numberOfMonth(){
    const year=date.tommorow().getYear()+1900;
    const month=date.tommorow().getMonth()+1;
    const number_day_current_month = new Date(year, month, 0).getDate() - date.tommorow().getDate();
    const number_day_next_month = new Date(year, month+1, 0).getDate()
    if (days_available>(number_day_current_month+number_day_next_month)){
      return [1,3]
    }
    else if (days_available>(number_day_current_month)){
      return [1,2]
    }
    else {
      return 1
    }
  }
  let element = "";
  try {
    $("#datepicker" ).multiDatesPicker({
        numberOfMonths: numberOfMonth(),
        minDate: 2, // tommorow
        maxDate: days_available, //
        autoSize: true,
        onSelect : function(d, t) {
          if (d === date.formatDp()) { // if date istommorow
            // element = t.dpDiv.find('.ui-datepicker-current-day').children()[0];
            let form = document.getElementById('action_tomorrow_select')
            confirm(form.dataset.message) ? document.getElementById('action_tomorrow_select').submit() : ''
          }
        }
    });
  }
  catch(err){
    console.log("not activated")
  }
  const AO_checkbox = document.querySelector("#AO-checkbox");
  AO_checkbox.addEventListener('click', (event) => {

    document.querySelector("#form-AO").submit()
  })
  }
});
